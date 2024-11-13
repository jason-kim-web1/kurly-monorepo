import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  message: string;
}

/**
 * 장바구니 담기 실패
 * @extends AmplitudeEvent
 */
export class ProductAddToCartFail extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('add_to_cart_fail', payload);
  }

  getPayload() {
    return this.payload;
  }
}
