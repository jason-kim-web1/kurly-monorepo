import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  browseEventName?: string;
  sortType: 'RECOMMEND' | 'RECENTLY';
  searchCount?: number;
  searchKeyword?: string;
}

export class SelectSortType extends AmplitudeEvent<Payload> {
  browserEventName?: string;

  constructor(payload: Payload) {
    super('select_sort_type', payload);

    this.browserEventName = payload.browseEventName;
  }

  getPayload() {
    return {
      selection_sort_type: this.payload.sortType === 'RECOMMEND' ? 'review_default' : 'review_recent',
      content_count: this.browserEventName === 'select_search' ? this.payload?.searchCount : null,
      keyword: this.browserEventName === 'select_search' ? this.payload?.searchKeyword : null,
    };
  }
}
