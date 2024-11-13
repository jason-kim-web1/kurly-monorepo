import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  joinPath: 'kurly' | 'kakao';
}

export class SelectJoinButton extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_join_button', payload);
  }

  getPayload() {
    return {
      join_path: this.payload.joinPath,
    };
  }
}
