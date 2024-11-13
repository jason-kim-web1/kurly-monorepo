import axios from 'axios';
import { isEmpty } from 'lodash';

import type {
  DirectOrderType,
  GroupKeyType,
  LegacyPromotionType,
  PlccBenefit,
  PartnersContentBlockType,
  PartnersContentModuleType,
  ProductDetailExceptionLabel,
  ProductSiteType,
  MembershipPurchasePopupType,
} from '../../../product/detail/types';
import httpClient from '../../configs/http-client';
import { API_URL, INTERNAL_API_URL } from '../../configs/config';
import { LockedUserError, LockedUserErrorCode } from '../../errors/LockedUserError';
import type { DeliveryInfoName, DeliveryInfoType, SnakeCaseStickerList } from '../../../product/types';

interface PointBannerResponse {
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
}

export interface DealProductResponse {
  no: number;
  name: string;
  is_expected_point: boolean;
  expected_point: number;
  expected_point_ratio: number;
  base_price: number;
  retail_price: number | null;
  discounted_price: number | null;
  discount_rate: number;
  buy_unit: number;
  is_sold_out: boolean;
  min_ea: number;
  max_ea: number | null;
  can_restock_notify: boolean;
  is_purchase_status: boolean;
  is_giftable: boolean;
  is_only_adult: boolean;
  master_product_code: string;
  master_product_name: string;
  can_purchase_level: boolean;
  can_purchase_level_text: {
    title: string;
    text: string;
    type: MembershipPurchasePopupType;
  };
  membership_labels: {
    text: string;
    textColor: string;
    backgroundColor: string;
    borderColor: string;
  }[];
  point_banner: PointBannerResponse;
  is_free_delivery: boolean;
  category_ids?: number[];
}

interface GroupMemberSubOptionResponse {
  description: string | null;
  image_url?: string;
  contents_product_no?: number;
  is_sold_out?: boolean;
  is_purchase_status?: boolean;
  prices?: {
    base_price: number;
    retail_price: number | null;
    discounted_price: number | null;
    discount_rate: number;
  };
  sub_options?: GroupMemberSubOptionResponse[];
}

export interface PartnersContentModuleData {
  module_type: PartnersContentModuleType;
  data: {
    pc_image?: string;
    mobile_image?: string;
  }[];
}

export interface ProductDetailContentData {
  block_type: PartnersContentBlockType;
  modules: PartnersContentModuleData[];
}

export interface ProductDetailGiveawayContentsBoxData {
  banner_image: {
    image_url: string;
    product_contents_box_banner_url: string;
    text: string;
  };
  contents?: string;
  main_image: {
    image_url: string;
    product_contents_box_main_url: string;
    text?: string;
  };
  term: string;
  attention: string;
}

interface ProductInfoDictionaryItemData {
  title: string;
  description: string;
}

export interface ProductDetailData {
  no: number;
  name: string;
  short_description: string;
  is_sold_out: boolean;
  sold_out_text: string;
  not_sales_text: string;
  extra_infos: {
    title: string;
    description: string;
  }[];
  delivery_time_type_text: string;
  is_reservable: boolean;
  reservation_possible_dates: string[] | null;
  showable_prices: {
    sales_price: number;
    base_price: number | null;
    retail_price: number | null;
  };
  showable_prices_tooltip: ('retail_price' | 'base_price' | 'discounted_price')[];
  retail_price: number | null;
  base_price: number;
  discounted_price: number | null;
  discount_rate: number;
  min_ea: number;
  max_ea: number | null;
  can_restock_notify: boolean;
  main_image_url: string;
  share_image_url: string;
  original_image_url: string;
  is_purchase_status: boolean;
  is_giftable: boolean;
  is_only_adult: boolean;
  is_group_product: boolean;
  group_products: {
    group_keys:
      | {
          title: string;
          description_type: GroupKeyType;
        }[]
      | [];
    group_members:
      | {
          description: string;
          sub_options: GroupMemberSubOptionResponse[];
        }[]
      | [];
  };
  product_notice: {
    deal_product_no: number;
    deal_product_name: string;
    notices: {
      title: string;
      description: string;
    }[];
  }[];
  storage_type: ('AMBIENT_TEMPERATURE' | 'ROOM_TEMPERATURE' | 'COLD' | 'FROZEN' | 'ETC')[];
  legacy_promotion: LegacyPromotionType;
  exception_label: ProductDetailExceptionLabel;
  review_count: number | null;
  today_brix: string | null;
  sales_unit: string | null;
  volume: string | null;
  expiration_date: string | null;
  product_origin: string | null;
  allergy: string | null;
  product_detail: {
    legacy_content: string | null;
    legacy_pi_images: string[];
    legacy_event_banner: string;
    content: ProductDetailContentData[];
    giveaway_contents_box?: ProductDetailGiveawayContentsBoxData | null;
  };
  delivery_type_names: DeliveryInfoName[];
  delivery_type_infos: DeliveryInfoType[];
  is_multiple_price: boolean;
  deal_products: DealProductResponse[];
  is_expected_point: boolean;
  expected_point: number;
  expected_point_ratio: number;
  guides: string[];
  after_sale_service_info: {
    contact_number: string;
    information: string;
  };
  seller_names: string[];
  member_coupon: {
    newbie_limit_datetime: string | null;
    newbie_min_price: number;
  };
  direct_order_type: DirectOrderType;
  seller_profile: ProductInfoDictionaryItemData[];
  is_third_part: boolean;
  sites: ProductSiteType[];
  kurly_plcc: {
    is_shown: boolean;
    url: string;
    benefits: PlccBenefit[];
  };
  is_join_order: boolean;
  join_order: {
    banner: {
      is_show: boolean;
      contents: {
        id: string;
        body: string;
        color: string;
        font: string;
        type: string;
      }[];
    };
  };
  stickers_v2: SnakeCaseStickerList;
  product_vertical_large_url: string;
  product_vertical_small_url: string;
  product_horizontal_large_url: string;
  point_banner: PointBannerResponse;
  is_free_delivery: boolean;
  return_info: {
    address: string | null;
    one_way_cost: number | null;
    round_trip_cost: number | null;
  };
  category_ids?: number[];
}

export interface ProductDetailMetaData {
  is_inquiry_writable: boolean;
  is_review_writable: boolean;
}

export interface ProductDetailResponse {
  data: ProductDetailData;
  meta: ProductDetailMetaData;
}

interface FetchProductDetailProps {
  productCode: number;
  accessToken?: string;
  userAgent?: string;
  joinCode?: string;
  isInternal?: boolean;
}

/*
 *  NOTE: FETCH_PRODUCT_DETAIL_TIMEOUT가 5000ms로 설정된 이유
 *  - api-kurly-com에 설정되어 있는 Connection timeout이 5000ms
 *  - 요청하는 서버(NX)의 connection timeout이 요청 받는 서버보다 짧은 경우 요청하는 서버(NX)는 요청을 끊었지만 서버에서는 요청에 대한 처리를 진행
 *    -  API 서버의 처리가 계속되는 것을 막기 위해 NX에서 5000ms timeout 값으로 세팅
 */
const FETCH_PRODUCT_DETAIL_TIMEOUT = 1000 * 5;

export const fetchProductDetail = async ({
  productCode,
  accessToken = '',
  userAgent = '',
  joinCode = '',
  isInternal = false,
}: FetchProductDetailProps): Promise<ProductDetailResponse> => {
  try {
    const domain = isInternal ? INTERNAL_API_URL : API_URL;
    const path = `/showroom/v2/products/${Number(productCode)}`;
    const url = `${domain}${path}${isEmpty(joinCode) ? '' : `?join_order_code=${joinCode}`}`;
    if (accessToken) {
      const config = {
        // NOTE: headers에 User-Agent를 넣어주지 않으면 서버에서 PC와 Mobile을 구분하지 못함
        headers: { Authorization: `Bearer ${accessToken}`, 'User-Agent': userAgent },
        timeout: FETCH_PRODUCT_DETAIL_TIMEOUT,
      };
      const { data } = await axios.get(url, config);
      return data;
    }
    const { data } = await httpClient.get(url, {
      timeout: FETCH_PRODUCT_DETAIL_TIMEOUT,
    });
    return data;
  } catch (err) {
    console.log('<-----상품상세 에러 ---->');
    console.log(err);
    console.log('<-----JSON.stringify(err) ---->');
    console.log(JSON.stringify(err));
    console.log('<-----상품상세 에러 ---->');

    if (err.response?.status === 401 && +err.response?.data?.code === LockedUserErrorCode) {
      throw new LockedUserError(err);
    }

    throw new Error(err.response?.data?.message);
  }
};
