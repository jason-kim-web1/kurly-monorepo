import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  selectionType: 'dropdown' | 'mypage' | 'top';
}

/**
 * 마이컬리탭에서 '적립금 · 컬리캐시' 선택 -> 모웹의 경우 적립금 선택 시
 * selection_type - PC에서만 트래킹 dropdown(상단 드롭다운 통한 선택), mypage(마이컬리 좌측 메뉴를 통한 선택), top(마이컬리 상단 적립금 선택)
 * @extends AmplitudeEvent
 */
export class SelectMyKurlyPointHistory extends AmplitudeEvent<Payload | undefined> {
  constructor(payload?: Payload) {
    super('select_my_kurly_point_history', payload);
  }

  getPayload() {
    return {
      selection_type: this.payload?.selectionType,
    };
  }
}
