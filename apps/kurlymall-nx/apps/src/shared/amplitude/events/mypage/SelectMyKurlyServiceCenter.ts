import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * PC, 홈페이지 상단 고객센터 선택(드롭다운)
 * moweb 같은 경우에는 마이컬리탭에서 고객 센터 선택
 * @extends AmplitudeEvent
 */
export class SelectMyKurlyServiceCenter extends AmplitudeEvent<void> {
  constructor() {
    super('select_my_kurly_service_center');
  }
}
