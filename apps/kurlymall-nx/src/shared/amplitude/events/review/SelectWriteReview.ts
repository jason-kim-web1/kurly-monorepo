import { AmplitudeEvent } from '../../AmplitudeEvent';

export class SelectWriteReview extends AmplitudeEvent<void> {
  constructor() {
    super('select_write_review');
  }
}
