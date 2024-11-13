import KurlyPayProcessContainer from '../../../../../../src/order/checkout/shared/containers/payments/process/KurlyPayProcessContainer';
import Loading from '../../../../../../src/shared/components/Loading/Loading';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../../src/server/webview';
import { useAppToken } from '../../../../../../src/shared/hooks/useAppToken';

export default function KurlyPayProcessPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <KurlyPayProcessContainer isMobilePage isJoinOrder />;
}

export const getServerSideProps = getWebviewServerSideProps();
