import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import { NextPageContext } from 'next';

import PasswordResetFormContainer from '../../../../../src/member/find/password/containers/PasswordResetFormContainer';

import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import BackButton from '../../../../../src/shared/components/Button/BackButton';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';

import { useWebview, useScreenName } from '../../../../../src/shared/hooks';

import { clearTokenStatus, updateToken } from '../../../../../src/member/find/reducers/find.slice';
import { AppState } from '../../../../../src/shared/store';

import Alert from '../../../../../src/shared/components/Alert/Alert';
import { isWebview } from '../../../../../util/window/getDevice';
import appService from '../../../../../src/shared/services/app.service';
import { verifyToken } from '../../../../../src/member/find/services';

import { amplitudeService, ScreenName } from '../../../../../src/shared/amplitude';
import { SetNewPasswordSuccess } from '../../../../../src/shared/amplitude/events';
import { redirectTo } from '../../../../../src/shared/reducers/page';
import { COMMON_PATH, getPageUrl } from '../../../../../src/shared/constant';

export default function PasswordResetPage() {
  useScreenName(ScreenName.FIND_PASSWORD);

  const webview = useWebview();
  const dispatch = useDispatch();
  const { passwordResetForm, tokenStatus } = useSelector((state: AppState) => state.find);

  const router = useRouter();

  const { token = '', by = '' } = router.query;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    dispatch(updateToken(token));
  }, [router.isReady, dispatch, token]);

  useEffect(() => {
    if (tokenStatus === 'EXPIRED') {
      Alert({
        text: `유효 시간이 만료되었습니다.
비밀번호 찾기를 다시 시도해 주세요.`,
        allowOutsideClick: false,
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          dispatch(
            redirectTo({
              url: '/m/member/find/password',
            }),
          );
        }

        dispatch(clearTokenStatus());
      });
    }
  }, [tokenStatus, dispatch]);

  useEffect(() => {
    if (passwordResetForm.status === 'SUCCESS') {
      amplitudeService.logEvent(
        new SetNewPasswordSuccess({
          authenticationMethod: by === 'mobile' ? 'mobile' : 'email',
        }),
      );
      Alert({
        text: '비밀번호 변경이 완료되었습니다.',
        allowOutsideClick: false,
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          if (isWebview()) {
            appService.closeWebview();
            return;
          }

          dispatch(redirectTo({ url: getPageUrl(COMMON_PATH.login) }));

          dispatch(clearTokenStatus());
        }
      });
    }
  }, [passwordResetForm.status, dispatch, by]);

  return (
    <>
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <BackButton />
          </HeaderButtons>
          <HeaderTitle>비밀번호 재설정</HeaderTitle>
        </MobileHeader>
      )}

      <PasswordResetFormContainer />
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const redirect = {
    redirect: {
      destination: '/member/find/password/fail',
      permanent: false,
    },
  };

  const { token } = context.query;
  if (!token) {
    return redirect;
  }

  try {
    const valid = await verifyToken(token as string);
    if (!valid) {
      return redirect;
    }
  } catch {
    return redirect;
  }

  return {
    props: {},
  };
}
