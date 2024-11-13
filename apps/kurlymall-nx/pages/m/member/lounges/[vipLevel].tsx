import { useRouter } from 'next/router';

import VIPContainer from '../../../../src/member/lounges/container/VIPContainer';
import Loading from '../../../../src/shared/components/Loading/Loading';
import UserMenu from '../../../../src/shared/components/layouts/UserMenu';
import { useScreenName, useWebview } from '../../../../src/shared/hooks';
import MobileNavigationBar from '../../../../src/header/containers/m/MobileNavigationBar';
import { BUTTON_TYPE } from '../../../../src/shared/services';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import { WebviewServerSideProps, getWebviewServerSideProps } from '../../../../src/server/webview';
import { ScreenName } from '../../../../src/shared/amplitude';
import useVIPLevel from '../../../../src/member/shared/useVIPLevel';

export default function LoungesPage({ accessToken }: WebviewServerSideProps) {
  const {
    isReady,
    query: { isSubTab },
  } = useRouter();

  const webview = useWebview();

  const { headerTitle, isVVIP } = useVIPLevel();
  useScreenName(isVVIP ? ScreenName.VVIP : ScreenName.VIP);

  if (!isReady) {
    return <Loading />;
  }

  const isMoWebSubTab = !webview && isSubTab === 'true';

  if (isMoWebSubTab) {
    return (
      <AuthContainer loginRequired appToken={accessToken}>
        <VIPContainer />
      </AuthContainer>
    );
  }

  return (
    <>
      <MobileNavigationBar title={headerTitle} leftButtonType={BUTTON_TYPE.back} />
      <AuthContainer loginRequired appToken={accessToken}>
        <VIPContainer />
      </AuthContainer>
      {!webview && <UserMenu />}
    </>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
