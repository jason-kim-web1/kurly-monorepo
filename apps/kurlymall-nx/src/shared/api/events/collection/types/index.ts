import type { ProductViewStatusCode } from '../../../../interfaces';
import type { DeliveryInfoName } from '../../../../../product/types';

interface CollectionSetProductItemType {
  no: number;
  name: string;
  shortDescription: string;
  salesPrice: number;
  discount: {
    price: number;
    rate: number;
  };
  productViewStatus: ProductViewStatusCode;
  isSales: boolean; // 판매 상태
  isSoldOut: boolean; // 품절 상태
  soldOutMessage: {
    title: string;
    text: string;
  };
  isPurchaseStatus: boolean; // 전시 상태
  notPurchaseMessage: string;
  isBuyNow: boolean;
  isGiftable: boolean;
  isMultiplePrice: boolean;
  isOnlyAdult: boolean;
  listImageUrl: string;
  productVerticalMediumUrl: string;
  canRestockNotify: boolean;
  deliveryTypeNames: DeliveryInfoName[];
  reviewCount: string;
  tags: {
    name: string;
    type: string;
  }[];
  groupProduct: {
    isGroup: boolean;
    isNotRepresentative: boolean;
  };
}

export type { CollectionSetProductItemType };
