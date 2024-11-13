import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  selection_type: 'my_membership_info';
}

export class SelectMembershipPartnerBenefits extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_membership_partner_benefits', payload);
  }

  getPayload() {
    return {
      selection_type: this.payload.selection_type,
    };
  }
}
