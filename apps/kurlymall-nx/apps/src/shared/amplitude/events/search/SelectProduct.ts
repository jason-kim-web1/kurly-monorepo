import { AmplitudeEvent } from '../../AmplitudeEvent';

type SelectProductPayload = {
  content_id: number;
  content_name: string;
  content_type?: string;
  delivery_type: string;
  sales_price: number;
  price: number;
  is_soldout: boolean;
  is_gift_purchase: boolean;
  position: number;
  package_id?: string;
  package_name?: string;
  sticker?: string;
  default_sort_type: string;
  selection_sort_type: string;
  server_sort_type: string;
  content_count: number;
  review_count?: string | number;
  fusion_query_id?: string;
  keyword: string;
  is_sorting: boolean;
};

class SelectProduct extends AmplitudeEvent<SelectProductPayload> {
  constructor(payload: SelectProductPayload) {
    super('select_product', payload);
  }

  getPayload() {
    return this.payload;
  }
}

export { SelectProduct };
export type { SelectProductPayload };
