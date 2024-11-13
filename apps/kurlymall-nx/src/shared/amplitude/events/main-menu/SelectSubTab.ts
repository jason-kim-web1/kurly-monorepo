import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  eventName: string;
}

export class SelectSubTab extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super(payload.eventName, payload);
  }

  getPayload() {
    const { eventName } = this.payload;
    return {
      event_name: eventName,
    };
  }
}
