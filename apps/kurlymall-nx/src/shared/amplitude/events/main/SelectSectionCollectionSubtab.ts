import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  collectionId: string;
  sectionId: number;
  title?: string;
}

export class SelectSectionCollectionSubtab extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_section_collection_subtab', payload);
  }

  getPayload() {
    const { collectionId, sectionId, title } = this.payload;

    return {
      collection_id: collectionId,
      section_id: sectionId,
      selection_type: 'click',
      title: title || null,
    };
  }
}
