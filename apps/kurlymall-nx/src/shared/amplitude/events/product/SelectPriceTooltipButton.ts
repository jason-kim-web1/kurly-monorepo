import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  fusionQueryId: string | null;
}

/**
 * 상품 상세 화면에서 '가격 안내' 버튼 클릭
 * @extends AmplitudeEvent
 */
export class SelectPriceTooltipButton extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_price_tooltip_button', payload);
  }

  getPayload() {
    const { fusionQueryId } = this.payload;

    return {
      fusion_query_id: !!fusionQueryId ? fusionQueryId : null, // 검색구분자
    };
  }
}
