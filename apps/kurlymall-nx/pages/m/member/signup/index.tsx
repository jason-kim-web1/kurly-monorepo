import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../../src/shared/store';
import { USER_MENU_PATH } from '../../../../src/shared/constant';

import Alert from '../../../../src/shared/components/Alert/Alert';
import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import CartButtonContainer from '../../../../src/shared/containers/m/CartButtonContainer';
import SignupContainer from '../../../../src/member/signup/shared/containers/SignupContainer';
import { useWebview } from '../../../../src/shared/hooks';
import { isWebview } from '../../../../util/window/getDevice';
import appService from '../../../../src/shared/services/app.service';
import UserMenu from '../../../../src/shared/components/layouts/UserMenu';
import { loadSession } from '../../../../src/shared/reducers/auth';
import { deleteCookie } from '../../../../src/shared/services';
import { SESSION_KEY_DEV, SESSION_KEY_PROD } from '../../../../src/shared/configs/config';
import { redirectTo } from '../../../../src/shared/reducers/page';
import { getWebviewServerSideProps } from '../../../../src/server/webview';

export default function SignupPage() {
  const dispatch = useDispatch();

  const webview = useWebview();
  const { isGuest } = useAppSelector(({ auth }) => auth);

  useEffect(() => {
    if (!isGuest) {
      Alert({ text: '이미 로그인 상태 입니다.' }).then(() => {
        dispatch(
          redirectTo({
            url: USER_MENU_PATH.home.uri,
            replace: true,
          }),
        );
      });
    }
  }, [dispatch, isGuest]);

  useEffect(() => {
    if (isWebview()) {
      appService.changeTitle('회원가입');
      // 앱에서는 로그아웃 하고 접근하여도 쿠키가 존재하여, 해당 쿠키를 강제로 제거 합니다.
      deleteCookie(SESSION_KEY_DEV, SESSION_KEY_PROD);
      dispatch(loadSession());
    }
  }, [dispatch]);

  return (
    <>
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <BackButton />
          </HeaderButtons>
          <HeaderTitle>회원가입</HeaderTitle>
          <HeaderButtons position="right">
            <CartButtonContainer />
          </HeaderButtons>
        </MobileHeader>
      )}
      <SignupContainer />
      {!webview && <UserMenu />}
    </>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
