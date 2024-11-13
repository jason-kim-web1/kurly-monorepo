import { PickProduct, PRODUCT_STATUS } from '../../../api';
import type { ShortCutType } from '../../../types';
import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  product: PickProduct;
  index: number;
  type: ShortCutType;
}

export class SelectProductShortcut extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_product_shortcut', payload);
  }

  getPayload() {
    const { product, index, type } = this.payload;
    return {
      position: index + 1,
      is_soldout: product.status === PRODUCT_STATUS.SOLD_OUT,
      origin_price: product.salesPrice,
      price: product.discountedPrice,
      package_id: product.no,
      package_name: product.name,
      selection_type: type,
    };
  }
}
