import { DEFAULT_EVENT_NAME } from '../../../../lego/constants';
import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  url?: string;
}

export class ViewEventDetail extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super(DEFAULT_EVENT_NAME.VIEW_EVENT_DETAIL, payload);
  }

  getPayload() {
    return {
      url: this.payload.url,
    };
  }
}
