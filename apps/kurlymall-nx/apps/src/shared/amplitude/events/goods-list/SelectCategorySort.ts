import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  section: string;
  value: {
    type: string;
    name: string;
  };
  totalProductsCount?: number;
  paramCode?: string;
  queryId?: string;
}

export class SelectCategorySort extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_sort_type', payload);
  }

  getPayload() {
    const { section, value, paramCode: keyword, totalProductsCount, queryId } = this.payload;
    const { name: selectionSortType } = value;

    if (section === 'search') {
      return {
        keyword,
        selection_sort_type: selectionSortType,
        content_count: totalProductsCount,
        fusion_query_id: queryId,
      };
    }

    return {
      selection_sort_type: selectionSortType,
    };
  }
}
