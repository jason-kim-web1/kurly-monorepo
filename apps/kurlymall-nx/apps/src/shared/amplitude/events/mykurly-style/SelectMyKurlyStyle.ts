import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  selectionType: 'top' | 'side' | 'dropdown';
}

/**
 * 나의 컬리 스타일 선택 (PC만 트래킹)
 * 1) top : 마이컬리탭 - 우측 상단 프로필 설정 버튼 클릭
 * 2) side : 마이컬리탭 - 좌측 리스트에서 클릭
 * 3) dropdown : 홈페이지 상단 고객센터 선택(드롭다운)해서 프로필 화면 진입"
 * @extends AmplitudeEvent
 */
export class SelectMyKurlyStyle extends AmplitudeEvent<Payload | undefined> {
  constructor(payload?: Payload) {
    super('select_my_kurly_style', payload);
  }

  getPayload() {
    return {
      selection_type: this.payload?.selectionType,
    };
  }
}
