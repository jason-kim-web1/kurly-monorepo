import { useEffect } from 'react';

import { useWebview } from '../../../src/shared/hooks';
import { isWebview } from '../../../util/window/getDevice';
import appService from '../../../src/shared/services/app.service';
import MobileHeader from '../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../src/shared/components/layouts/HeaderTitle';
import CartButtonContainer from '../../../src/shared/containers/m/CartButtonContainer';
import UserMenu from '../../../src/shared/components/layouts/UserMenu';
import DeliveryGuide from '../../../src/user-guide/delivery/components/m/DeliveryGuide';
import Footer from '../../../src/footer/components/m/Footer';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../src/server/webview';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';

export default function Delivery({ accessToken }: WebviewServerSideProps) {
  const webview = useWebview();

  useEffect(() => {
    if (isWebview()) {
      appService.changeTitle('배송안내');
    }
  }, []);

  return (
    <>
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <BackButton />
          </HeaderButtons>
          <HeaderTitle>배송안내</HeaderTitle>
          <HeaderButtons position="right">
            <CartButtonContainer />
          </HeaderButtons>
        </MobileHeader>
      )}

      <AuthContainer appToken={accessToken}>
        <DeliveryGuide />
      </AuthContainer>

      {!webview && (
        <>
          <Footer />
          <UserMenu />
        </>
      )}
    </>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
