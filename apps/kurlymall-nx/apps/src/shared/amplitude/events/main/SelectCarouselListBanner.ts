import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  title: string;
  link: string;
  index: number;
  sectionType: string;
  currentPage?: number;
  perPage?: number;
}

export class SelectCarouselListBanner extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_carousel_list_banner', payload);
  }

  getPayload() {
    const { title, link, index, sectionType, currentPage, perPage } = this.payload;

    const position = currentPage && perPage ? (currentPage - 1) * perPage : 0;

    return {
      url: link,
      position: position + index + 1,
      selection_type: sectionType,
      content_title: title || null,
    };
  }
}
