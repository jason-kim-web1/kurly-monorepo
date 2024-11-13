/**
 * 샛별배송의 배송완료 알림 수신요청 시각
 *
 */

export const DELIVERY_MESSAGE_TIME_TYPE = {
  IMMEDIATELY: 'IMMEDIATELY', // 배송즉시
  AM7: 'AM7', // 7시
  AM8: 'AM8', // 8시
} as const;

export type DeliveryMessageTimeType = typeof DELIVERY_MESSAGE_TIME_TYPE[keyof typeof DELIVERY_MESSAGE_TIME_TYPE];
