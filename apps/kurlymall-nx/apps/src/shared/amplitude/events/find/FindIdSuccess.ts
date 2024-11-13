import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  authenticationMethod: 'mobile' | 'email';
}

export class FindIdSuccess extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('find_id_success', payload);
  }

  getPayload() {
    return {
      authentication_method: this.payload.authenticationMethod,
    };
  }
}
