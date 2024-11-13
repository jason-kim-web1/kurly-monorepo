import { DEFAULT_EVENT_NAME } from '../../../../lego/constants';
import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  url?: string;
  channel?: 'kakao' | 'link';
}

export class ShareEvent extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super(DEFAULT_EVENT_NAME.SHARE_EVENT, payload);
  }

  getPayload() {
    return {
      url: this.payload.url,
    };
  }
}
