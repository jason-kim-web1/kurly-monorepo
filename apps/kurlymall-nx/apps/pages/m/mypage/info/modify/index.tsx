import { useEffect } from 'react';

import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import BackButton from '../../../../../src/shared/components/Button/BackButton';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import CartButtonContainer from '../../../../../src/shared/containers/m/CartButtonContainer';
import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';
import MyInfoModifyContainer from '../../../../../src/mypage/myinfo/shared/containers/MyInfoModifyContainer';
import { useScreenName, useWebview } from '../../../../../src/shared/hooks';
import { isWebview } from '../../../../../util/window/getDevice';
import appService from '../../../../../src/shared/services/app.service';
import { getWebviewServerSideProps } from '../../../../../src/server/webview';
import UserMenu from '../../../../../src/shared/components/layouts/UserMenu';
import { ScreenName } from '../../../../../src/shared/amplitude';

export default function MyInfoModifyPage({ accessToken }: { accessToken: string }) {
  useScreenName(ScreenName.ACCOUNT_EDIT);

  const webview = useWebview();

  useEffect(() => {
    if (isWebview()) {
      appService.changeTitle('개인정보 수정');
    }
  }, []);

  return (
    <>
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <BackButton />
          </HeaderButtons>
          <HeaderTitle>개인정보수정</HeaderTitle>
          <HeaderButtons position="right">
            <CartButtonContainer />
          </HeaderButtons>
        </MobileHeader>
      )}

      <AuthContainer loginRequired appToken={accessToken}>
        <MyInfoModifyContainer />
      </AuthContainer>

      {!webview && <UserMenu />}
    </>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
