import { OrderStatusType } from '../../mypage/order/shared/enum/OrderStatus.enum';
import { PaymentVendorCode } from '../constant';

export interface Order {
  groupOrderNo: number;
  contentsProductName: string;
  imageUrl: string;
  productVerticalSmallUrl: string;
  orderStatus: OrderStatusType;
  orderStatusDisplayName: string;
  orderedAt: string;
  paymentCompletedAt: string;
  paymentGatewayId: PaymentVendorCode;
  paymentGatewayIdDisplayName: string;
  productCount: number;
  totalPaymentPrice: number;
}

export interface OrderPagination {
  currentPage: number;
  endDate: string;
  hasNext: boolean;
  limit: number;
  startDate: number;
  totalPage: number;
}

export interface OrderListResponse {
  items: Order[];
  pagination: OrderPagination;
}
