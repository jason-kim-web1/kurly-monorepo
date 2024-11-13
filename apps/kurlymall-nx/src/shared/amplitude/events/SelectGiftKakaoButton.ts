import { AmplitudeEvent } from '../AmplitudeEvent';

interface Payload {
  orderNo: number;
}

export class SelectGiftKakaoButton extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_gift_kakao_button', payload);
  }

  getPayload() {
    return {
      transaction_id: this.payload.orderNo,
    };
  }
}
