import { DeliveryState } from '../constants/DeliveryState';
import { OrderStatus } from '../constants/OrderStatus';
import { PackingType } from '../constants/PackingType';
import { ProviderName } from '../constants/ProviderName';
import { ReviewStatus } from '../constants/ReviewStatus';
import { DealProducts } from './DealProduct';

export type DeliveryPolicy =
  | '샛별배송'
  | '하루배송'
  | '판매자배송'
  | '미식딜리버리'
  | '설치배송'
  | '온라인교환권'
  | '항공권'
  | '셀프픽업'
  | '퀵배송'
  | '컬리나우'
  | '해외직배송';

export interface Invoice {
  no: string;
  packingType: PackingType;
  courier: ProviderName;
  deliveryStatus: DeliveryState;
  trackingUrl: string;
}

export type Invoices = Invoice[];

export interface DeliveryGroup {
  orderNos: number[];
  deliveryPolicy: DeliveryPolicy;
  partnerName: string;
  deliveryMessage: string;
  orderStatus: OrderStatus;
  deliveryCompletedImageUrl: string | null;
  dealProducts: DealProducts;
  isSelfCancelable: boolean;
  invoices: Invoices;
  reviewStatusType: ReviewStatus;
}

export type DeliveryGroups = DeliveryGroup[];
