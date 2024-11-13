import { AmplitudeEvent } from '../../AmplitudeEvent';

export class SelectFindId extends AmplitudeEvent<void> {
  constructor() {
    super('select_find_id');
  }
}
