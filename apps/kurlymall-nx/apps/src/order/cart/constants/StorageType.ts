export const CART_STORAGE_TYPE = {
  AMBIENT_TEMPERATURE: 'AMBIENT_TEMPERATURE', // 상온
  ROOM_TEMPERATURE: 'ROOM_TEMPERATURE', // 실온
  COLD: 'COLD', // 냉장
  FROZEN: 'FROZEN', // 냉동
  ETC: 'ETC', // 기타
} as const;

export type CartStorageType = typeof CART_STORAGE_TYPE[keyof typeof CART_STORAGE_TYPE];
