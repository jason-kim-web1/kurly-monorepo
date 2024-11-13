import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  orderNumber: string;
  isGiftPurchase: boolean;
  isDirectCheckout: boolean;
  paymentMethod: string;
  referrerEvent?: string | null;
}

export class CheckoutSuccess extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('checkout_success', payload);
  }

  getPayload() {
    return {
      transaction_id: this.payload.orderNumber,
      is_gift_purchase: this.payload.isGiftPurchase,
      is_direct_purchase: this.payload.isDirectCheckout,
      payment_method: this.payload.paymentMethod,
      referrer_event: this.payload.referrerEvent,
    };
  }
}
