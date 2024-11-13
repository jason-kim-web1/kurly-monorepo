import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  contentsProductNo: number;
}

export class RemoveReviewIsHelpful extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('remove_review_is_helpful', payload);
  }

  getPayload() {
    return {
      content_id: this.payload.contentsProductNo,
    };
  }
}
