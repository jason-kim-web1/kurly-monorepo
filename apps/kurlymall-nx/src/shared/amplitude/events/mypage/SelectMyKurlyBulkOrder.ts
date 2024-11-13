import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * 마이컬리탭에서 대량주문 문의 선택
 * (desktop 홈페이지 상단 고객센터 드롭다운 대량주문 문의 선택)
 * @extends AmplitudeEvent
 */
export class SelectMyKurlyBulkOrder extends AmplitudeEvent<void> {
  constructor() {
    super('select_my_kurly_bulk_order');
  }
}
