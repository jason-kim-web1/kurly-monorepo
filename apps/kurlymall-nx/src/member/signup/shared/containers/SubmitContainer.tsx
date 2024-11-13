import styled from '@emotion/styled';

import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { AxiosError } from 'axios';

import { isEmpty } from 'lodash';

import ReactGA from 'react-ga4';

import { css } from '@emotion/react';

import { useRouter } from 'next/router';

import { COMMON_PATH, getPageUrl } from '../../../../shared/constant';
import COLOR from '../../../../shared/constant/colorset';
import { isPC, isWebview } from '../../../../../util/window/getDevice';
import { useFormEvent } from '../../../../shared/hooks/useFormEvent';

import { deleteCookie, fetchMemberSignup, postLogin } from '../../../../shared/services';
import appService from '../../../../shared/services/app.service';

import { NormalSignupFormInterface } from '../../interfaces/NormalSignupForm.interface';
import { notifyAndFocus, redirectTo } from '../../../../shared/reducers/page';
import { SESSION_KEY } from '../../../../shared/configs/config';
import { BaseApiResponse } from '../../../../shared/interfaces';
import { extractAuthentication } from '../../../../shared/utils/token';
import { syncUserCartItems } from '../../../../cart/shared/services/cart.service';

import { amplitudeService } from '../../../../shared/amplitude';
import { SignUpSuccess } from '../../../../shared/amplitude/events';
import { branchService } from '../../../../shared/branch';
import { CompleteRegistration } from '../../../../shared/branch/events';

import Alert from '../../../../shared/components/Alert/Alert';
import Button from '../../../../shared/components/Button/Button';

const Container = styled.div`
  display: flex;
  justify-content: center;
  ${isPC
    ? css`
        border-top: 1px solid ${COLOR.bgLightGray};
        padding: 40px 0;
      `
    : css`
        padding: 20px;
      `};
`;

export default function SubmitContainer() {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    values,
    context: { errors, isValid, isSubmitting, setSubmitting, handleSubmit: handleFormikSubmit },
  } = useFormEvent<NormalSignupFormInterface>();

  const getReturnUrlQuery = () => {
    const { externalUrl, internalUrl } = router.query as { externalUrl: string; internalUrl: string };
    if (!externalUrl && !internalUrl) {
      return '';
    }
    if (internalUrl) {
      return `?internalUrl=${internalUrl}`;
    } else if (externalUrl) {
      return `?externalUrl=${externalUrl}`;
    }
    return '';
  };

  const checkVerification = useCallback(() => {
    if (!values.isDuplicateCheckID) {
      throw Error(JSON.stringify({ message: '아이디 중복 체크를 해주세요.', documentId: 'memberId' }));
    }

    if (!values.isDuplicateCheckEmail) {
      throw Error(JSON.stringify({ message: '이메일 중복 체크를 해주세요.', documentId: 'email' }));
    }

    if (!values.isVerification) {
      throw Error(JSON.stringify({ message: '휴대폰 인증을 진행해 주세요.', documentId: 'mobileNumber' }));
    }

    if (!values.password) {
      throw Error(JSON.stringify({ message: '비밀번호를 입력해 주세요.', documentId: 'password' }));
    }

    return true;
  }, [values.isDuplicateCheckEmail, values.isDuplicateCheckID, values.isVerification, values.password]);

  const checkTerms = useCallback(() => {
    const requiredTermsAgreed = Object.values(values.agreed)
      .filter(({ required }) => required)
      .every(({ checked }) => checked);

    if (!requiredTermsAgreed) {
      throw Error(JSON.stringify({ message: '필수 이용 약관을 동의해 주세요.', documentId: 'TermsAgreeAll' }));
    }

    return true;
  }, [values.agreed]);

  const handleSubmit = async () => {
    try {
      checkVerification();
      checkTerms();

      if (!isValid) {
        let errorMessages: [string, string][] = [];
        if (errors) {
          const formErrors = errors as { [s: string]: string };
          errorMessages = Object.entries<string>(formErrors);
        }

        if (!isEmpty(errorMessages)) {
          const [documentId, message] = errorMessages[0];
          throw Error(JSON.stringify({ message, documentId }));
        } else {
          throw Error(JSON.stringify({ message: '입력하신 내용을 확인해 주세요' }));
        }
      }

      handleFormikSubmit();
    } catch (err) {
      const { message, documentId }: { message: string; documentId: string } = (err as Error).message
        ? JSON.parse((err as Error).message)
        : '입력하신 내용을 확인해 주세요';

      dispatch(
        notifyAndFocus({
          message,
          ...(documentId && { documentId }),
        }),
      );

      setSubmitting(false);
      return;
    }

    try {
      await fetchMemberSignup(values);
    } catch (err) {
      // 회원가입, 로그인 처리가 안된경우
      const error = err as AxiosError<BaseApiResponse<{ message: string }>>;
      await Alert({
        text: error.response?.data.message ?? '회원가입에 실패 하였습니다. 다시 시도해 주세요!',
      });

      setSubmitting(false);
      return;
    }

    try {
      // 캡차가 존재 할 수 있으므로 기존 로그인된 세션을 삭제후 로그인 합니다.
      deleteCookie(SESSION_KEY);

      const result = await postLogin({ id: values.memberId, password: values.password, captcha: '' });
      const accessToken = result.accessToken;

      await Alert({
        text: '회원가입을 축하드립니다!\n당신의 일상에 컬리를 더해 보세요.',
      });

      await syncUserCartItems(accessToken);

      branchService.setAccessToken(accessToken);
      await branchService.logEvent(new CompleteRegistration());

      amplitudeService.setUserId(extractAuthentication(accessToken).uid);
      amplitudeService.logEvent(
        new SignUpSuccess({
          joinPath: 'kurly',
        }),
      );

      if (isWebview()) {
        appService.postAppMessage({ code: 'WV3000', data: accessToken });
        return;
      }

      ReactGA.event('sign_up');

      const url = `${getPageUrl(COMMON_PATH.signupSuccess)}${getReturnUrlQuery()}`;
      dispatch(redirectTo({ url, isExternal: true }));
    } catch (e) {
      // 회원가입은 되었지만, API 오류로 LOGIN이 되지 못한 경우 로그인 페이지로 이동
      await Alert({
        text: '회원가입을 축하드립니다!\n당신의 일상에 컬리를 더해 보세요.',
      });

      await branchService.logEvent(
        new CompleteRegistration({
          login_status: 'LOGIN_FAILED',
        }),
      );

      amplitudeService.logEvent(
        new SignUpSuccess({
          joinPath: 'kurly',
        }),
      );

      if (isWebview()) {
        appService.postAppMessage({ code: 'WV3001' });
        return;
      }

      ReactGA.event('sign_up');

      const url = `${getPageUrl(COMMON_PATH.login)}${getReturnUrlQuery()}`;
      dispatch(redirectTo({ url, isExternal: true }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Button
        type={'submit'}
        text={'가입하기'}
        width={isPC ? 240 : undefined}
        height={isPC ? 56 : 48}
        radius={3}
        isSubmitLoading={isSubmitting}
        onClick={handleSubmit}
      />
    </Container>
  );
}
