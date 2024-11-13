import { PaymentMethod, PaymentVendorCode } from '../../../shared/constant';
import { DeliveryGroups } from '../../common/interface/DeliveryGroup';
import { Receipt } from '../../common/interface/Receipt';
import { AccessMethod } from '../../common/constants/AccessMethod';
import { PickupType } from '../../common/constants/PickupType';
import { DeliveryMessageTimeType } from '../../common/constants/DeliveryMessageTimeType';
import { PickupOrderMeta } from '../../common/interface/PickupOrderMeta';
import { JoinOrderMeta } from '../../common/interface/JoinOrderMeta';
import { ReceiverPackingType } from '../../common/constants/ReceiverPackingType';

export interface Address {
  address: string;
  addressDetail: string;
  zipcode: string;
}

interface Receiver {
  name: string;
  phoneNumber: string;
  accessMethod: AccessMethod;
  accessDetail: string;
  packingType: ReceiverPackingType;
  pickupType: PickupType;
  pickupDetail: string;
  deliveryMessageTimeType: DeliveryMessageTimeType;
  memo: string;
  address: Address;
}

interface Payment {
  totalPaymentPrice: number;
  deliveryPrice: number;
  totalRefundedPrice: number;
  totalRefundRequestedPrice: number;
  totalRemainPaymentPrice: number;
  totalUsedFreePoint: number;
  totalUsedPaidPoint: number;
  totalCouponDiscountPrice: number;
  totalCardInstantDiscountPrice: number;
  totalDealProductPrice: number;
  totalDealProductDiscountPrice: number;
  totalDisplayProductsPrice: number;
  totalDisplayProductsDiscountPrice: number;
  paymentMethod: PaymentMethod;
  paymentGatewayId: PaymentVendorCode;
  paymentGatewayIdDisplayName: string;
  cardBillRedirectUrl: string;
  totalAccruedPoint: number;
}

export interface OrderDetail {
  groupOrderNo: number;
  paymentCompletedAt: string;
  ordererName: string;
  payment: Payment;
  receiver: Receiver;
  deliveryGroups: DeliveryGroups;
  isSelfCancelable: boolean;
  joinOrderMeta: JoinOrderMeta | null;
  pickupOrderMeta: PickupOrderMeta | null;
  receipt: Receipt;
}
