import { MainSite } from '../../interfaces/MainSection.interface';
import { amplitudeService } from '../../../shared/amplitude';
import { AmplitudeEvent } from '../../../shared/amplitude/AmplitudeEvent';
import { SubTabEventProperties } from './types';
import { SelectSubtab } from '../../../shared/amplitude/events';

export default function useHomeAmplitude() {
  const logSelectSite = (site: MainSite) => {
    amplitudeService.logEvent(
      new AmplitudeEvent('select_site', {
        site_info: site.toLowerCase(),
        selection_type: 'swipe',
      }),
    );
  };

  const logSelectSiteHomeTab = (site: MainSite) => {
    amplitudeService.logEvent(
      new AmplitudeEvent('select_site', {
        site_info: site.toLowerCase(),
        selection_type: 'home_tab',
      }),
    );
  };

  const logSelectSubTab = (
    type: string,
    id: string,
    position: number,
    name: string,
    selectionType: SubTabEventProperties['selection_type'],
  ) => {
    amplitudeService.logEvent(new SelectSubtab({ type, id, position, name, selectionType }));
  };

  return {
    logSelectSite,
    logSelectSubTab,
    logSelectSiteHomeTab,
  };
}
