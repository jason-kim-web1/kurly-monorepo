import TossPaymentsSuccessContainer from '../../../../../../src/order/checkout/shared/containers/payments/success/TossPaymentsSuccessContainer';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../../src/server/webview';
import Loading from '../../../../../../src/shared/components/Loading/Loading';
import { useAppToken } from '../../../../../../src/shared/hooks/useAppToken';

export default function TossPaymentsSuccessPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <TossPaymentsSuccessContainer isMobilePage isJoinOrder />;
}

export const getServerSideProps = getWebviewServerSideProps();
