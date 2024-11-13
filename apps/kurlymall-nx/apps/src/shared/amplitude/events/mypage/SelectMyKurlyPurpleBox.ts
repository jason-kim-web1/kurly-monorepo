import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * 마이컬리 탭에서 '컬리 퍼플 박스' 선택
 * @extends AmplitudeEvent
 */
export class SelectMyKurlyPurpleBox extends AmplitudeEvent<void> {
  constructor() {
    super('select_my_kurly_purple_box');
  }
}
