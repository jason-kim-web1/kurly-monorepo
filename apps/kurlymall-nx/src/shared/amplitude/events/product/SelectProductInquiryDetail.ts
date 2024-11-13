import { AmplitudeEvent } from '../../AmplitudeEvent';

import { ProductInquiryPostItem } from '../../../../product/board/inquiry/types';

interface Payload {
  isSecret: boolean;
  item: ProductInquiryPostItem;
  fusionQueryId: string | null;
}

/**
 * 상품 상세 화면 - 상품 문의 서브탭에서 문의 게시글 선택
 * @extends AmplitudeEvent
 */
export class SelectProductInquiryDetail extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_product_inquiry_detail', payload);
  }

  getPayload() {
    const { isSecret, item, fusionQueryId } = this.payload;

    return {
      is_secret: isSecret, // 상품 문의 글의 비밀글 여부
      answer_type: item?.comments?.length > 0 ? 'Complete' : 'Prepare', // 상품 문의 글 답변 여부
      fusion_query_id: !!fusionQueryId ? fusionQueryId : null, // 검색구분자
    };
  }
}
