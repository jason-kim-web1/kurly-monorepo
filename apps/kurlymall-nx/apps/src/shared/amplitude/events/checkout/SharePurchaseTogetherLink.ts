import { JOIN_ORDER_TYPE, JoinOrderType } from '../../../interfaces';
import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  // 발생위치값
  selectionType: string;
  // 함께구매 유형
  orderType: JoinOrderType;
  // 함께구매 참여코드
  joinOrderCode: string;
}

export class SharePurchaseTogetherLink extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('share_purchase_together_link', payload);
  }

  purchaseTogetherType() {
    return this.payload.orderType === JOIN_ORDER_TYPE.CREATED ? '생성' : '참여';
  }

  getPayload() {
    return {
      selection_type: this.payload.selectionType,
      purchase_together_type: this.purchaseTogetherType(),
      purchase_together_code: this.payload.joinOrderCode,
    };
  }
}
