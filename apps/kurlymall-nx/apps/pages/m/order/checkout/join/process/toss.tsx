import TossProcessContainer from '../../../../../../src/order/checkout/shared/containers/payments/process/TossProcessContainer';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../../src/server/webview';
import Loading from '../../../../../../src/shared/components/Loading/Loading';
import { useAppToken } from '../../../../../../src/shared/hooks/useAppToken';

export default function TossProcessPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <TossProcessContainer isMobilePage isJoinOrder />;
}

export const getServerSideProps = getWebviewServerSideProps();
