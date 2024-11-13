import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  pageName: string;
  message: string;
}

export class SelectMembershipUnsubscribe extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_membership_unsubscribe', payload);
  }

  getPayload() {
    return {
      page_name: this.payload?.pageName,
      message: this.payload?.message,
    };
  }
}
