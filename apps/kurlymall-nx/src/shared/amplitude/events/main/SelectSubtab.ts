import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  type: string;
  id: string;
  position: number;
  name: string;
  selectionType: 'click' | 'swipe';
}

export class SelectSubtab extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_subtab', payload);
  }

  getPayload() {
    return {
      type: this.getCollectionType(),
      id: this.payload.id,
      position: this.payload.position + 1,
      name: this.payload.name,
      selection_type: this.payload.selectionType,
    };
  }

  private getCollectionType() {
    return this.payload.type === 'collection_group' ? 'collection' : this.payload.type;
  }
}
