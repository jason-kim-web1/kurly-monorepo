import { AmplitudeEvent } from '../AmplitudeEvent';

/**
 * '주문내역상세' 화면 조회 시
 * @extends AmplitudeEvent
 */
export class ViewOrderSheetDetail extends AmplitudeEvent<void> {
  constructor() {
    super('view_order_sheet_detail');
  }
}
