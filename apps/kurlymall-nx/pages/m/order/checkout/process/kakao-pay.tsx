import KakaoPayProcessContainer from '../../../../../src/order/checkout/shared/containers/payments/process/KakaoPayProcessContainer';
import { useAppToken } from '../../../../../src/shared/hooks/useAppToken';
import Loading from '../../../../../src/shared/components/Loading/Loading';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../src/server/webview';

export default function KakaoPayProcessPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <KakaoPayProcessContainer isMobilePage />;
}

export const getServerSideProps = getWebviewServerSideProps();
