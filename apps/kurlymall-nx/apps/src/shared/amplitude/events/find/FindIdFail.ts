import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  authenticationMethod: 'mobile' | 'email';
}

export class FindIdFail extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('find_id_fail', payload);
  }

  getPayload() {
    return {
      authentication_method: this.payload.authenticationMethod,
    };
  }
}
