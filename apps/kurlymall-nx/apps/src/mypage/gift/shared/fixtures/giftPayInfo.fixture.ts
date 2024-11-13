import { GiftDetailPayment } from '../../../../shared/interfaces';

export const giftPayInfoFixture: GiftDetailPayment = {
  method: 'credit_card',
  totalDisplayProductsPrice: 61890,
  totalDisplayProductsDiscountPrice: 10350,
  totalCouponDiscountPrice: 4000,
  totalUsedPoint: 21731,
  totalUsedFreePoint: 21731,
  totalUsedPaidPoint: 0,
  totalPaymentPrice: 25809,
  totalAccruedPoint: 1000,
  paymentGatewayId: 'payco',
  paymentGatewayIdDisplayName: '페이코',
  deliveryPrice: 3000,
  totalRefundedPrice: 0,
  totalRefundRequestedPrice: 0,
  totalRemainPaymentPrice: 25809,
  paymentCompletedAt: '2022-01-25T13:26:28+09:00',
  totalCardInstantDiscountPrice: 0,
};
