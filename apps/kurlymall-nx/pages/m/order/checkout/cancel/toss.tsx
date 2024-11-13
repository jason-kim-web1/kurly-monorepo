import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../src/server/webview';
import { useAppToken } from '../../../../../src/shared/hooks/useAppToken';
import Loading from '../../../../../src/shared/components/Loading/Loading';
import OrderCancelContainer from '../../../../../src/order/checkout/shared/containers/payments/cancel/OrderCancelContainer';

export default function TossCancelPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <OrderCancelContainer />;
}

export const getServerSideProps = getWebviewServerSideProps();
