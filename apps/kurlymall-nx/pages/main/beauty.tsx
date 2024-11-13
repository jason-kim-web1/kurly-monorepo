import Header from '../../src/header/components/Header';
import MainContainer from '../../src/main/components/pc/container/MainContainer';
import MainSiteProvider from '../../src/main/components/shared/MainSiteProvider';
import { useScreenName } from '../../src/shared/hooks';
import { ScreenName } from '../../src/shared/amplitude';

export default function MainMarketPage() {
  useScreenName(ScreenName.RECOMMENDATION);

  return (
    <MainSiteProvider site="BEAUTY">
      <Header />
      <MainContainer />
    </MainSiteProvider>
  );
}
