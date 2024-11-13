import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  // 링크 유형
  linkType: string;
  // 함께구매 참여코드
  purchaseTogetherCode?: string;
}

/**
 * 상품상세 > 함께구매 상품 진입시
 * @extends AmplitudeEvent
 */
export class SelectPurchaseTogetherLink extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_purchase_together_link', payload);
  }

  getPayload() {
    const { linkType, purchaseTogetherCode } = this.payload;
    return {
      link_type: linkType,
      purchase_together_code: purchaseTogetherCode || '',
    };
  }
}
