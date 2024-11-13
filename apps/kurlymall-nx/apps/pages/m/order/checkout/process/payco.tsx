import PaycoProcessContainer from '../../../../../src/order/checkout/shared/containers/payments/process/PaycoProcessContainer';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../src/server/webview';
import { useAppToken } from '../../../../../src/shared/hooks/useAppToken';
import Loading from '../../../../../src/shared/components/Loading/Loading';

export default function PaycoProcessPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <PaycoProcessContainer isMobilePage />;
}

export const getServerSideProps = getWebviewServerSideProps();
