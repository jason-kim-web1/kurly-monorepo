import KakaoPayProcessContainer from '../../../../../../src/order/checkout/shared/containers/payments/process/KakaoPayProcessContainer';

import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../../src/server/webview';
import Loading from '../../../../../../src/shared/components/Loading/Loading';
import { useAppToken } from '../../../../../../src/shared/hooks/useAppToken';

export default function KakaoPayProcessPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <KakaoPayProcessContainer isMobilePage isJoinOrder />;
}

export const getServerSideProps = getWebviewServerSideProps();
