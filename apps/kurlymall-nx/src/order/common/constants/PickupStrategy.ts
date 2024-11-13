export const PICKUP_STRATEGY = {
  COMMON: 'COMMON',
  QR: 'QR',
} as const;

export type PickupStrategy = typeof PICKUP_STRATEGY[keyof typeof PICKUP_STRATEGY];
