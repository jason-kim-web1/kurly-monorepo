import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  url: string;
  title: string;
  bannerId: number;
}

/**
 * 쿠폰함 내 배너 노출 시
 * @extends AmplitudeEvent
 */
export class ImpressionCouponListBanner extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('impression_coupon_list_banner', payload);
  }

  getPayload() {
    const { url, title, bannerId } = this.payload;

    return {
      url,
      title,
      banner_id: bannerId,
    };
  }
}
