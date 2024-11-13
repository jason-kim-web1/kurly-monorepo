import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * PC 홈페이지 상단 고객센터 드롭다운 공지사항 선텍
 * @extends AmplitudeEvent
 */
export class SelectMyKurlyNoticeList extends AmplitudeEvent<void> {
  constructor() {
    super('select_my_kurly_notice_list');
  }
}
