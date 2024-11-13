import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * 마이컬리탭에서 ‘전체등급 보기’ 선택
 * @extends AmplitudeEvent
 */
export class SelectMyKurlyMembershipGuide extends AmplitudeEvent<void> {
  constructor() {
    super('select_my_kurly_membership_guide');
  }
}
