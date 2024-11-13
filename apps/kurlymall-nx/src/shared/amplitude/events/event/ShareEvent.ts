import { AmplitudeEvent } from '../../AmplitudeEvent';

/*
 * 이벤트 공유하기
 * Payload:
 *  url: 다음 랜딩될 URL,
 *  channel: 공유 채널(link, kakao, text),
 * */

interface Payload {
  url: string;
  channel: string;
}

export class ShareEvent extends AmplitudeEvent<Payload> {
  url?: string;

  channel?: string;

  constructor(payload: Payload) {
    super('share_event', payload);
    this.url = payload.url;
    this.channel = payload.channel;
  }

  getPayload() {
    return {
      url: this.url,
      channel: this.channel,
    };
  }
}
