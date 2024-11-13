import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * PC 메인 페이지 하단의 1:1문의 버튼 선택
 * @extends AmplitudeEvent
 */
export class SelectBottomOnebyoneButton extends AmplitudeEvent<void> {
  constructor() {
    super('select_bottom_onebyone_button');
  }
}
