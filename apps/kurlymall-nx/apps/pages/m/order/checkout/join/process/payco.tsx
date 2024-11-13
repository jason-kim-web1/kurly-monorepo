import PaycoProcessContainer from '../../../../../../src/order/checkout/shared/containers/payments/process/PaycoProcessContainer';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../../src/server/webview';
import Loading from '../../../../../../src/shared/components/Loading/Loading';
import { useAppToken } from '../../../../../../src/shared/hooks/useAppToken';

export default function PaycoProcessPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <PaycoProcessContainer isMobilePage isJoinOrder />;
}

export const getServerSideProps = getWebviewServerSideProps();
