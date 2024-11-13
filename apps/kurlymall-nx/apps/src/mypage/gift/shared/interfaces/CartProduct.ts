import { LegacyPromotion } from '../../../../shared/enums/LegacyPromotion.enum';

type Nullable<T> = T | null;

export interface ContentsProduct {
  no: number;
  name: string;
  isSoldOut: boolean;
  minEa: number;
  maxEa: Nullable<number>;
  originalImageUrl: string;
  isPurchaseStatus: boolean;
  isGiftable: boolean;
  isOnlyAdult: boolean;
  isGroupProduct: boolean;
  legacyPromotion: Nullable<LegacyPromotion>;
  dealProducts: DealProduct[];
}

export interface DealProduct {
  no: number;
  name: string;
  isExpectedPoint: boolean;
  expectedPoint: number;
  expectedPointRatio: number;
  basePrice: number;
  retailPrice: Nullable<number>;
  discountedPrice: Nullable<number>;
  discountRate: number;
  buyUnit: number;
  isSoldOut: boolean;
  minEa: number;
  maxEa: number;
  canRestockNotify: boolean;
  isPurchaseStatus: boolean;
  isGiftable: boolean;
  isOnlyAdult: boolean;
  masterProductCode: string;
  masterProductName: string;
}
