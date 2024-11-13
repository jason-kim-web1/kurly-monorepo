import { useScreenName } from '../../src/shared/hooks';
import { ScreenName } from '../../src/shared/amplitude';

import Header from '../../src/header/components/Header';
import EventBenefitContainer from '../../src/event-benefit/shared/containers/EventBenefitContainer';
import Footer from '../../src/footer/components/Footer';
import MainSiteProvider from '../../src/main/components/shared/MainSiteProvider';
import ScrollEventTopButton from '../../src/shared/components/Scroll/ScrollEventTopButton';

export default function EventBenefitPage() {
  useScreenName(ScreenName.BENEFIT_LIST);

  return (
    <>
      <MainSiteProvider site="BEAUTY">
        <Header />
      </MainSiteProvider>
      <ScrollEventTopButton>
        <EventBenefitContainer mainSite="BEAUTY" eventType="BEAUTY_BENEFIT" />
      </ScrollEventTopButton>
      <Footer />
    </>
  );
}
