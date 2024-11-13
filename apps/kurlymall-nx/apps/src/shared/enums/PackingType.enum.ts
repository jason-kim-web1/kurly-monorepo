export enum Packing {
  MISSING = 'MISSING',
  COLD = 'COLD',
  ROOM = 'ROOM',
  FROZEN = 'FROZEN',
  ROOM_COLD = 'ROOM_COLD',
}

export type PackingType = keyof typeof Packing;

// 장바구니에서 패킹 타입 분류
export enum CartStorageType {
  AMBIENT_TEMPERATURE = 'AMBIENT_TEMPERATURE', // 상온
  ROOM_TEMPERATURE = 'ROOM_TEMPERATURE', // 실온
  COLD = 'COLD', // 냉장
  FROZEN = 'FROZEN', // 냉동
  ETC = 'ETC', // 기타
}

export type StorageType = keyof typeof CartStorageType;
