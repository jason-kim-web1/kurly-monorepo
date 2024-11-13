// 상품별 부과된 배송비 조건
export const CART_DELIVERY_PRICE = {
  FREE: 'FREE',
  PAY: 'PAY',
} as const;

export type CartDeliveryPrice = typeof CART_DELIVERY_PRICE[keyof typeof CART_DELIVERY_PRICE];
