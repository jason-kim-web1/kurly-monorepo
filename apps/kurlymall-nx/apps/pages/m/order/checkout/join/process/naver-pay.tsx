import NaverPayProcessContainer from '../../../../../../src/order/checkout/shared/containers/payments/process/NaverPayProcessContainer';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../../src/server/webview';
import Loading from '../../../../../../src/shared/components/Loading/Loading';
import { useAppToken } from '../../../../../../src/shared/hooks/useAppToken';

export default function NaverPayProcessPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <NaverPayProcessContainer isMobilePage isJoinOrder />;
}

export const getServerSideProps = getWebviewServerSideProps();
