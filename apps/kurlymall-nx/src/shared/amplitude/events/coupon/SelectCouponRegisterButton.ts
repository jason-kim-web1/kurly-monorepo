import { AmplitudeEvent } from '../../AmplitudeEvent';

export class SelectCouponRegisterButton extends AmplitudeEvent<void> {
  constructor() {
    super('select_coupon_register_button');
  }
}
