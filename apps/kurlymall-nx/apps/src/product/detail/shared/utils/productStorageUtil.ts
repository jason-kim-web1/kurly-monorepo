import { StorageType } from '../../../../shared/enums';

const storageTextMap: Record<StorageType, string> = {
  AMBIENT_TEMPERATURE: '상온',
  ROOM_TEMPERATURE: '실온',
  COLD: '냉장',
  FROZEN: '냉동',
  ETC: '기타',
} as const;

const storageOrderMap: Record<StorageType, number> = {
  AMBIENT_TEMPERATURE: 0,
  ROOM_TEMPERATURE: 1,
  COLD: 2,
  FROZEN: 3,
  ETC: 4,
} as const;

export const buildProductStorageText = (types: StorageType[]) => {
  return types
    .slice()
    .sort((a, b) => storageOrderMap[a] - storageOrderMap[b])
    .map((type) => storageTextMap[type])
    .join('/');
};
