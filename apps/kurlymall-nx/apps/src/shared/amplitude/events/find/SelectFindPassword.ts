import { AmplitudeEvent } from '../../AmplitudeEvent';

export class SelectFindPassword extends AmplitudeEvent<void> {
  constructor() {
    super('select_find_password');
  }
}
