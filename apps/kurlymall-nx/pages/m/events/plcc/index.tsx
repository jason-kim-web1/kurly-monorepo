import UserMenu from '../../../../src/shared/components/layouts/UserMenu';

import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../src/server/webview';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import PlccEventContainer from '../../../../src/events/plcc/m/containers/PlccEventContainer';
import { useScreenName, useWebview } from '../../../../src/shared/hooks';
import { ScreenName } from '../../../../src/shared/amplitude';
import MobileNavigationBar from '../../../../src/header/containers/m/MobileNavigationBar';

const pageTitle = '컬리카드 신청페이지';

export default function PlccCardGuidePage({ accessToken }: WebviewServerSideProps) {
  useScreenName(ScreenName.EVENT_LIST);

  const webview = useWebview();

  return (
    <AuthContainer appToken={accessToken}>
      <MobileNavigationBar title={pageTitle} leftButtonType="back" rightButtonTypes={['cart']} />
      <PlccEventContainer />
      {!webview && <UserMenu />}
    </AuthContainer>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
