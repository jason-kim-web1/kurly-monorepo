import { Benefit, BenefitType } from '../../../../shared/interfaces';

export const BenefitInfoType: Record<BenefitType, BenefitType> = {
  [Benefit.PERCENT_DISCOUNT]: 'PERCENT_DISCOUNT',
  [Benefit.PRICE_DISCOUNT]: 'PRICE_DISCOUNT',
  [Benefit.FREE_SHIPPING]: 'FREE_SHIPPING',
};

export const TargetList = {
  DISALLOWED: 'DISALLOWED',
  ALLOWED: 'ALLOWED',
} as const;

export type TargetListType = keyof typeof TargetList;

export const TargetScope = {
  ALL: 'ALL',
  PRODUCT: 'PRODUCT',
  CATEGORY: 'CATEGORY',
} as const;

export const OrderHurdle = {
  ALLOWED_PRODUCT: 'ALLOWED_PRODUCT',
  ALLOWED_CATEGORY: 'ALLOWED_CATEGORY',
} as const;

export type OrderHurdleType = keyof typeof OrderHurdle;
