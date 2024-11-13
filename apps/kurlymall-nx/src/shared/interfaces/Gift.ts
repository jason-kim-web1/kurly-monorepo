import { VendorCode } from '../../order/shared/shared/interfaces';
import { GiftMethod, GiftStatus, PaymentMethod, PaymentVendorCode } from '../constant';
import { Order, OrderDetailPayInfoResponse } from './OrderDetail';
import { Receipt } from './Receipt';

export interface GiftOrderListRequestParams {
  page: number;
  limit: number;
  startDate?: string;
  endDate?: string;
}

export interface GiftOrderPagination {
  hasNext: boolean;
  totalPage: number;
  currentPage: number;
  limit: number;
  startDate: string;
  endDate: string;
}

export interface GiftOrderListResponse {
  items: GiftListItem[];
  pagination: GiftOrderPagination;
}

export interface GiftListItem {
  groupOrderNo: number;
  externalGroupOrderNo: string;
  ordererName: string;
  availableDate: string;
  paymentCompletedAt: string;
  orderedAt: string;
  totalPaymentPrice: number;
  notificationType: GiftMethod;
  recipientName: string;
  giftOrderStatus: GiftStatus;
  paymentGatewayId: VendorCode | 'kurly';
  imageUrl: string;
  productVerticalSmallUrl: string;
  contentsProductName: string;
  productCount: number;
  notificationSentCount: number;
  possibleNotificationSentCount: number;
}

export interface GiftOrderDetailResponse extends OrderDetailPayInfoResponse {
  // 대표 주문번호
  groupOrderNo: number;
  // 외부 노출용 대표주문번호(선물 수신인 전달용)
  externalGroupOrderNo: string;
  // 선물 주문 상태
  status: GiftStatus;
  // 선물 수신인 명
  recipientName: string;
  // 선물 수신인 전화번호
  recipientMobile: string;
  // 선물 메세지
  message: string;
  // 주문자 명
  ordererName: string;
  // 결제 일시
  paymentCompletedAt: string;
  // 선물주문자 취소가능여부
  isSelfCancelable: boolean;
  // 개별 주문 목록
  orders: Order[];
  // 일일 최대 알람 발송 횟수
  possibleNotificationSentCount: number;
  // 현재 알림 발송 횟수
  notificationSentCount: number;
  // 알림 전송 방법
  notificationType: GiftMethod;
  // 선물발송 일시
  giftSentDateTime: string;
  // 선물수락 일시
  giftAcceptedDateTime: string;
  // 선물거절 일시
  giftRejectedDateTime: string;
  // 선물취소 일시
  giftCanceledDateTime: string;
  // 선물수락 가능 기한
  availableDate: string;
}

export interface GiftDetailPayment {
  receipt?: Receipt;
  method: PaymentMethod;
  paymentGatewayId: PaymentVendorCode;
  paymentGatewayIdDisplayName: string;
  paymentCompletedAt: string;
  totalDisplayProductsPrice: number;
  totalDisplayProductsDiscountPrice: number;
  totalPaymentPrice: number;
  deliveryPrice: number;
  totalCouponDiscountPrice: number;
  totalUsedPoint: number;
  totalUsedFreePoint: number;
  totalUsedPaidPoint: number;
  totalRefundedPrice: number;
  totalAccruedPoint: number;
  totalRemainPaymentPrice: number;
  totalRefundRequestedPrice: number;
  totalCardInstantDiscountPrice: number;
}
export interface GiftDetailItem {
  dealProductNo: number;
  contentsProductNo: number;
  dealProductName: string;
  contentsProductName: string;
  imageUrl: string;
  quantity: number;
  displayPrice: number;
  displayDiscountPrice: number;
  isGiveawayProduct: boolean;
}

export interface GiftDetails {
  groupOrderNo: number;
  externalGroupOrderNo: string;
  status: GiftStatus;
  recipientName: string;
  recipientMobile: string;
  message: string;
  ordererName: string;
  possibleNotificationSentCount: number;
  notificationSentCount: number;
  isSelfCancelable: boolean;
  notificationType: GiftMethod;
  availableDate: string;
  payment: GiftDetailPayment;
  products: GiftDetailItem[];
}

export interface PostResendRequest {
  groupOrderNo: number;
  recipientName: string;
}
