import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  // 링크 유형
  linkType: string;
  // 함께구매 참여코드
  purchaseTogetherCode?: string;
  // 팝업 선택값
  selectionType: string;
}

/**
 * 상품상세 > 함께구매 상품 진입시 > 앱 전용 상품 안내 팝업 선택
 * @extends AmplitudeEvent
 */
export class SelectPurchaseTogetherLinkPopUp extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_purchase_together_link_popup', payload);
  }

  getPayload() {
    const { linkType, purchaseTogetherCode, selectionType } = this.payload;
    return {
      link_type: linkType,
      purchase_together_code: purchaseTogetherCode || '',
      selection_type: selectionType,
    };
  }
}
