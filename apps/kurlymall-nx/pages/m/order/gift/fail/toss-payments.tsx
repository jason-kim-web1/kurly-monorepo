import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../src/server/webview';
import { useAppToken } from '../../../../../src/shared/hooks/useAppToken';
import Loading from '../../../../../src/shared/components/Loading/Loading';
import OrderFailContainer from '../../../../order/checkout/fail/toss-payments';

export default function TossPaymentsFailPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <OrderFailContainer isGiftOrder />;
}

export const getServerSideProps = getWebviewServerSideProps();
