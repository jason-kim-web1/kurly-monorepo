import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  selectionType: 'all' | 'more';
}

export class SelectPhotoReviewList extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_photo_review_list', payload);
  }

  getPayload() {
    return {
      selection_type: this.payload.selectionType,
    };
  }
}
