export const BASE_ADDRESS_TYPE = { ROAD: 'R', JINBUN: 'J' } as const;

export type BaseAddressType = typeof BASE_ADDRESS_TYPE[keyof typeof BASE_ADDRESS_TYPE];

export const DELIVERY_TYPE = { DIRECT: 'direct', INDIRECT: 'indirect', DISABLE: 'disable' } as const;

export type DeliveryType = typeof DELIVERY_TYPE[keyof typeof DELIVERY_TYPE];
