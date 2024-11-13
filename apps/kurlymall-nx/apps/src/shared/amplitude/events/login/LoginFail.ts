import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  message: string;
}

export class LoginFail extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('login_fail', payload);
  }

  getPayload() {
    return {
      message: this.payload.message,
    };
  }
}
