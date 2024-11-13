export const ORDER_TYPE_STATUS = {
  DEFAULT: 'DEFAULT',
  SINGLE_DIRECT_ORDER: 'SINGLE_DIRECT_ORDER',
  MULTIPLE_DIRECT_ORDER: 'MULTIPLE_DIRECT_ORDER',
};

export interface FavoriteProduct {
  contentsProductNo: number;
  dealProductNo: number;
  dealProductName: string;
  masterProductNo: string;
  count: number;
  // NOTE: 이미지 리사이징 - 원본 이미지 속성은 추후 삭제될 수 있습니다.
  productImageUrl: string;
  productVerticalMediumUrl: string;
  discountRate: number;
  productPrice: number;
  retailPrice: number;
  discountPrice: number;
  normalOrderTypePolicyInContents: 'DEFAULT' | 'SINGLE_DIRECT_ORDER' | 'MULTIPLE_DIRECT_ORDER';
  isRestockNotify: boolean;
  isDisplay: boolean;
  isSoldOut: boolean;
  categoryIds: number[];
}

export type FavoriteProductExtend = FavoriteProduct & {
  isCartAdd: boolean;
  isDealSoldOut: boolean;
  isDealComingSoon: boolean;
  productName: string;
};
