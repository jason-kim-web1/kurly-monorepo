import type { ProductCardProps } from '../../types';
import { ShortCutType } from '../../../../shared/types';

export const getProductShortCutEventData = (shortCutType: ShortCutType, productCardProps: ProductCardProps) => {
  const {
    index,
    productNo,
    price,
    discount,
    name,
    status,
    isGroupProduct,
    deliveryTypeNames,
    reviewCount,
    isGiftable,
    stickers_v2,
  } = productCardProps;
  return {
    index: index || 0,
    productNo,
    isGroupProduct,
    type: shortCutType,
    productData: {
      no: productNo,
      name,
      discount,
      salesPrice: price,
      status,
      isGiftable,
      stickers_v2,
      deliveryTypeNames,
      reviewCount,
    },
  };
};

export const getProductCardEventData = (productCardProps: ProductCardProps) => {
  const {
    index,
    productNo,
    price,
    discount,
    name,
    status,
    isGroupProduct,
    deliveryTypeNames,
    reviewCount,
    isGiftable,
    stickers_v2,
  } = productCardProps;
  return {
    index: index || 0,
    productNo,
    isGroupProduct,
    productData: {
      no: productNo,
      name,
      discount,
      salesPrice: price,
      status,
      isGiftable,
      stickers_v2,
      deliveryTypeNames,
      reviewCount,
    },
  };
};
