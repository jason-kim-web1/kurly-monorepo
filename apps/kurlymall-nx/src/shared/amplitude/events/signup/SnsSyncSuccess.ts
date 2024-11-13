import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  joinPath: 'kurly' | 'kakao';
}

export class SnsSyncSuccess extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('sns_sync_success', payload);
  }

  getPayload() {
    return {
      join_path: this.payload.joinPath,
    };
  }
}
