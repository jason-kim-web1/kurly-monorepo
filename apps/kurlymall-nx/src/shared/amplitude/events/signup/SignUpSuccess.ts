import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  joinPath: 'kurly' | 'kakao';
}

export class SignUpSuccess extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('sign_up_success', payload);
  }

  getPayload() {
    return {
      join_path: this.payload.joinPath,
    };
  }
}
