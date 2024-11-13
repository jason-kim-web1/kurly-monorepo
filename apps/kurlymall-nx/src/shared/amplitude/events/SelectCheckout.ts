import { KurlypayType } from '../../interfaces';
import { AmplitudeEvent } from '../AmplitudeEvent';

interface Payload {
  // 결제 수단 (paymentMethod)
  paymentMethod: KurlypayType | string;
  referrerEvent?: string | null;
}

/**
 * 주문서에서 'xx원 결제하기' 를 눌렀을 경우
 * 선택한 결제수단을 리턴합니다.
 *
 * @extends AmplitudeEvent
 */
export class SelectCheckout extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_checkout', payload);
  }

  getPayload() {
    return {
      payment_method: this.payload.paymentMethod,
      referrer_event: this.payload.referrerEvent,
    };
  }
}
