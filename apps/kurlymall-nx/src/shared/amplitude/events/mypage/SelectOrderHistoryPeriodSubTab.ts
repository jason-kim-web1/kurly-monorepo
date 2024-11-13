import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  selectionValue: string;
}

/**
 * 주문내역 화면에서 기간 필터 선택 시
 * selection_value - 선택한 기간 필터 값
 * @extends AmplitudeEvent
 */
export class SelectOrderHistoryPeriodSubTab extends AmplitudeEvent<Payload | undefined> {
  constructor(payload?: Payload) {
    super('select_order_history_period_subtab', payload);
  }

  getPayload() {
    return {
      selection_value: this.payload?.selectionValue,
    };
  }
}
