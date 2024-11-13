import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * 마이컬리탭에서 '다음 달 예상등급 보기' 선택
 * @extends AmplitudeEvent
 */
export class SelectMyKurlyMembershipBenefit extends AmplitudeEvent<void> {
  constructor() {
    super('select_my_kurly_membership_benefit');
  }
}
