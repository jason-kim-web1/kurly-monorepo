import KurlyPayProcessContainer from '../../../../../src/order/checkout/shared/containers/payments/process/KurlyPayProcessContainer';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../src/server/webview';
import { useAppToken } from '../../../../../src/shared/hooks/useAppToken';
import Loading from '../../../../../src/shared/components/Loading/Loading';

export default function KurlyPayProcessPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <KurlyPayProcessContainer isMobilePage />;
}

export const getServerSideProps = getWebviewServerSideProps();
