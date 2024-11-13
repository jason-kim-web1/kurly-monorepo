import { AmplitudeEvent } from '../../AmplitudeEvent';

import { FavoriteProductExtend } from '../../../interfaces';

import { getPackageId } from './getPackageId';
import { getCurrentPrice } from './getCurrentPrice';
import { calculateProductPrices } from '../../../../order/cart/utils/calculateProductPrices';

interface Payload {
  productExtend: FavoriteProductExtend;
}

/**
 * 장바구니 담기 전송 성공
 * (add_to_cart_product 이벤트 전달 후 전송)
 * @extends AmplitudeEvent
 */
export class AddToCartSuccess extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('add_to_cart_success', payload);
  }

  getPayload() {
    const {
      productExtend: { contentsProductNo, productPrice, retailPrice, discountPrice, isCartAdd },
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
      content_type: null,
      default_content_id: null,
      delivery_type: null,
      seller: null,
      sku_count: null,
      package_id: packageId,
      package_name: null,
      total_retail_price: retailPrice ? retailPrice : null,
      total_base_price: productPrice,
      total_price: currentPrice,
      collection_id: null,
      referrer_event: 'select_product_shortcut',
    };
  }
}
