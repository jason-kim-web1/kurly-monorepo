import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  selectionType: 'item' | 'all';
}

export class SelectMembershipCollection extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_membership_collection', payload);
  }

  getPayload() {
    return {
      selection_type: this.payload.selectionType,
    };
  }
}
