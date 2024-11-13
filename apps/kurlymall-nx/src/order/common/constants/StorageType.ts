export const STORAGE_TYPE = {
  상온: '상온', // 상온
  실온: '실온', // 실온
  냉장: '냉장', // 냉장
  냉동: '냉동', // 냉동
  기타: '기타', // 기타
} as const;

export type StorageType = keyof typeof STORAGE_TYPE;
