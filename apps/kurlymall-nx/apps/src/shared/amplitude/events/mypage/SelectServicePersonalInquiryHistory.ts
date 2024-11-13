import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * PC 고객센터 좌측 메뉴 - 1:1문의 선택
 * @extends AmplitudeEvent
 */
export class SelectServicePersonalInquiryHistory extends AmplitudeEvent<void> {
  constructor() {
    super('select_service_personal_inquiry_history');
  }
}
