import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  option_name: string;
}

export class SelectMembershipCouponPackChange extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_membership_couponpack_change', payload);
  }

  getPayload() {
    return {
      option_name: this.payload.option_name,
    };
  }
}
