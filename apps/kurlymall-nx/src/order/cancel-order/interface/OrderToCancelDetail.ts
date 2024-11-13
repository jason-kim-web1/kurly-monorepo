export interface OrderToCancelDetail {
  totalPaymentPrice: number;
  deliveryPrice: number;
  totalUsedFreePoint: number;
  totalUsedPaidPoint: number;
  totalCouponDiscountPrice: number;
  totalCardInstantDiscountPrice: number;
  totalDealProductPrice: number;
  totalDealProductDiscountPrice: number;
  totalDisplayProductsPrice: number;
  totalDisplayProductsDiscountPrice: number;
  totalAccruedPoint: number;
  dealProducts: {
    dealProductNo: number;
    dealProductName: string;
    contentsProductNo: number;
    contentsProductName: string;
  }[];
}
