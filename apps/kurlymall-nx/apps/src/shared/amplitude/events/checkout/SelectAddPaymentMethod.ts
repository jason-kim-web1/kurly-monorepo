import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  /**
   * 선택된 유형
   * - addpayment: 결제수단추가
   * - plcc: PLCC카드 신청
   */
  selectionType: 'addpayment' | 'plcc';
}

/**
 * 주문서의 결제수단 영역에서 '결제수단 추가' 또는 'PLCC카드 신청하기' 클릭 시
 *
 * 이미 등록된 카드, 계좌 클릭 시에는 이벤트 발생하지 않음
 * @extends AmplitudeEvent
 */
export class SelectAddPaymentMethod extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_add_payment_method', payload);
  }

  getPayload() {
    return {
      selection_type: this.payload.selectionType,
    };
  }
}
