/**
 * 장바구니 상품 타입
 *
 * 컬리배송, 판매자 국내배송, 판매자 해외배송
 */
export const CART_DELIVERY_GROUP = {
  KURLY: 'kurlyDelivery',
  PARTNER_DOMESTIC: 'partnerDomesticDelivery',
  PARTNER_INTERNATIONAL: 'partnerInternationalDelivery',
  UNAVAILABLE_ORDERS: 'unavailableOrders',
} as const;

export type CartDeliveryGroup = typeof CART_DELIVERY_GROUP[keyof typeof CART_DELIVERY_GROUP];
export type AvailableCartDeliveryGroup = Exclude<CartDeliveryGroup, typeof CART_DELIVERY_GROUP.UNAVAILABLE_ORDERS>;
