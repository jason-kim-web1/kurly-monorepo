import { AmplitudeEvent } from '../AmplitudeEvent';

interface Payload {
  message: string;
}

export class AddToCartFail extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('add_to_cart_fail', payload);
  }

  getPayload() {
    return this.payload;
  }
}
