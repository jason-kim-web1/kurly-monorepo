export const RECEIVER_PACKING_TYPE = {
  PAPER: 'PAPER',
  KURLY: 'KURLY',
  PERSONAL: 'PERSONAL',
} as const;

export type ReceiverPackingType = typeof RECEIVER_PACKING_TYPE[keyof typeof RECEIVER_PACKING_TYPE];

export const RECEIVER_PACKING_TYPE_TEXT: Record<ReceiverPackingType, string> = {
  PAPER: '종이 포장재',
  KURLY: '컬리 퍼플 박스',
  PERSONAL: '개인 보냉 박스',
};
