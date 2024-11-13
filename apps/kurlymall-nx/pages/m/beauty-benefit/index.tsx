import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';

import EventBenefitContainer from '../../../src/event-benefit/shared/containers/EventBenefitContainer';
import MainSiteProvider from '../../../src/main/components/shared/MainSiteProvider';

export default function EventBenefitPage() {
  useScreenName(ScreenName.BENEFIT_LIST);

  return (
    <MainSiteProvider site="BEAUTY">
      <EventBenefitContainer mainSite="BEAUTY" eventType="BEAUTY_BENEFIT" />
    </MainSiteProvider>
  );
}
