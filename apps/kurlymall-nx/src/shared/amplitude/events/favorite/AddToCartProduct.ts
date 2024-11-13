import { AmplitudeEvent } from '../../AmplitudeEvent';

import { FavoriteProductExtend } from '../../../interfaces';

import { getPackageId } from './getPackageId';
import { getCurrentPrice } from './getCurrentPrice';
import { calculateProductPrices } from '../../../../order/cart/utils/calculateProductPrices';

interface Payload {
  productExtend: FavoriteProductExtend;
}

/**
 * 장바구니 담기 성공 API 성공 후 전송, 옵션 상품 단위로 이벤트 발생
 * (자주사는 상품은 늘 단일옵션)
 * @extends AmplitudeEvent
 */
export class AddToCartProduct extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('add_to_cart_product', payload);
  }

  getPayload() {
    const {
      productExtend: {
        contentsProductNo,
        dealProductNo,
        dealProductName,
        masterProductNo,
        productPrice,
        retailPrice,
        discountPrice,
        isCartAdd,
      },
    } = this.payload;

    const { price, finalDiscountPrice } = calculateProductPrices({
      productPrice,
      retailPrice,
      discountPrice,
    });

    const packageId = getPackageId(contentsProductNo);
    const currentPrice = getCurrentPrice(price, finalDiscountPrice);

    return {
      is_direct_purchase: !isCartAdd,
      is_gift_purchase: null,
      content_id: contentsProductNo,
      content_name: null,
      deal_id: dealProductNo,
      deal_name: dealProductName,
      master_id: masterProductNo,
      master_name: null,
      content_type: null,
      default_content_id: null,
      delivery_type: null,
      package_id: packageId,
      package_name: null,
      retail_price: retailPrice ? retailPrice : null,
      base_price: productPrice,
      price: currentPrice,
      total_retail_price: retailPrice ? retailPrice : null,
      total_base_price: productPrice,
      total_price: currentPrice,
      quantity: 1,
      seller: null,
      collection_id: null,
      referrer_event: 'select_product_shortcut',
    };
  }
}
