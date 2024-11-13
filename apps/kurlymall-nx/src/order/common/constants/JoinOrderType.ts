export const JOIN_ORDER_TYPE = {
  CREATED: 'CREATED',
  JOINED: 'JOINED',
} as const;

export type JoinOrderType = typeof JOIN_ORDER_TYPE[keyof typeof JOIN_ORDER_TYPE];
