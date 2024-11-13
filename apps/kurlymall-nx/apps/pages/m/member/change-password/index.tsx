import { useEffect } from 'react';

import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import CartButtonContainer from '../../../../src/shared/containers/m/CartButtonContainer';

import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import ChangePasswordContainer from '../../../../src/member/change-password/shared/containers/ChangePassword';
import { useWebview } from '../../../../src/shared/hooks';
import { isWebview } from '../../../../util/window/getDevice';
import appService from '../../../../src/shared/services/app.service';
import UserMenu from '../../../../src/shared/components/layouts/UserMenu';

export default function ChangePassword() {
  const webview = useWebview();

  useEffect(() => {
    if (isWebview()) {
      appService.changeTitle('비밀번호 변경');
    }
  }, []);

  return (
    <>
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <BackButton />
          </HeaderButtons>
          <HeaderTitle>비밀번호 변경</HeaderTitle>
          <HeaderButtons position="right">
            <CartButtonContainer />
          </HeaderButtons>
        </MobileHeader>
      )}

      <AuthContainer loginRequired>
        <ChangePasswordContainer />
      </AuthContainer>

      {!webview && <UserMenu />}
    </>
  );
}
