import { AmplitudeEvent } from '../../../../shared/amplitude/AmplitudeEvent';
import { amplitudeService } from '../../../../shared/amplitude';

interface Payload {
  itemPosition: number;
  couponCode: number;
}

class ImpressionSectionItem extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('impression_section_item', payload);
  }

  getPayload() {
    return {
      search_section_id: 'cart_coupon_banner_top',
      coupon_id: this.payload.couponCode,
      item_position: this.payload.itemPosition + 1,
    };
  }
}

export const logEventImpressionSectionItem = ({ couponCode, itemPosition }: Payload) => {
  amplitudeService.logEvent(new ImpressionSectionItem({ couponCode, itemPosition }));
};
