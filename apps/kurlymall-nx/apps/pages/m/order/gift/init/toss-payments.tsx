import TossPaymentsInitContainer from '../../../../order/checkout/init/toss-payments';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../src/server/webview';
import { useAppToken } from '../../../../../src/shared/hooks/useAppToken';
import Loading from '../../../../../src/shared/components/Loading/Loading';

export default function TossPaymentsInitPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <TossPaymentsInitContainer isMobilePage />;
}

export const getServerSideProps = getWebviewServerSideProps();
