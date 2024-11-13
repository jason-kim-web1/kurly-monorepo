import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * PC 메인 페이지 하단의 카카오톡 버튼 선택
 * @extends AmplitudeEvent
 */
export class SelectBottomKakaoButton extends AmplitudeEvent<void> {
  constructor() {
    super('select_bottom_kakao_button');
  }
}
