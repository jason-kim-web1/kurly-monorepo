import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  couponCode: string;
}

export class CouponRegisterSuccess extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('coupon_register_success', payload);
  }

  getPayload() {
    return {
      coupon_code: this.payload.couponCode,
    };
  }
}
