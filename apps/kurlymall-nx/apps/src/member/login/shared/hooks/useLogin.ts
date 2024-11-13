import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { FormEvent, useCallback, useEffect, useState } from 'react';

import { InputEventType } from '../../../signup/interfaces/NormalSignupForm.interface';
import { setLoginFailCount, setLoginForm, refreshSession } from '../../../../shared/reducers/auth';
import { useAppSelector } from '../../../../shared/store';
import Alert from '../../../../shared/components/Alert/Alert';
import { hideLoading, redirectTo, showLoading } from '../../../../shared/reducers/page';
import { getCookieOnce, postLogin } from '../../../../shared/services';
import { ENVIRONMENT } from '../../../../shared/configs/config';
import { removeLocalStorage, storeLocalStorage } from '../../../../shared/services/storage.service';
import { isPC } from '../../../../../util/window/getDevice';
import { SKIP_COOKIE_NAME } from '../../../change-password/shared/containers/ChangePassword';
import { COMMON_PATH, getPageUrl, USER_MENU_PATH } from '../../../../shared/constant';
import { amplitudeService } from '../../../../shared/amplitude';
import { SelectFindId, SelectFindPassword } from '../../../../shared/amplitude/events';
import { SelectLoginButton } from '../../../../shared/amplitude/events/login';
import { SelectJoinButton } from '../../../../shared/amplitude/events/signup/SelectJoinButton';
import { syncUserCartItems } from '../../../../cart/shared/services/cart.service';
import { LoginStatus } from '../../../../shared/api/auth/token';
import { setLockedToken } from '../../../block/shared/service';

const STORAGE_KEY = 'saveLoginUserID';
const LOGIN_FAIL_COUNT_FOR_CAPTCHA = 2;
export const saveLocalStorageKey:
  | 'saveLoginUserID-development'
  | 'saveLoginUserID-stage'
  | 'saveLoginUserID-performance'
  | 'saveLoginUserID-production' = `${STORAGE_KEY}-${ENVIRONMENT}`;

export function useLogin() {
  const dispatch = useDispatch();

  const router = useRouter();
  const {
    loginFailCount,
    loginForm: { id, password, captcha, checkboxSaveID },
    guestJwt,
  } = useAppSelector(({ auth }) => ({
    loginFailCount: auth.loginFailCount,
    loginForm: auth.loginForm,
    guestJwt: auth.accessToken,
  }));

  const [isCaptcha, setIsCaptcha] = useState(false);
  const [refreshCaptchaHash, setRefreshCaptchaHash] = useState(Date.now());

  // 실패 카운터 여부가 세션에 있을 경우 시작부터 captcha 설정
  // loginFailCount는 처음에는 session에서, 이후는 API 호출후 가져옴
  useEffect(() => {
    if (loginFailCount >= LOGIN_FAIL_COUNT_FOR_CAPTCHA) {
      setIsCaptcha(true);
    }
  }, [loginFailCount]);

  const handleStoreLoginId = useCallback(
    (storeId: string) => {
      if (!isPC && checkboxSaveID) {
        storeLocalStorage(saveLocalStorageKey, storeId);
      } else {
        removeLocalStorage(saveLocalStorageKey);
      }
    },
    [checkboxSaveID],
  );

  const handleRedirectPage = useCallback(
    (canRecommendChangePassword: boolean) => {
      const {
        internalUrl,
        externalUrl,
        return_url: returnUrl,
      } = router.query as { internalUrl: string; externalUrl: string; return_url: string };
      const isSkip = getCookieOnce(SKIP_COOKIE_NAME);

      if (canRecommendChangePassword && !isSkip) {
        const tempReturnUrl = externalUrl || internalUrl || returnUrl;

        const query = tempReturnUrl ? { return_url: tempReturnUrl } : undefined;

        dispatch(redirectTo({ url: getPageUrl(COMMON_PATH.changePassword), query }));
        return;
      }

      if (returnUrl) {
        dispatch(redirectTo({ url: returnUrl, isExternal: returnUrl.startsWith('http') }));

        return;
      }

      const url = externalUrl || internalUrl || getPageUrl(USER_MENU_PATH.home);
      const isExternal = !!externalUrl;

      dispatch(redirectTo({ url, isExternal }));
    },
    [dispatch, router.query],
  );

  const onChange = useCallback(
    (event: InputEventType) => {
      dispatch(setLoginForm(event));
    },
    [dispatch],
  );

  const onChangeCheckbox = useCallback(
    (checkboxType: 'save' | 'login') => {
      if (checkboxType === 'save') {
        dispatch(setLoginForm({ name: 'checkboxSaveID', value: !checkboxSaveID }));
      }
    },
    [checkboxSaveID, dispatch],
  );

  const onSubmit = async () => {
    if (isCaptcha && !captcha) {
      await Alert({ text: '인증 번호를 입력해 주세요.' });
      return;
    }

    if (!id || !password) {
      await Alert({ text: '아이디 또는 비밀번호를 입력해 주세요.' });
      return;
    }

    try {
      dispatch(showLoading());
      const { canRecommendChangePassword, accessToken, loginStatus } = await postLogin({
        id,
        password,
        captcha,
        guestJwt,
      });

      if (loginStatus === LoginStatus.LOCKED) {
        setLockedToken(accessToken);

        dispatch(
          redirectTo({
            url: getPageUrl(COMMON_PATH.blockInfo),
          }),
        );

        return;
      }

      await syncUserCartItems(accessToken);
      amplitudeService.clearUserProperties();

      dispatch(
        refreshSession(() => {
          handleStoreLoginId(id);
          handleRedirectPage(canRecommendChangePassword);
        }),
      );
    } catch (err) {
      setRefreshCaptchaHash(Date.now());

      const defaultMessage = `아이디, 비밀번호${isCaptcha ? ' 혹은 인증번호' : ''}를 확인해주세요.`;
      const error: { errorMessage: string; loginFailCount: number } = err.message
        ? JSON.parse(err.message)
        : { errorMessage: defaultMessage, loginFailCount: 0 };
      const responseMessage = error.errorMessage;
      dispatch(setLoginFailCount(error.loginFailCount));

      await Alert({ text: responseMessage });
    } finally {
      dispatch(hideLoading());
    }
  };

  const onSubmitForm = async (event?: FormEvent) => {
    event?.preventDefault();
    amplitudeService.logEvent(new SelectLoginButton({ joinPath: 'kurly' }));
    await onSubmit();
  };

  const moveToSignup = useCallback(() => {
    amplitudeService.logEvent(
      new SelectJoinButton({
        joinPath: 'kurly',
      }),
    );
    const { externalUrl, internalUrl } = router.query as { externalUrl: string; internalUrl: string };
    let query = undefined;
    if (internalUrl) {
      query = { internalUrl };
    } else if (externalUrl) {
      query = { externalUrl };
    }
    dispatch(redirectTo({ url: getPageUrl(COMMON_PATH.signup), query }));
  }, [dispatch]);

  const moveToFindId = useCallback(() => {
    amplitudeService.logEvent(new SelectFindId());
    dispatch(redirectTo({ url: getPageUrl(COMMON_PATH.findId) }));
  }, [dispatch]);

  const moveToFindPassword = useCallback(() => {
    amplitudeService.logEvent(new SelectFindPassword());
    dispatch(redirectTo({ url: getPageUrl(COMMON_PATH.findPassword) }));
  }, [dispatch]);

  return {
    onSubmitForm,
    onChange,
    onChangeCheckbox,
    form: {
      id,
      password,
      captcha,
      checkboxSaveID,
    },
    isCaptcha,
    refreshCaptchaHash,
    moveToSignup,
    moveToFindId,
    moveToFindPassword,
  };
}
