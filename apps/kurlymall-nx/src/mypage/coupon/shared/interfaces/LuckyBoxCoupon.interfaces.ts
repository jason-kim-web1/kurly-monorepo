export interface LuckyBoxCoupon {
  voucherType: string;
  dealProductName: string;
  dealProductNo: number;
  expireDate: string;
  isExpired: boolean;
  minimumPrice: number;
  used: boolean;
  voucherId: number;
  voucherName: string;
}
