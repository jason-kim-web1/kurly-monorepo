import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  isFirstSubmitted: boolean;
  fusionQueryId: string | null;
}

/**
 * 상품 문의글 제출 성공
 * @extends AmplitudeEvent
 */
export class SubmitProductInquirySuccess extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('submit_product_inquiry_success', payload);
  }

  getPayload() {
    const { isFirstSubmitted, fusionQueryId } = this.payload;

    return {
      is_first_submit: isFirstSubmitted, // 해당 상품 문의글 첫 등록 여부
      fusion_query_id: !!fusionQueryId ? fusionQueryId : null, // 검색구분자
    };
  }
}
