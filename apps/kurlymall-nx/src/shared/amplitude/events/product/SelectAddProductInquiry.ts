import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  fusionQueryId: string | null;
}

/**
 * 상품 상세 화면 상품 문의 서브탭에서 '상품 문의하기' 버튼 선택, PC에서는 '문의하기
 * @extends AmplitudeEvent
 */
export class SelectAddProductInquiry extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_add_product_inquiry', payload);
  }

  getPayload() {
    const { fusionQueryId } = this.payload;

    return {
      fusion_query_id: !!fusionQueryId ? fusionQueryId : null, // 검색구분자
    };
  }
}
