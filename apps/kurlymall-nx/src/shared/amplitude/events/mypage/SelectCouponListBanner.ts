import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  url: string;
  title: string;
  bannerId: number;
}

/**
 * 쿠폰함 내 배너 클릭 시
 * @extends AmplitudeEvent
 */
export class SelectCouponListBanner extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_coupon_list_banner', payload);
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
