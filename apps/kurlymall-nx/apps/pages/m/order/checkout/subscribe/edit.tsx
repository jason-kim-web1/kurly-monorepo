import MobileNavigationBar from '../../../../../src/header/containers/m/MobileNavigationBar';

import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';
import MembersEditPaymentContainer from '../../../../../src/order/subscribe/containers/MembersEditPaymentContainer';
import { WebviewServerSideProps, getWebviewServerSideProps } from '../../../../../src/server/webview';
import { useAppToken } from '../../../../../src/shared/hooks/useAppToken';

export default function EditCheckoutSubscribePage({ accessToken }: WebviewServerSideProps) {
  const { appToken, isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return null;
  }

  return (
    <>
      <MobileNavigationBar title="결제수단 변경" leftButtonType="back" />
      <AuthContainer loginRequired appToken={appToken}>
        <MembersEditPaymentContainer />
      </AuthContainer>
    </>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
