import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  authenticationMethod: 'mobile' | 'email';
}

export class FindPasswordSuccess extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('find_password_success', payload);
  }

  getPayload() {
    return {
      authentication_method: this.payload.authenticationMethod,
    };
  }
}
