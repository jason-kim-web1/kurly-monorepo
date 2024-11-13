import type { DeliveryInfoName, DeliveryInfoType, StickerList } from '../../product/types';
import type { ShortCutType } from '../types';

/**
 * @Deprecated
 * @link ProductData 사용
 */
export interface Product {
  id: string;
  dealProductName: string;
  contentProductName: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  thumbnailUrl: string;
}

export type NormalOrderTypePolicyType = 'DEFAULT' | 'SINGLE_DIRECT_ORDER' | 'MULTIPLE_DIRECT_ORDER';

export type GiftOrderTypePolicy = 'SINGLE_DIRECT_ORDER';

// 상품별 부과된 배송비 조건
export enum DeliveryPricePolicyType {
  FREE = 'FREE',
  PAY = 'PAY',
  CONDITIONAL = 'CONDITIONAL',
}

export type DeliveryPricePolicy = keyof typeof DeliveryPricePolicyType;

export interface ProductSticker {
  backgroundColor: string;
  content: {
    text: string;
    weight: string;
  }[];
  opacity: number;
}

interface ProductTagsData {
  name: string;
  type: string;
}

export type ProductStatusCode = 'PURCHASABLE' | 'NOT_PURCHASABLE' | 'SOLD_OUT' | 'NOT_DELIVERABLE';

export type ProductViewStatusCode = 'BUY_POSSIBLE' | 'BUY_IMPOSSIBLE' | 'SOLD_OUT' | 'BLOCK_ZIPCODE';

export interface ProductStatus {
  code: ProductStatusCode;
  message?: {
    title: string;
    content: string;
  };
}

export interface ProductData {
  canRestockNotify: boolean;
  discount: {
    price: number | null;
    rate: number;
  };
  groupProduct: {
    isGroup: boolean;
    isNotRepresentative: boolean;
  };
  isBuyNow: boolean;
  isGiftable: boolean;
  isMultiplePrice: boolean;
  isPurchaseStatus: boolean;
  isSales?: boolean;
  isOnlyAdult: boolean;
  name: string;
  no: number;
  salesPrice: number;
  shortDescription: string;
  status: ProductStatus;
  tags: ProductTagsData[];
  deliveryTypeNames: DeliveryInfoName[];
  deliveryTypeInfos: DeliveryInfoType[];
  reviewCount: string;
  listImageUrl: string;
  productVerticalMediumUrl?: string;
  stickers_v2: StickerList;
}

export interface ProductSelectData {
  index: number;
  productNo: string | number;
  isGroupProduct: boolean;
  type?: ShortCutType;
  productData: Pick<
    ProductData,
    | 'no'
    | 'name'
    | 'discount'
    | 'salesPrice'
    | 'status'
    | 'isGiftable'
    | 'deliveryTypeNames'
    | 'stickers_v2'
    | 'reviewCount'
  >;
}

export interface ProductMainSelectData {
  type: string;
  index: number;
  productNo: string | number;
}
