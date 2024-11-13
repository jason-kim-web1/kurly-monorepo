export const CART_STORAGE_GROUP_TYPE = {
  AMBIENT_TEMPERATURE: 'AMBIENT_TEMPERATURE',
  COLD: 'COLD',
  FROZEN: 'FROZEN',
} as const;

export type CartStorageGroupType = typeof CART_STORAGE_GROUP_TYPE[keyof typeof CART_STORAGE_GROUP_TYPE];

export const CART_STORAGE_GROUP_TYPE_TEXT = {
  AMBIENT_TEMPERATURE: '상온',
  COLD: '냉장',
  FROZEN: '냉동',
} as const;
