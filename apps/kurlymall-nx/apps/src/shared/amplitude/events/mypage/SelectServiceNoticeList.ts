import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * PC 고객센터 좌측 메뉴 - 공지사항 선택
 * @extends AmplitudeEvent
 */
export class SelectServiceNoticeList extends AmplitudeEvent<void> {
  constructor() {
    super('select_service_notice_list');
  }
}
