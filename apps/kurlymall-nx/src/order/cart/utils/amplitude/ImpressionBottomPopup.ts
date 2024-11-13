import { amplitudeService } from '../../../../shared/amplitude';
import { AmplitudeEvent } from '../../../../shared/amplitude/AmplitudeEvent';
import { BottomType, FirstProductType, RecommendProductList } from '../../constants/RecommendProductList';

interface Payload {
  total_count: number;
  is_delivery_free: boolean;
  first_product_type?: FirstProductType;
  bottom_type?: BottomType;
}

class ImpressionBottomPopup extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('impression_bottom_popup', payload);
  }
}

export const logEventImpressionBottomPopup = (
  recommendProductList: RecommendProductList | undefined,
  deliveryPrice: number,
) => {
  if (!recommendProductList) {
    return;
  }

  const { productList, firstProductType, bottomType } = recommendProductList;

  amplitudeService.logEvent(
    new ImpressionBottomPopup({
      total_count: productList?.length || 0,
      is_delivery_free: deliveryPrice === 0,
      first_product_type: firstProductType,
      bottom_type: bottomType,
    }),
  );
};
