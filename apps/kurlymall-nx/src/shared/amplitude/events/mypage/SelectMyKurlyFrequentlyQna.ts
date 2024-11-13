import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * 마이컬리탭에서 자주하는 질문 선택
 * (desktop 홈페이지 상단 고객센터 드롭다운 자주하는 질문 선택)
 * @extends AmplitudeEvent
 */
export class SelectMyKurlyFrequentlyQna extends AmplitudeEvent<void> {
  constructor() {
    super('select_my_kurly_frequently_qna');
  }
}
