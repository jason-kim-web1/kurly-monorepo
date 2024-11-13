// TODO: 삭제 필요
export enum OrderStatus {
  COMPLETED = 'COMPLETED',
  PRODUCING = 'PRODUCING',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  REFUND_REQUESTED = 'REFUND_REQUESTED',
  REFUNDED = 'REFUNDED',
}

// TODO: 삭제 필요
export type OrderStatusType = keyof typeof OrderStatus;

/**
 * 선물주문 상태
 * - READY_FOR_ACCEPT : 선물 수락 대기
 * - REJECTED : 선물 거절
 * - ACCEPTED : 선물 수락
 * - DELIVERED : 선물 배송 완료
 * - CANCELED : 선물 취소 완료
 */
export enum GiftOrderStatus {
  READY_FOR_ACCEPT = 'READY_FOR_ACCEPT',
  ACCEPTED = 'ACCEPTED',
  DELIVERED = 'DELIVERED',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED',
}
