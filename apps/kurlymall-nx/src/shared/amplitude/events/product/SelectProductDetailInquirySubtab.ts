import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  fusionQueryId: string | null;
}

/**
 * 상품 상세 화면에서 '문의 서브탭' 클릭
 * @extends AmplitudeEvent
 */
export class SelectProductDetailInquirySubtab extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_product_detail_inquiry_subtab', payload);
  }

  getPayload() {
    const { fusionQueryId } = this.payload;

    return {
      fusion_query_id: !!fusionQueryId ? fusionQueryId : null, // 검색구분자
    };
  }
}
