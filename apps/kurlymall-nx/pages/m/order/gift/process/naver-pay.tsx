import NaverPayProcessContainer from '../../../../../src/order/checkout/shared/containers/payments/process/NaverPayProcessContainer';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../src/server/webview';
import { useAppToken } from '../../../../../src/shared/hooks/useAppToken';
import Loading from '../../../../../src/shared/components/Loading/Loading';

export default function NaverPayProcessPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <NaverPayProcessContainer isMobilePage isGiftOrder />;
}

export const getServerSideProps = getWebviewServerSideProps();
