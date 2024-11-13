import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  isFirst: boolean;
}

export class SubmitReview extends AmplitudeEvent<Payload> {
  isFirst?: boolean;

  constructor(payload: Payload) {
    super('submit_review', payload);
    this.isFirst = payload.isFirst;
  }

  getPayload() {
    return {
      is_first: this.isFirst,
    };
  }
}
