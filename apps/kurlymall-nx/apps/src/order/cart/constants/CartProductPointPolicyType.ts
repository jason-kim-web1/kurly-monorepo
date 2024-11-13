/**
 * MEMBER: 회원 등급별 정책
 * FIXED: 고정 적립금
 * EXCLUDE: 적립금 제외
 * PERCENT: 고정 적립률
 * MAX_PERCENT: 최대 적립률
 * MAX_FIXED: 최대 적립금
 */
export const CART_PRODUCT_POINT_POLICY = {
  MEMBER: 'MEMBER',
  FIXED: 'FIXED',
  EXCLUDE: 'EXCLUDE',
  PERCENT: 'PERCENT',
  MAX_PERCENT: 'MAX_PERCENT',
  MAX_FIXED: 'MAX_FIXED',
} as const;

export type CartProductPointPolicy = typeof CART_PRODUCT_POINT_POLICY[keyof typeof CART_PRODUCT_POINT_POLICY];
