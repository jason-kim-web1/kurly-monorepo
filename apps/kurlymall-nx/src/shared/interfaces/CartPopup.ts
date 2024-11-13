import { LegacyPromotion } from '../enums/LegacyPromotion.enum';

type Nullable<T> = T | null;

export interface CartPopup {
  no: number;
  name: string;
  is_sold_out: boolean;
  min_ea: number;
  max_ea: Nullable<number>;
  original_image_url: string;
  is_purchase_status: boolean;
  is_giftable: boolean;
  is_only_adult: boolean;
  is_group_product: boolean;
  legacy_promotion: Nullable<LegacyPromotion>;
  deal_products: DealProduct[];
}

interface DealProduct {
  no: number;
  name: string;
  is_expected_point: boolean;
  expected_point: number;
  expected_point_ratio: number;
  base_price: number;
  retail_price: Nullable<number>;
  discounted_price: Nullable<number>;
  discount_rate: number;
  buy_unit: number;
  is_sold_out: boolean;
  min_ea: number;
  max_ea: number;
  can_restock_notify: boolean;
  is_purchase_status: boolean;
  is_giftable: boolean;
  is_only_adult: boolean;
  master_product_code: string;
  master_product_name: string;
  can_purchase_level: boolean;
  membership_labels: {
    text: string;
    textColor: string;
    backgroundColor: string;
    borderColor: string;
  }[];
  point_banner: {
    is_show: boolean;
    text: string;
    contents: {
      id: string;
      body: string;
      color: string;
      font: string;
      size: number;
      type: string;
    }[];
  };
  is_free_delivery: boolean;
  category_ids?: number[];
}
