import TossProcessContainer from '../../../../../src/order/checkout/shared/containers/payments/process/TossProcessContainer';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../src/server/webview';
import { useAppToken } from '../../../../../src/shared/hooks/useAppToken';
import Loading from '../../../../../src/shared/components/Loading/Loading';

export default function TossProcessPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <TossProcessContainer isMobilePage isGiftOrder />;
}

export const getServerSideProps = getWebviewServerSideProps();
