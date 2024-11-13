export const ORDER_STATUS = {
  주문완료: '주문완료',
  배송준비중: '배송준비중',
  배송중: '배송중',
  배송완료: '배송완료',
  취소접수: '취소접수',
  취소완료: '취소완료',
} as const;

export type OrderStatus = keyof typeof ORDER_STATUS;
