import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * PC 고객센터 좌측 메뉴 - 대량주문 문의 선택
 * @extends AmplitudeEvent
 */
export class SelectServiceBulkOrder extends AmplitudeEvent<void> {
  constructor() {
    super('select_service_bulk_order');
  }
}
