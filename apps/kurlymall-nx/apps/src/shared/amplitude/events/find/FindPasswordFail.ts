import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  authenticationMethod: 'mobile' | 'email';
}

export class FindPasswordFail extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('find_password_fail', payload);
  }

  getPayload() {
    return {
      authentication_method: this.payload.authenticationMethod,
    };
  }
}
