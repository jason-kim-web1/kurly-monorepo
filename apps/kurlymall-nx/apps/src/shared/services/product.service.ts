import { get } from 'lodash';

import type { DeliveryInfoName, DeliveryInfoType, SnakeCaseStickerList } from '../../product/types';
import type { ProductData, ProductStatusCode, ProductViewStatusCode } from '../interfaces';
import { transformSnakeCaseStickerList } from '../utils/sticker';

export const productStatusMap: Record<ProductViewStatusCode, ProductStatusCode> = {
  BUY_POSSIBLE: 'PURCHASABLE',
  BUY_IMPOSSIBLE: 'NOT_PURCHASABLE',
  SOLD_OUT: 'SOLD_OUT',
  BLOCK_ZIPCODE: 'NOT_DELIVERABLE',
} as const;

export interface ProductParam {
  no: number;
  name: string;
  shortDescription: string;
  listImageUrl: string;
  productVerticalMediumUrl?: string;
  salesPrice: number;
  discountedPrice: number | null;
  discountRate: number;
  isBuyNow: boolean;
  isGiftable: boolean;
  canRestockNotify: boolean;
  isSales?: boolean;
  isOnlyAdult: boolean;
  isMultiplePrice: boolean;
  isPurchaseStatus: boolean;
  soldOutTitle: string;
  soldOutText: string;
  notPurchaseMessage: string;
  groupProduct: {
    isGroup: boolean;
    isNotRepresentative: boolean;
  };
  productViewStatus: string;
  reviewCount: string;
  tags: {
    name: string;
    type: string;
  }[];
  deliveryTypeNames: DeliveryInfoName[];
  deliveryTypeInfos: DeliveryInfoType[];
  stickers_v2: SnakeCaseStickerList;
}

export type ProductPurchasableStatus = {
  code: ProductStatusCode;
  message?: {
    title: string;
    content: string;
  };
};

export const getProductPurchasableStatus = ({
  productViewStatus,
  notPurchaseMessage,
  soldOutTitle,
  soldOutText,
}: {
  productViewStatus: string;
  notPurchaseMessage: string;
  soldOutTitle: string;
  soldOutText: string;
}): ProductPurchasableStatus => {
  if (productViewStatus === 'BUY_POSSIBLE') {
    return {
      code: 'PURCHASABLE',
      message: undefined,
    };
  }
  if (productViewStatus === 'SOLD_OUT') {
    return {
      code: 'SOLD_OUT',
      message: {
        title: soldOutTitle,
        content: soldOutText,
      },
    };
  }
  return {
    code: productStatusMap[productViewStatus as ProductViewStatusCode] ?? 'NOT_PURCHASABLE',
    message: {
      title: notPurchaseMessage,
      content: '',
    },
  };
};

export const getStatus = ({
  productViewStatus,
  notPurchaseMessage,
  soldOutTitle,
  soldOutText,
}: ProductParam): {
  code: ProductStatusCode;
  message?: {
    title: string;
    content: string;
  };
} => {
  if (productViewStatus === 'BUY_POSSIBLE') {
    return {
      code: 'PURCHASABLE',
      message: undefined,
    };
  }
  if (productViewStatus === 'SOLD_OUT') {
    return {
      code: 'SOLD_OUT',
      message: {
        title: soldOutTitle,
        content: soldOutText,
      },
    };
  }
  return {
    code: productStatusMap[productViewStatus as ProductViewStatusCode] ?? 'NOT_PURCHASABLE',
    message: {
      title: notPurchaseMessage,
      content: '',
    },
  };
};

export function createProductData(param: ProductParam): ProductData {
  return {
    canRestockNotify: param.canRestockNotify,
    discount: {
      price: param.discountedPrice,
      rate: param.discountRate,
    },
    groupProduct: param.groupProduct,
    isBuyNow: param.isBuyNow,
    isGiftable: param.isGiftable,
    isMultiplePrice: param.isMultiplePrice,
    isPurchaseStatus: param.isPurchaseStatus,
    isSales: param.isSales,
    isOnlyAdult: param.isOnlyAdult,
    listImageUrl: param.listImageUrl,
    productVerticalMediumUrl: param.productVerticalMediumUrl,
    name: param.name,
    no: param.no,
    salesPrice: param.salesPrice,
    shortDescription: param.shortDescription,
    tags: param.tags,
    deliveryTypeNames: param.deliveryTypeNames,
    deliveryTypeInfos: param.deliveryTypeInfos,
    status: getStatus(param),
    reviewCount: param.reviewCount,
    stickers_v2: transformSnakeCaseStickerList(get(param, 'stickers_v2')),
  };
}
