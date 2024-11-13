export const RECEIPT_TITLE = {
  CREDIT_CART: '카드영수증',
  CASH: '현금영수증',
} as const;

export const RECEIPT_TYPE = {
  CREDIT_CART: 'CREDIT_CART',
  CASH: 'CASH',
} as const;

export type ReceiptType = keyof typeof RECEIPT_TYPE;
