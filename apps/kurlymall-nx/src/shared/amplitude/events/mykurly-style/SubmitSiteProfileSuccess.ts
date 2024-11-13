import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  profileType?: string;
}

/**
 * 나의 컬리스타일의 프로필 저장 버튼을 클리 시
 * @extends AmplitudeEvent
 */
export class SubmitSiteProfileSuccess extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('submit_site_profile_success', payload);
  }

  getPayload() {
    return {
      profile_type: this.payload.profileType,
    };
  }
}
