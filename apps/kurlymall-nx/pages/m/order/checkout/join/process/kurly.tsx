import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../../src/server/webview';
import { useAppToken } from '../../../../../../src/shared/hooks/useAppToken';
import Loading from '../../../../../../src/shared/components/Loading/Loading';
import KurlyProcessContainer from '../../../../../../src/order/checkout/shared/containers/payments/process/KurlyProcessContainer';

export default function KurlyProcessPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <KurlyProcessContainer isMobilePage isJoinOrder />;
}

export const getServerSideProps = getWebviewServerSideProps();
