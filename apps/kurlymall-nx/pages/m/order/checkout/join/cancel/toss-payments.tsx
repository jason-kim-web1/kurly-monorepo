import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../../src/server/webview';
import Loading from '../../../../../../src/shared/components/Loading/Loading';
import OrderCancelContainer from '../../../../../../src/order/checkout/shared/containers/payments/cancel/OrderCancelContainer';
import { useAppToken } from '../../../../../../src/shared/hooks/useAppToken';

export default function TossPaymentsCancelPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <OrderCancelContainer isJoinOrder />;
}

export const getServerSideProps = getWebviewServerSideProps();
