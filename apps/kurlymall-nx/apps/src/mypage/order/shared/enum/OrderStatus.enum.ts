export enum OrderStatus {
  COMPLETED = 'COMPLETED',
  PRODUCING = 'PRODUCING',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  REFUND_REQUESTED = 'REFUND_REQUESTED',
  REFUNDED = 'REFUNDED',
}

export type OrderStatusType = keyof typeof OrderStatus;
