import { ProductCollectionGroups } from '../../../../product/list/types';
import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  groupCollectionId: string;
  url: string;
  selectCode: string;
  groups?: ProductCollectionGroups[];
}

export class SelectCollectionBanner extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_collection_banner', payload);
  }

  getPayload() {
    const { groupCollectionId, selectCode, url, groups } = this.payload;
    const collectionCode = groups?.find((it) => it.code === selectCode);

    return {
      group_collection_id: groupCollectionId,
      url: url,
      collection_id: collectionCode?.code || null,
    };
  }
}
