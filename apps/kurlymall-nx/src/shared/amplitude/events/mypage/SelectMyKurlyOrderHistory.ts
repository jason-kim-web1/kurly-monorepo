import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * 마이컬리탭에서 '주문내역' 선택
 * @extends AmplitudeEvent
 */
export class SelectMyKurlyOrderHistory extends AmplitudeEvent<void> {
  constructor() {
    super('select_my_kurly_order_history');
  }
}
