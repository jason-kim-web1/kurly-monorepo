import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * 마이컬리탭에서 1:1 문의 선택
 * (desktop 홈페이지 상단 고객센터 드롭다운 1:1 문의 선택)
 * @extends AmplitudeEvent
 */
export class SelectMyKurlyPersonalInquiryHistory extends AmplitudeEvent<void> {
  constructor() {
    super('select_my_kurly_personal_inquiry_history');
  }
}
