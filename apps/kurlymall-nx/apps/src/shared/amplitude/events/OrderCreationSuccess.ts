import { AmplitudeEvent } from '../AmplitudeEvent';

interface Payload {
  isGiftPurchase: boolean;
  isDirectCheckout: boolean;
  referrerEvent?: string | null;
}

export class OrderCreationSuccess extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('order_creation_success', payload);
  }

  getPayload() {
    return {
      is_gift_purchase: this.payload.isGiftPurchase,
      is_direct_purchase: this.payload.isDirectCheckout,
      referrer_event: this.payload.referrerEvent,
    };
  }
}
