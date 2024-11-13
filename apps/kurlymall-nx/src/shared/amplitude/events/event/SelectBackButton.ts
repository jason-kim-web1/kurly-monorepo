import { AmplitudeEvent } from '../../AmplitudeEvent';

/*
 * 이벤트 페이지 뒤로가기
 * */

export class SelectBackButton extends AmplitudeEvent<void> {
  constructor() {
    super('select_back_button');
  }

  getPayload() {
    return {
      selection_type: 'back_button',
    };
  }
}
