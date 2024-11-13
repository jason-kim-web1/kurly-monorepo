import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  partner_id: string;
}

export class SelectMembershipPartnerBenefitsDetail extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_membership_partner_benefits_detail', payload);
  }

  getPayload() {
    return {
      partner_id: this.payload.partner_id,
    };
  }
}
