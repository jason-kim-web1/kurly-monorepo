export const PICKUP_STATUS = {
  PROGRESS: 'PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
  IMPOSSIBLE: 'IMPOSSIBLE',
} as const;

export type PickupStatus = typeof PICKUP_STATUS[keyof typeof PICKUP_STATUS];
