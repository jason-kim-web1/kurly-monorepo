import { AmplitudeEvent } from '../AmplitudeEvent';

type SearchNoResultEventPayload = {
  fusion_query_id: string;
  keyword: string;
};

export class SearchNoResult extends AmplitudeEvent<SearchNoResultEventPayload> {
  constructor(payload: SearchNoResultEventPayload) {
    super('search_no_result', payload);
  }

  getPayload() {
    const { fusion_query_id, keyword } = this.payload;
    return {
      fusion_query_id,
      keyword,
    };
  }
}
