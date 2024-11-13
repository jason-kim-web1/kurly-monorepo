/**
 * 샛별배송의 배송완료 알림 수신요청 시각
 *
 * IMMEDIATELY : 배송즉시
 *
 * AM7 : 7시
 *
 * AM8 : 8시
 */
export enum DeliveryCompleteMessage {
  IMMEDIATELY = 'IMMEDIATELY',
  AM7 = 'AM7',
  AM8 = 'AM8',
}

export type DeliveryCompleteType = keyof typeof DeliveryCompleteMessage;

// 특수 배송제한 적용 페이지
export enum SpecialHolidayDeliveryPage {
  view = 'view', // 상품 상세
  order = 'order', // 주문서
  orderEnd = 'orderEnd', // 주문 완료
}
