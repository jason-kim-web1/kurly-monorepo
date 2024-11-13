import KakaoPayProcessContainer from '../../../../../src/order/checkout/shared/containers/payments/process/KakaoPayProcessContainer';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../src/server/webview';
import { useAppToken } from '../../../../../src/shared/hooks/useAppToken';
import Loading from '../../../../../src/shared/components/Loading/Loading';

export default function KakaoPayProcessPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <KakaoPayProcessContainer isMobilePage isGiftOrder />;
}

export const getServerSideProps = getWebviewServerSideProps();
