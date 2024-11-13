import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * 마이컬리탭 - 나의 컬리 스타일에서 완료 시
 * @extends AmplitudeEvent
 */
export class SubmitProfileSuccess extends AmplitudeEvent<void> {
  constructor() {
    super('submit_profile_success');
  }
}
