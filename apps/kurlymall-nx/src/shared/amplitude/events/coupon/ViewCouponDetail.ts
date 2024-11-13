import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  couponCode: number;
}

export class ViewCouponDetail extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('view_coupon_detail', payload);
  }

  getPayload() {
    return {
      coupon_code: this.payload.couponCode,
    };
  }
}
