import { AmplitudeEvent } from '../AmplitudeEvent';

/**
 * 상단띠배너 - 로그인전
 * @extends AmplitudeEvent
 */
export class SelectJoinTopBanner extends AmplitudeEvent<void> {
  constructor() {
    super('select_join_top_button');
  }

  getPayload() {
    return {
      selection_type: 'top_banner',
    };
  }
}
