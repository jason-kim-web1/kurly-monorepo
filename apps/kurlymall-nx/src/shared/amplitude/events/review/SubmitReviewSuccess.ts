import { AmplitudeEvent } from '../../AmplitudeEvent';

export class SubmitReviewSuccess extends AmplitudeEvent<void> {
  constructor() {
    super('submit_review_success');
  }
}
