import MainContainer from '../../../src/main/components/m/container/MainContainer';
import MainSiteProvider from '../../../src/main/components/shared/MainSiteProvider';
import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';
import useMainPage from '../../../src/main/hooks/useMainPage';

export default function MainBeautyPage() {
  useScreenName(ScreenName.RECOMMENDATION);
  useMainPage();

  return (
    <MainSiteProvider site="BEAUTY">
      <MainContainer />
    </MainSiteProvider>
  );
}
