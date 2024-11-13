import { CardVendorCode, PaymentVendorCode } from '../../../src/shared/constant/payment-method';

export type CouponBannerType = 'DIRECT' | 'DOWNLOAD_COUPON';

export type CouponBannerHurdleType =
  | 'ORDERED_PRODUCT'
  | 'TARGET_PRODUCT'
  | 'ALLOWED_PRODUCT'
  | 'ALLOWED_CATEGORY'
  | 'PAYMENT_METHOD';

export type CouponBannerBenefitType = 'PRICE_DISCOUNT' | 'PERCENT_DISCOUNT' | 'FREE_SHIPPING';

export interface ProductCouponBanner {
  name: string;
  benefitType: CouponBannerBenefitType;
  benefitValue: number | string;
  minimumOrderAmount: number;
  minimumOrderPrice: number;
  allowDiscountedProducts: boolean;
  hurdleType: CouponBannerHurdleType;
  paymentGateways: PaymentVendorCode[] | null;
  creditCardId: CardVendorCode | null;
  effectivePeriod: {
    startDateTime: string;
    endDateTime: string;
    infinite: boolean;
  };
  maximumDiscountPrice: number;
  allowedProducts: {
    code: string;
    name: string;
  }[];
  allowedCategories: number[];
  disallowedProducts: number[];
  disallowedCategories: number[];
}

export interface ProductCouponBannerExtraInfo {
  couponName: string;
  discountPercentage: number | null;
  discountPrice: number | null;
  benefitText: string | null;
  expirationText: string;
  discountBenefit: string;
  specificBenefits: string[];
}
