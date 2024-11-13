import { AmplitudeEvent } from '../../AmplitudeEvent';

type SelectProductShortcutPayload = {
  content_id: number;
  content_name: string;
  content_type?: null; // 콘텐츠의 유형에 대한 정보 : 해당 정보값 api 에 없음
  delivery_type?: string;
  sales_price: number;
  price: number;
  is_soldout: boolean;
  is_gift_purchase: boolean;
  position: number;
  package_id: number | null;
  package_name: string | null;
  sticker?: string;
  review_count: string;
  fusion_query_id: string;
  selection_type?: string;
  keyword: string;
  content_count: number;

  is_sorting: boolean;
  default_sort_type: string;
  selection_sort_type: string;
  server_sort_type: string;
};

class SelectProductShortcut extends AmplitudeEvent<SelectProductShortcutPayload> {
  constructor(payload: SelectProductShortcutPayload) {
    super('select_product_shortcut', payload);
  }

  getPayload() {
    return this.payload;
  }
}

export { SelectProductShortcut };
export type { SelectProductShortcutPayload };
