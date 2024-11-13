import VIPContainer from '../../../src/member/lounges/container/VIPContainer';
import PageMetaData from '../../../src/shared/components/PageMeta/PageMetaData';
import { LOUNGE_PATH } from '../../../src/shared/constant';
import MainSiteProvider from '../../../src/main/components/shared/MainSiteProvider';
import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';
import useVIPLevel from '../../../src/member/shared/useVIPLevel';

function LoungesPage() {
  const { headerTitle, isVVIP } = useVIPLevel();
  useScreenName(isVVIP ? ScreenName.VVIP : ScreenName.VIP);

  return (
    <>
      <PageMetaData
        title={headerTitle}
        description={headerTitle}
        url={isVVIP ? LOUNGE_PATH.vvip.uri : LOUNGE_PATH.vip.uri}
        keyword={headerTitle}
      />
      <MainSiteProvider>
        <Header />
      </MainSiteProvider>
      <AuthContainer loginRequired>
        <VIPContainer />
      </AuthContainer>
      <Footer />
    </>
  );
}

export default LoungesPage;
