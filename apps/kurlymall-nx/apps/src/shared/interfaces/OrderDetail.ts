import { JoinOrderType, ReusablePackageType } from '.';
import { BusinessType, DeliveryCompleteType, FrontDoorMethodType, PackingType, ReceivePlaceType } from '../enums';
import { DeliveryState, PaymentMethod, PaymentVendorCode } from '../constant';
import { OrderStatusType } from '../../mypage/order/shared/enum/OrderStatus.enum';
import { ReviewStatusType } from '../enums/ReviewStatus.enum';
import { DeliverySummary } from '../../mypage/order/shared/interfaces';
import { Receipt } from './Receipt';
import { ImageFormat } from '../../../@types/images';
import { DeliveryTimeType, ProviderName } from './ShippingAddress';

type Nullable<T> = T | null;

export interface OrderDetail extends OrderDetailPayInfoResponse {
  groupOrderNo: number;
  orderStatus: OrderStatusType;
  paymentCompletedAt: string;
  ordererName: string;
  isSelfCancelable: boolean;
  receiver: Receiver;
  orders: Order[];
  joinOrderMeta: JoinOrderDetailMeta | null;
  deliverySummary: DeliverySummary | null;
  pickupOrderMeta: PickupOrderMeta | null;
}

export interface OrderDetailPayInfoResponse {
  receipt?: Receipt;
  totalPaymentPrice: number;
  deliveryPrice: number;
  deliveryCompletedImageUrl: string | null;
  totalRefundedPrice: number;
  totalRefundRequestedPrice: number;
  totalRemainPaymentPrice: number;
  totalUsedFreePoint: number;
  // TODO: totalUsedPaidPoint는 아직 지원하지 않습니다. 추후 지원시 로직 검토 필요합니다.
  totalUsedPaidPoint: number;
  totalCouponDiscountPrice: number;
  totalDealProductPrice: number;
  totalDealProductDiscountPrice: number;
  totalDisplayProductsPrice: number;
  totalDisplayProductsDiscountPrice: number;
  paymentMethod: PaymentMethod;
  paymentGatewayId: PaymentVendorCode;
  paymentGatewayIdDisplayName: string;
  totalAccruedPoint: number;
  totalCardInstantDiscountPrice: number;
}

export interface Order {
  orderNo: number;
  partnerName: string;
  partnerId: string;
  businessType: BusinessType;
  deliveryPolicy: Nullable<DeliveryTimeType>;
  packingType: Nullable<ReusablePackageType>;
  dealProducts: DealProduct[];
  invoices: Invoice[];
}

export interface DealProduct {
  dealProductNo: number;
  dealProductName: string;
  contentsProductNo: number;
  contentsProductName: string;
  quantity: number;
  price: number;
  discountPrice: number;
  displayPrice: number;
  displayDiscountPrice: number;
  paymentPrice: number;
  status: OrderStatusType;
  isGiveawayProduct: boolean;
  imageUrl: string;
  productVerticalSmallUrl: string;
  reviewStatusType: ReviewStatusType;
  invoice: Nullable<DealInvoice>;
}

export interface DealInvoice {
  invoiceNo: string;
  extraCourierCode: string;
}

export interface Invoice {
  no: string;
  packingType: Nullable<PackingType>;
  courier: ProviderName;
  deliveryStatus: DeliveryState;
  trackingUrl: string;
}

export interface Receiver {
  name: string;
  phoneNumber: string;
  accessMethod: Nullable<FrontDoorMethodType>;
  accessDetail: Nullable<string>;
  pickupType: Nullable<ReceivePlaceType>;
  pickupDetail: Nullable<string>;
  deliveryMessageTimeType: Nullable<DeliveryCompleteType>;
  memo: Nullable<string>;
  address: Address;
}

export interface Address {
  address: string;
  addressDetail: string;
  zipcode: string;
}

export interface JoinOrderDetailMeta {
  code: string;
  requiredPeopleCount: number;
  joinedPeopleCount: number;
  startDate: string;
  endDate: string;
  status: string;
  type: JoinOrderType;
  joinOrderShareLink: string;
}

export enum PickupStatus {
  PROGRESS = 'PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  IMPOSSIBLE = 'IMPOSSIBLE',
}

export type PickupStatusType = keyof typeof PickupStatus;

export const PickupStrategy = {
  COMMON: 'COMMON',
  QR: 'QR',
} as const;

export type PickupStrategyType = typeof PickupStrategy[keyof typeof PickupStrategy];

export interface PickupOrderMeta {
  partnerName: string;
  pickupShopName: string;
  pickupShopPhoneNumber: string;
  pickupShopPlace: string;
  pickupShopUrl: string;
  pickupStatus: PickupStatusType;
  pickupStrategy: PickupStrategyType;
  closeWeekend: boolean;
  specialInformation: string;
  qrImage: string;
  qrImageType: ImageFormat;
  startDate: string;
  endDate: string;
  latitude: number;
  longitude: number;
}
