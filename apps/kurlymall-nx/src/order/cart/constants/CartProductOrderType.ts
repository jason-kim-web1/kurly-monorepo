// 장바구니 상품의 주문 상태
export const CART_PRODUCT_ORDER_STATUS = {
  AVAILABLE: 'AVAILABLE',
  UNAVAILABLE: 'UNAVAILABLE',
} as const;

export type CartProductOrderStatus = typeof CART_PRODUCT_ORDER_STATUS[keyof typeof CART_PRODUCT_ORDER_STATUS];

/**
 * 장바구니 상품의 주문불가 상태
 *
 * SOLD_OUT                 품절
 * NOT_SHOWN                미진열
 * OFF_SALE                 판매 해제
 * RETIRED                  은퇴
 * NOT_CART_ITEM            장바구니에 담기면 안 됨
 * THIRD_PARTY_PARTNER      3P
 * INCORRECT_DELIVERY_TYPE  잘못된 배송 유형
 * NOT_LOVERS               러버스 등급 아님
 * INVALID_B2B              B2B 회원 아님
 * NOT_SUBSCRIBED           구독 안 함
 * NOT_VIP                  VIP 등급 아님
 * NOT_VVIP                 VVIP 등급 아님
 */
export const CART_PRODUCT_ORDER_UNAVAILABLE = {
  SOLD_OUT: 'SOLD_OUT',
  NOT_SHOWN: 'NOT_SHOWN',
  OFF_SALE: 'OFF_SALE',
  RETIRED: 'RETIRED',
  NOT_CART_ITEM: 'NOT_CART_ITEM',
  THIRD_PARTY_PARTNER: 'THIRD_PARTY_PARTNER',
  INCORRECT_DELIVERY_TYPE: 'INCORRECT_DELIVERY_TYPE',
  NOT_LOVERS: 'NOT_LOVERS',
  INVALID_B2B: 'INVALID_B2B',
  NOT_SUBSCRIBED: 'NOT_SUBSCRIBED',
  NOT_VIP: 'NOT_VIP',
  NOT_VVIP: 'NOT_VVIP',
} as const;

export type CartProductOrderUnavailable =
  typeof CART_PRODUCT_ORDER_UNAVAILABLE[keyof typeof CART_PRODUCT_ORDER_UNAVAILABLE];
