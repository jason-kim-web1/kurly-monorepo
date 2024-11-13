import { useScreenName } from '../../src/shared/hooks';
import { ScreenName } from '../../src/shared/amplitude';

import Header from '../../src/header/components/Header';
import EventBenefitContainer from '../../src/event-benefit/shared/containers/EventBenefitContainer';
import Footer from '../../src/footer/components/Footer';
import MainSiteProvider from '../../src/main/components/shared/MainSiteProvider';
import ScrollEventTopButton from '../../src/shared/components/Scroll/ScrollEventTopButton';

export default function EventBenefitPage() {
  useScreenName(ScreenName.EVENT_LIST);

  return (
    <>
      <MainSiteProvider site="MARKET">
        <Header />
      </MainSiteProvider>
      <ScrollEventTopButton>
        <EventBenefitContainer mainSite="MARKET" />
      </ScrollEventTopButton>
      <Footer />
    </>
  );
}
