import { AmplitudeEvent } from '../../AmplitudeEvent';
import { toLowerCase } from '../../../utils/string';

const DEFAULT_EMPTY_VALUE = 'NULL';

export const SELECTION_TYPES = {
  SUBMIT: 'SUBMIT',
  EDIT: 'EDIT',
  BACK: 'BACK',
} as const;

interface Payload {
  notificationType?: string;
  selectionType?: string;
}

export class SelectSubmitReviewNotification extends AmplitudeEvent<Payload> {
  notificationType?: string;

  selectionType?: string;

  constructor(payload: Payload) {
    super('select_submit_review_notification', payload);
    this.notificationType = toLowerCase(payload.notificationType || DEFAULT_EMPTY_VALUE);
    this.selectionType = toLowerCase(payload.selectionType || DEFAULT_EMPTY_VALUE);
  }

  getPayload() {
    return {
      abusing_type: this.notificationType,
      selection_type: this.selectionType,
    };
  }
}
