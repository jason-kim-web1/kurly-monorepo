import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  groupCode: string;
}

export class SelectCollectionMenu extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_collection_subtab', payload);
  }

  getPayload() {
    const { groupCode } = this.payload;
    return {
      collection_id: groupCode,
    };
  }
}
