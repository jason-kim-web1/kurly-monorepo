export const PACKING_TYPE = {
  MISSING: 'MISSING',
  COLD: 'COLD',
  ROOM: 'ROOM',
  FROZEN: 'FROZEN',
  ROOM_COLD: 'ROOM_COLD',
} as const;

export type PackingType = typeof PACKING_TYPE[keyof typeof PACKING_TYPE];

export const PACKING_TYPE_TEXT: Record<PackingType, string> = {
  MISSING: '-',
  COLD: '냉장',
  ROOM: '상온',
  FROZEN: '냉동',
  ROOM_COLD: '냉장 상온 합포',
};
