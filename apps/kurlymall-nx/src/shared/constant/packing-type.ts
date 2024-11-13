import { Packing } from '../enums';

export const packing: Record<Packing, string> = {
  MISSING: '-',
  COLD: '냉장',
  ROOM: '상온',
  FROZEN: '냉동',
  ROOM_COLD: '냉장 상온 합포',
};
