import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  url: string;
}

/**
 * 마이컬리 내 이벤트 배너 클릭시
 * @extends AmplitudeEvent
 */
export class SelectMyKurlyBanner extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_my_kurly_banner', payload);
  }

  getPayload() {
    return {
      url: this.payload.url,
    };
  }
}
