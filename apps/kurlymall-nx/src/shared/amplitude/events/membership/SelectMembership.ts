import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  selection_type: 'my_kurly_top' | 'my_kurly_menu' | 'event_page' | 'members_deal' | 'members_partner_benefits';
}

export class SelectMembership extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_membership', payload);
  }

  getPayload() {
    return {
      selection_type: this.payload.selection_type,
    };
  }
}
