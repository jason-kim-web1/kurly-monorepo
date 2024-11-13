import { AmplitudeEvent } from '../../AmplitudeEvent';

import { FavoriteProductExtend } from '../../../interfaces';

import { getCurrentPrice } from './getCurrentPrice';
import { getPackageId } from './getPackageId';
import { calculateProductPrices } from '../../../../order/cart/utils/calculateProductPrices';

interface Payload {
  productExtend: FavoriteProductExtend;
  index: number;
}

/**
 * 상품 목록에서 상품 클릭 시(상품 상세 페이지로 랜딩)
 * @extends AmplitudeEvent
 */
export class SelectProduct extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_product', payload);
  }

  getPayload() {
    const {
      productExtend: { contentsProductNo, productPrice, retailPrice, discountPrice, isSoldOut },
    } = this.payload;

    const { price, finalDiscountPrice } = calculateProductPrices({
      productPrice,
      retailPrice,
      discountPrice,
    });

    const packageId = getPackageId(contentsProductNo);
    const currentPrice = getCurrentPrice(price, finalDiscountPrice);

    return {
      is_soldout: isSoldOut,
      is_gift_purchase: null,
      is_sorting: null,
      sticker: null,
      default_sort_type: null,
      selection_sort_type: null,
      server_sort_type: null,
      position: this.payload.index + 1,
      sales_price: price,
      price: currentPrice,
      content_id: contentsProductNo,
      content_name: null,
      package_id: packageId,
      package_name: null,
      content_count: null,
      keyword: null,
      collection_id: null,
      delivery_type: null,
    };
  }
}
