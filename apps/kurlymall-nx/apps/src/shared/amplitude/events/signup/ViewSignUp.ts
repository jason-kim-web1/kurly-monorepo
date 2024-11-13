import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  joinPath: 'kurly' | 'kakao';
}

export class ViewSignUp extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('view_sign_up', payload);
  }

  getPayload() {
    return {
      join_path: this.payload.joinPath,
    };
  }
}
