import { AmplitudeEvent } from '../AmplitudeEvent';

interface Payload {
  isBeautyOnlyChecked: boolean;
  fusionQueryId: string;
}

export class SelectBeautyOnly extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_beauty_only', payload);
  }

  getPayload() {
    const { isBeautyOnlyChecked, fusionQueryId } = this.payload;

    return {
      status: isBeautyOnlyChecked ? 'on' : 'off',
      fusion_query_id: fusionQueryId,
    };
  }
}
