import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  fusionQueryId: string | null;
}

/**
 * 상품 문의글 삭제 버튼 선택
 * @extends AmplitudeEvent
 */
export class SelectDeleteProductInquiry extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_delete_product_inquiry', payload);
  }

  getPayload() {
    const { fusionQueryId } = this.payload;

    return {
      fusion_query_id: !!fusionQueryId ? fusionQueryId : null, // 검색구분자
    };
  }
}
