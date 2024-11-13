import MainContainer from '../../../src/main/components/m/container/MainContainer';
import MainSiteProvider from '../../../src/main/components/shared/MainSiteProvider';
import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';
import useMainPage from '../../../src/main/hooks/useMainPage';
import useLoadKakao from '../../../src/shared/hooks/useLoadKakao';

export default function MainMarketPage() {
  useScreenName(ScreenName.RECOMMENDATION);
  useMainPage();
  useLoadKakao();

  return (
    <MainSiteProvider site="MARKET">
      <MainContainer />
    </MainSiteProvider>
  );
}
