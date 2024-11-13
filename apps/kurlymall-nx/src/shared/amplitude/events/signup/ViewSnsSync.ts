import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  joinPath: 'kurly' | 'kakao';
}

export class ViewSnsSync extends AmplitudeEvent<Payload> {
  constructor() {
    super('view_sns_sync', { joinPath: 'kakao' });
  }

  getPayload() {
    return {
      join_path: this.payload.joinPath,
    };
  }
}
