import OrderCancelContainer from '../../../../../src/order/checkout/shared/containers/payments/cancel/OrderCancelContainer';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../src/server/webview';
import { useAppToken } from '../../../../../src/shared/hooks/useAppToken';
import Loading from '../../../../../src/shared/components/Loading/Loading';

export default function TossPaymentsCancelPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <OrderCancelContainer />;
}

export const getServerSideProps = getWebviewServerSideProps();