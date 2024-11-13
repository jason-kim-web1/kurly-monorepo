import { AmplitudeEvent } from '../../AmplitudeEvent';

type ImpressionProductPayload = {
  content_id: number;
  content_name: string;
  fusion_query_id: string;
  position: number;
  price: number;
  sales_price: number;
};

class ImpressionProduct extends AmplitudeEvent<ImpressionProductPayload> {
  constructor(payload: ImpressionProductPayload) {
    super('impression_product', payload);
  }

  getPayload() {
    return this.payload;
  }
}

export { ImpressionProduct };
