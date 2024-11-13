import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  // 폴딩 버튼 구분값
  section: string;
  referrerEvent?: string | null;
}

/**
 * 주문서 화면 내 폴딩 버튼 (expand/collapse button) 클릭
 * @extends AmplitudeEvent
 */
export class SelectExpandButton extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_expand_button', payload);
  }

  getPayload() {
    return {
      section: this.payload.section,
      referrer_event: this.payload.referrerEvent,
    };
  }
}
