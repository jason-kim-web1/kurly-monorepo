import { useEffect } from 'react';

import { useWebview } from '../../../../src/shared/hooks';

import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import CartButtonContainer from '../../../../src/shared/containers/m/CartButtonContainer';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import LeaveContainer from '../../../../src/mypage/leave/shared/containers/LeaveContainer';
import { isWebview } from '../../../../util/window/getDevice';
import appService from '../../../../src/shared/services/app.service';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../src/server/webview';
import UserMenu from '../../../../src/shared/components/layouts/UserMenu';

export default function LeavePage({ accessToken }: WebviewServerSideProps) {
  const webview = useWebview();

  useEffect(() => {
    if (isWebview()) {
      appService.changeTitle('회원탈퇴');
    }
  }, []);

  return (
    <>
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <BackButton />
          </HeaderButtons>
          <HeaderTitle>회원탈퇴</HeaderTitle>
          <HeaderButtons position="right">
            <CartButtonContainer />
          </HeaderButtons>
        </MobileHeader>
      )}

      <AuthContainer loginRequired appToken={accessToken}>
        <LeaveContainer />
      </AuthContainer>

      {!webview && <UserMenu />}
    </>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
