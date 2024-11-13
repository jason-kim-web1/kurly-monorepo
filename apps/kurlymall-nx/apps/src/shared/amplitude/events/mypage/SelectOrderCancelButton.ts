import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * '주문내역상세' 화면에서 '전체 상품 주문 취소' 버튼 클릭 시
 * @extends AmplitudeEvent
 */
export class SelcetOrderCancelButton extends AmplitudeEvent<void> {
  constructor() {
    super('select_order_cancel_button');
  }
}
