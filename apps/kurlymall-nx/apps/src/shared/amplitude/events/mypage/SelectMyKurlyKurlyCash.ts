import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * 마이컬리탭에서 '컬리캐시' 선택
 * @extends AmplitudeEvent
 */
export class SelectMyKurlyKurlyCash extends AmplitudeEvent<void> {
  constructor() {
    super('select_my_kurly_kurly_cash');
  }
}
