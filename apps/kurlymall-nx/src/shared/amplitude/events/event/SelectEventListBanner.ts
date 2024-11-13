import { AmplitudeEvent } from '../../AmplitudeEvent';

export class SelectEventListBanner extends AmplitudeEvent<void> {
  constructor() {
    super('select_event_list_banner');
  }
}
