import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  joinPath: 'kurly';
}

export class LoginSuccess extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('login_success', payload);
  }

  getPayload() {
    return {
      join_path: this.payload.joinPath,
    };
  }
}
