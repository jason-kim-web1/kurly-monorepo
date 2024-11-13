import { DEFAULT_EVENT_NAME } from '../../../../lego/constants';
import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  url: string;
  pageName: string;
}

export class ViewEventDetail25 extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super(DEFAULT_EVENT_NAME.VIEW_EVENT_DETAIL_25, payload);
  }

  getPayload() {
    return {
      url: this.payload.url,
      page_name: this.payload.pageName,
    };
  }
}
