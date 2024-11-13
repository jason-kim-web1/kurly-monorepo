import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * 마이컬리탭 - 나의 컬리 스타일 - 프로필 수집/이용 및 서비스 정보제공 동의 화면 출력
 * @extends AmplitudeEvent
 */
export class ImpressionProfileInformationArgeement extends AmplitudeEvent<void> {
  constructor() {
    super('impression_profile_information_argeement');
  }
}
