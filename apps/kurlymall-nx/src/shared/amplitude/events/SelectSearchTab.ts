import { AmplitudeEvent } from '../AmplitudeEvent';

export class SelectSearchTab extends AmplitudeEvent<void> {
  constructor() {
    super('select_search_tab');
  }
}
