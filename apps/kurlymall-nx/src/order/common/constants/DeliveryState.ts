export const DELIVERY_STATE = {
  DELIVERING: 'DELIVERING',
  NON_DELIVERED: 'NON_DELIVERED',
  DELIVERED: 'DELIVERED',
} as const;

export type DeliveryState = typeof DELIVERY_STATE[keyof typeof DELIVERY_STATE];
