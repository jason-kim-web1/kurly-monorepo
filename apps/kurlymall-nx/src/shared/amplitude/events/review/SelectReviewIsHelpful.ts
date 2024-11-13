import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  contentsProductNo: number;
}

export class SelectReviewIsHelpful extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_review_is_helpful', payload);
  }

  getPayload() {
    return {
      content_id: this.payload.contentsProductNo,
    };
  }
}
