import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  fusionQueryId: string | null;
}

/**
 * 상품 상세 화면에서 '후기 서브탭' 클릭
 * @extends AmplitudeEvent
 */
export class SelectProductDetailReviewSubtab extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_product_detail_review_subtab', payload);
  }

  getPayload() {
    const { fusionQueryId } = this.payload;

    return {
      fusion_query_id: !!fusionQueryId ? fusionQueryId : null, // 검색구분자
    };
  }
}
