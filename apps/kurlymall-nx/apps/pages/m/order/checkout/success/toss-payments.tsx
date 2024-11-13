import TossPaymentsSuccessContainer from '../../../../../src/order/checkout/shared/containers/payments/success/TossPaymentsSuccessContainer';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../src/server/webview';
import { useAppToken } from '../../../../../src/shared/hooks/useAppToken';
import Loading from '../../../../../src/shared/components/Loading/Loading';

export default function TossPaymentsSuccessPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <TossPaymentsSuccessContainer isMobilePage />;
}

export const getServerSideProps = getWebviewServerSideProps();
