// 받으실 장소 타입
export const PICKUP_TYPE = {
  DOOR: 'DOOR',
  ETC: 'ETC',
} as const;

export type PickupType = typeof PICKUP_TYPE[keyof typeof PICKUP_TYPE];
