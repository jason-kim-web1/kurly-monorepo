import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  selectionType: 'my_kurly_style' | 'signup_success';
  profileType?: string;
}

/**
 * 마이컬리탭 - 나의 컬리 스타일 - 프로필 설정 유입 경로
 * @extends AmplitudeEvent
 */
export class SelectProfile extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_profile', payload);
  }

  getPayload() {
    return {
      selection_type: this.payload.selectionType,
      profile_type: this.payload.profileType,
    };
  }
}
