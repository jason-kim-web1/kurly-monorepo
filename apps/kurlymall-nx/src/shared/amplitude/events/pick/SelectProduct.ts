import { PickProduct, PRODUCT_STATUS } from '../../../api';
import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  product: PickProduct;
  index: number;
}

export class SelectProduct extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_product', payload);
  }

  getPayload() {
    const { product } = this.payload;
    return {
      position: this.payload.index + 1,
      is_soldout: product.status === PRODUCT_STATUS.SOLD_OUT,
      origin_price: product.salesPrice,
      price: product.discountedPrice,
      package_id: product.no,
      package_name: product.name,
    };
  }
}
