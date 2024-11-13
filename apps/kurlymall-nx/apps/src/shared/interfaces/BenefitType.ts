export const Benefit = {
  PERCENT_DISCOUNT: 'PERCENT_DISCOUNT',
  PRICE_DISCOUNT: 'PRICE_DISCOUNT',
  FREE_SHIPPING: 'FREE_SHIPPING',
} as const;

export type BenefitType = keyof typeof Benefit;

export type BenefitTypeText = '무료배송' | '할인';

export const SalesOwner = {
  ALL: 'ALL',
  KURLY: 'KURLY',
  THIRD_PARTNER: 'THIRD_PARTNER',
} as const;

export type SalesOwnerType = keyof typeof SalesOwner;

export const SiteType = {
  ALL: 'ALL',
  KURLY_MALL: 'KURLY_MALL',
  KURLY_NOW: 'KURLY_NOW',
} as const;

export type TargetSiteType = keyof typeof SiteType;
