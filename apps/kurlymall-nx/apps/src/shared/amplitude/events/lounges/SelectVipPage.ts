import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  url: string;
}

export class SelectVipPage extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_vip_page', payload);
  }

  getPayload() {
    return {
      url: this.payload.url,
    };
  }
}
