import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  url: string;
  primaryCategoryId?: string | null;
  secondaryCategoryId?: number | null;
  contentId?: string | null;
  dealName?: string | null;
}

export class SelectCouponRemoteButton extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_coupon_remote_button', payload);
  }

  getPayload() {
    return {
      url: this.payload.url,
      primary_category_id: this.payload.primaryCategoryId,
      secondary_category_id: this.payload.secondaryCategoryId,
      content_id: this.payload.contentId,
      deal_name: this.payload.dealName,
    };
  }
}
