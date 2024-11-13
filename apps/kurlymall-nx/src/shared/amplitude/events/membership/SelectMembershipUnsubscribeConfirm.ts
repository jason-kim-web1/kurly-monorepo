import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  pageName: 'survey' | 'confirmsheet' | 'confirmsheet_agreement';
  message: string;
}

export class SelectMembershipUnsubscribeConfirm extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_membership_unsubscribe_confirm', payload);
  }

  getPayload() {
    return {
      page_name: this.payload?.pageName,
      message: this.payload?.message,
    };
  }
}
