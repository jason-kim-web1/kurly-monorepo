import { BottomType, FirstProductType, Product, RecommendProductList } from '../../constants/RecommendProductList';
import { AmplitudeEvent } from '../../../../shared/amplitude/AmplitudeEvent';
import { amplitudeService } from '../../../../shared/amplitude';

const referrerEvent = 'impression_bottom_popup';

export const EVENT_NAME = {
  ADD_TO_CART_PRODUCT: 'add_to_cart_product',
  ADD_TO_CART_SUCCESS: 'add_to_cart_success',
};

type eventNameType = typeof EVENT_NAME[keyof typeof EVENT_NAME];

interface Payload extends Product {
  referrerEvent: 'impression_bottom_popup';
  eventName: eventNameType;
  position: number;
  firstProductType?: FirstProductType;
  bottomType?: BottomType;
}

class AddToCartProduct extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super(payload.eventName, payload);
  }

  getPayload() {
    return {
      deal_id: this.payload.dealProductNo,
      price: this.payload.productPrice,
      //바텀시트에서는 담은 상품을 다시 담을 수 없으므로 합계 계산시 수량 1로 고정합니다.
      total_price: this.payload.productPrice * 1,
      position: this.payload.position,
      referrer_event: this.payload.referrerEvent,
      first_product_type: this.payload.firstProductType,
      bottom_type: this.payload.bottomType,
    };
  }
}

export const logEventRecommendProductAddToCart = (
  recommendProductList: RecommendProductList | undefined,
  dealProductNo: number,
  eventName: eventNameType,
) => {
  if (!recommendProductList) {
    return;
  }

  const { productList, firstProductType, bottomType } = recommendProductList;
  const foundProduct = productList?.find((item) => item.dealProductNo === dealProductNo);

  if (!foundProduct || !productList) {
    return;
  }

  amplitudeService.logEvent(
    new AddToCartProduct({
      ...foundProduct,
      position: productList.indexOf(foundProduct) + 1,
      firstProductType,
      bottomType,
      referrerEvent,
      eventName,
    }),
  );
};
