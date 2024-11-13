import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../../src/server/webview';
import Loading from '../../../../../../src/shared/components/Loading/Loading';
import OrderFailContainer from '../../../../../../src/order/checkout/shared/containers/payments/fail/OrderFailContainer';
import { useAppToken } from '../../../../../../src/shared/hooks/useAppToken';

export default function TossPaymentsFailPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <OrderFailContainer />;
}

export const getServerSideProps = getWebviewServerSideProps();
