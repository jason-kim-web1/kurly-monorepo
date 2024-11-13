import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  authenticationMethod: 'mobile' | 'email';
}

export class SetNewPasswordSuccess extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('set_new_password_success', payload);
  }

  getPayload() {
    return {
      authentication_method: this.payload.authenticationMethod,
    };
  }
}
