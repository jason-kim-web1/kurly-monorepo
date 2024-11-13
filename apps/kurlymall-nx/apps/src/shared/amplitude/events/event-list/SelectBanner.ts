import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  eventName: string;
  url: string | null;
  contentId: string | null;
  position: number;
}

export class SelectBanner extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super(payload.eventName, payload);
  }

  getPayload() {
    const { url, contentId, position } = this.payload;
    return {
      url,
      content_id: contentId,
      position,
    };
  }
}
