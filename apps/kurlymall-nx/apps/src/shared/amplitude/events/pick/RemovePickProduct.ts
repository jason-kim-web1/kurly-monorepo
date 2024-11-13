import { PickProduct, PRODUCT_STATUS } from '../../../api';
import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  product: PickProduct;
}

export class RemovePickProduct extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('remove_pick_product', payload);
  }

  getPayload() {
    const { product } = this.payload;
    return {
      is_soldout: product.status === PRODUCT_STATUS.SOLD_OUT,
      origin_price: product.salesPrice,
      price: product.discountedPrice,
      package_id: product.no,
      package_name: product.name,
    };
  }
}
