export const STATUS = {
  COMPLETED: 'COMPLETED', //주문완료
  PRODUCING: 'PRODUCING', //배송준비중
  DELIVERING: 'DELIVERING', // 배송중
  DELIVERED: 'DELIVERED', // 배송완료
  REFUND_REQUESTED: 'REFUND_REQUESTED', // 취소접수
  REFUNDED: 'REFUNDED', //취소완료
} as const;

export type Status = keyof typeof STATUS;

export const STATUS_TEXT: Record<Status, string> = {
  COMPLETED: '주문완료',
  PRODUCING: '배송준비중',
  DELIVERING: '배송중',
  DELIVERED: '배송완료',
  REFUND_REQUESTED: '취소접수',
  REFUNDED: '취소완료',
};
