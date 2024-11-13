import { AmplitudeEvent } from '../AmplitudeEvent';

interface Payload {
  event_name: string;
}

export class SelectUserTabMenu extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super(`select_${payload.event_name}_tab`, payload);
  }
}
