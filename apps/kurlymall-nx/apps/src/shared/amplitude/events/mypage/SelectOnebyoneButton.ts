import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * 주문내역상세 > 1:1 문의 버튼 클릭 시
 * @extends AmplitudeEvent
 */
export class SelectOnebyoneButton extends AmplitudeEvent<void> {
  constructor() {
    super('select_onebyone_button');
  }
}
