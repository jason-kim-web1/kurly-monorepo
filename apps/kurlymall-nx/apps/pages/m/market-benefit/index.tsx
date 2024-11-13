import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';

import EventBenefitContainer from '../../../src/event-benefit/shared/containers/EventBenefitContainer';

import MainSiteProvider from '../../../src/main/components/shared/MainSiteProvider';

export default function EventBenefitPage() {
  useScreenName(ScreenName.EVENT_LIST);

  return (
    <MainSiteProvider site="MARKET">
      <EventBenefitContainer mainSite="MARKET" />
    </MainSiteProvider>
  );
}
