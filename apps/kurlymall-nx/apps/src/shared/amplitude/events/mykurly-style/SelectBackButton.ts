import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  selectionType: 'back_button' | 'X' | 'previous_button' | 'cancel';
  profileType?: string;
}

/**
 * 뷰티 프로필에서 뒤로가기, 닫기, 이전버튼 클릭 시,
 * @extends AmplitudeEvent
 */
export class SelectBackButton extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_back_button', payload);
  }

  getPayload() {
    return {
      selection_type: this.payload.selectionType,
      profile_type: this.payload.profileType,
    };
  }
}
