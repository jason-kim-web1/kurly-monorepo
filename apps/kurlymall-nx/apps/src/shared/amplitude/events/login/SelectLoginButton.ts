import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  joinPath: 'kurly';
}

export class SelectLoginButton extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_login_button', payload);
  }

  getPayload() {
    return {
      join_path: this.payload.joinPath,
    };
  }
}
