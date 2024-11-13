import { AmplitudeEvent } from '../../AmplitudeEvent';

export class SelectViewAllId extends AmplitudeEvent<void> {
  constructor() {
    super('select_view_all_id');
  }
}
