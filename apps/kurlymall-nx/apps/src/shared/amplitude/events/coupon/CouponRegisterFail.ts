import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  couponCode: string;
}

export class CouponRegisterFail extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('coupon_register_fail', payload);
  }

  getPayload() {
    return {
      coupon_code: this.payload.couponCode,
    };
  }
}
