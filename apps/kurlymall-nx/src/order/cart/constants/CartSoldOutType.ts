export const CART_SOLD_OUT = {
  SOLD_OUT: 'SOLD_OUT',
  COMING_SOON: 'COMING_SOON',
} as const;

export type CartSoldOut = typeof CART_SOLD_OUT[keyof typeof CART_SOLD_OUT];
