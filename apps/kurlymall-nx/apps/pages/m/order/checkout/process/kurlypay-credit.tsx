import KurlyPayCreditProcessContainer from '../../../../../src/order/checkout/shared/containers/payments/process/KurlypayCreditProcessContainer';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../src/server/webview';
import { useAppToken } from '../../../../../src/shared/hooks/useAppToken';
import Loading from '../../../../../src/shared/components/Loading/Loading';

export default function KurlyPayCreditProcessPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <KurlyPayCreditProcessContainer isMobilePage />;
}

export const getServerSideProps = getWebviewServerSideProps();
