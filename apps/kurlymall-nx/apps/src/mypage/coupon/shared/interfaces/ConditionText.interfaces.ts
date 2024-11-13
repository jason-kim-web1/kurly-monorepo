import { BenefitType } from '../../../../shared/interfaces';
import { CategoryType, HurdleType, ProductsType } from './Coupon.interfaces';
import { CardVendorCode, PaymentVendorCode } from '../../../../shared/constant';

export interface BenefitText {
  luckyBoxCouponCode?: string;
  benefitInfo: {
    type: BenefitType;
    value?: number;
  };
}

export interface PriceConditionText {
  hurdle?: HurdleType;
  maximumDiscountPrice?: number;
  type?: BenefitType;
}

export interface PaymentConditionText {
  hurdle?: {
    type: string;
    price: number;
    quantity: number;
    paymentGateways?: PaymentVendorCode;
    creditCardId: CardVendorCode;
    allowedProducts?: ProductsType[];
    allowedCategories?: CategoryType[];
  };
  target: {
    scope?: string;
    allowedProducts: ProductsType[];
    disallowedProducts?: ProductsType[];
    allowedCategories?: CategoryType[];
    disallowedCategories?: CategoryType[];
    disallowDiscountedProducts?: boolean;
    salesOwner?: string;
  };
}
