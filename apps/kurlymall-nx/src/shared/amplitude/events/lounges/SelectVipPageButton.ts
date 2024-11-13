import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  url: string;
  pageName: string;
  selectionType: 'subtab' | 'collection' | 'benefit' | 'benefit_confirm' | 'event_page';
  message: string;
  collectionId?: string;
}

export class SelectVipPageButton extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_vip_page_button', payload);
  }

  getPayload() {
    return {
      url: this.payload.url,
      page_name: this.payload.pageName.toLowerCase(),
      selection_type: this.payload.selectionType,
      message: this.payload.message,
      collection_id: this.payload.collectionId,
    };
  }
}
