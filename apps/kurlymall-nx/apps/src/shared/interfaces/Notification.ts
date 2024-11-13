export type NotificationType =
  | 'INFORMATION' // 정보성
  | 'ADVERTISEMENT'; // 광고성

export type NotificationCategory =
  | 'NOTICE' // 공지 - 하드코딩용 카테고리. BE엔 없음
  | 'RESTOCKED' // 재입고
  | 'PAYMENT_DELIVERY' // 결제/배송
  | 'MEMBER_BENEFITS' // 회원/혜택
  | 'EVENT' // 이벤트
  | 'CUSTOMER_CENTER'; // 고객센터
// | 'KURLY_LOG' // 컬리로그

export interface NotificationItem {
  id: number;
  notificationType: NotificationType;
  notificationCategory: NotificationCategory;
  title: string;
  contents: string;
  imageUrl?: string;
  landingLink?: string;
  createdAt: Date;
  hideDate?: boolean;
}
