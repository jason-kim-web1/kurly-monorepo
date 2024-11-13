import { amplitudeService } from '../../../../shared/amplitude';
import { AmplitudeEvent } from '../../../../shared/amplitude/AmplitudeEvent';
import { BottomType, FirstProductType, RecommendProductList } from '../../constants/RecommendProductList';

interface Payload {
  is_delivery_free: boolean;
  bottom_type?: BottomType;
  first_product_type?: FirstProductType;
}

class CloseBottomPopup extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('close_bottom_popup', payload);
  }
}

export const logEventCloseBottomPopup = (
  recommendProductList: RecommendProductList | undefined,
  deliveryPrice: number,
) => {
  if (!recommendProductList) {
    return;
  }

  amplitudeService.logEvent(
    new CloseBottomPopup({
      is_delivery_free: deliveryPrice === 0,
      bottom_type: recommendProductList.bottomType,
      first_product_type: recommendProductList.firstProductType,
    }),
  );
};
