import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  status_type: 'subscribe' | 'unsubscribe' | 'unsubscribe_pending';
}

export class MembershipStatusChange extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('membership_status_change', payload);
  }

  getPayload() {
    return {
      status_type: this.payload.status_type,
    };
  }
}
