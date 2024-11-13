import { AmplitudeEvent } from '../../AmplitudeEvent';

/*
 * 이벤트 페이지 조회
 * Payload:
 *  url: 조회된 페이지 URL,
 * */

interface Payload {
  url: string;
}

export class ViewEventDetail extends AmplitudeEvent<Payload> {
  url?: string;

  constructor(payload: Payload) {
    super('view_event_detail', payload);
    this.url = payload.url;
  }

  getPayload() {
    return {
      url: this.url,
    };
  }
}
