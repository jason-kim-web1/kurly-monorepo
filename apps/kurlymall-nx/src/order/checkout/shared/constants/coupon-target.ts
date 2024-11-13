export const COUPON_TARGET_MESSAGE = {
  all: 'ALL',
  kurly: 'KURLY',
  thirdPartner: 'THIRD_PARTNER',
} as const;

export type CheckoutCouponTargetType = typeof COUPON_TARGET_MESSAGE[keyof typeof COUPON_TARGET_MESSAGE];

export const KURLY_TARGET_MESSAGE = '컬리상품 한정';

export const APP_ONLY_MESSAGE = '앱 전용';

export const NOW_ONLY_MESSAGE = '컬리나우 전용';
