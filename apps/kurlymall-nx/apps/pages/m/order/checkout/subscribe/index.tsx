import MembersSubscribeCheckoutContainer from '../../../../../src/order/subscribe/containers/MembersSubscribeCheckoutContainer';
import MobileNavigationBar from '../../../../../src/header/containers/m/MobileNavigationBar';
import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';

import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../src/server/webview';
import { useAppToken } from '../../../../../src/shared/hooks/useAppToken';

export default function CheckoutSubscribePage({ accessToken }: WebviewServerSideProps) {
  const { appToken, isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return null;
  }

  return (
    <>
      <MobileNavigationBar title="자동/정기결제" leftButtonType="back" />
      <AuthContainer loginRequired appToken={appToken}>
        <MembersSubscribeCheckoutContainer />
      </AuthContainer>
    </>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
