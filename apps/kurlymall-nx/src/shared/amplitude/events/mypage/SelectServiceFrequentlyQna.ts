import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * PC 고객센터 좌측 메뉴 - 자주하는 질문 선택
 * @extends AmplitudeEvent
 */
export class SelectServiceFrequentlyQna extends AmplitudeEvent<void> {
  constructor() {
    super('select_service_frequently_qna');
  }
}
