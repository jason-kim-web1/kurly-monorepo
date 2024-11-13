import { AmplitudeEvent } from '../../AmplitudeEvent';
import { toLowerCase } from '../../../utils/string';

const DEFAULT_EMPTY_VALUE = 'NULL';

interface Payload {
  notificationType?: string;
}

export class ImpressionSubmitReviewNotification extends AmplitudeEvent<Payload> {
  notificationType?: string;

  constructor(payload: Payload) {
    super('impression_submit_review_notification', payload);
    this.notificationType = toLowerCase(payload.notificationType || DEFAULT_EMPTY_VALUE);
  }

  getPayload() {
    return {
      abusing_type: this.notificationType,
    };
  }
}
