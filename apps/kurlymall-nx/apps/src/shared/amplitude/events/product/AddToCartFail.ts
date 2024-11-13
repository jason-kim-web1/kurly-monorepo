import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  fusionQueryId: string | null;
}

/**
 * 장바구니 담기 실패 전송
 * @extends AmplitudeEvent
 */
export class AddToCartFail extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('add_to_cart_fail', payload);
  }

  getPayload() {
    const { fusionQueryId } = this.payload;

    return {
      fusion_query_id: !!fusionQueryId ? fusionQueryId : null, // 검색구분자
    };
  }
}
