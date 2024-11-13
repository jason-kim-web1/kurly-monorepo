import { CardVendorCode, PaymentVendorCode } from '../../../../shared/constant';

import { BenefitType, SalesOwnerType, TargetSiteType } from '../../../../shared/interfaces';

export interface Coupon {
  ids: number[];
  name: string;
  description?: string;
  benefitInfo: BenefitInfoType;
  effectivePeriod: EffectivePeriodType;
  used: boolean;
  usedAt?: string;
  issuedAt?: string;
  target: TargetType;
  hurdle?: HurdleType;
  luckyBoxCouponCode?: string;
  isExpired?: boolean;
}

export interface BenefitInfoType {
  type: BenefitType;
  value?: number;
  maximumDiscountPrice?: number;
}

export interface EffectivePeriodType {
  endAt: string;
  startAt?: string;
}

export interface TargetType {
  scope?: string;
  allowedProducts: ProductsType[];
  disallowedProducts?: ProductsType[];
  allowedCategories?: CategoryType[];
  disallowedCategories?: CategoryType[];
  disallowDiscountedProducts?: boolean;
  salesOwner?: SalesOwnerType;
  siteType?: string;
}

export interface HurdleType {
  type: string;
  price: number;
  quantity: number;
  paymentGateways?: PaymentVendorCode;
  creditCardId: CardVendorCode;
  allowedProducts?: ProductsType[];
  disallowedProducts?: ProductsType[];
  allowedCategories?: CategoryType[];
  disallowedCategories?: CategoryType[];
  isOnlyApp?: boolean;
}

export interface ProductsType {
  productNo?: number;
  name: string;
}

export interface SubCategory {
  code?: number;
  name: string;
}

export interface CategoryType {
  code: string;
  name: string;
  subCategory: SubCategory;
}

export interface CouponResponse {
  ids: number[];
  name: string;
  description?: string;
  benefit: BenefitResponse;
  effective_period: EffectivePeriodResponse;
  used: boolean;
  used_at: string;
  issued_at: string;
  target: TargetResponse;
  hurdle: HurdleResponse;
}

export interface BenefitResponse {
  benefit_type: BenefitType;
  value: number;
  maximum_discount_price: number;
}

export interface EffectivePeriodResponse {
  start_at: string;
  end_at: string;
}

export interface CategoryTypeResponse {
  code: string;
  name: string;
  sub_category: SubCategory;
}

export interface TargetResponse {
  target_scope: string;
  allowed_products: ProductsType[];
  disallowed_products: ProductsType[];
  allowed_categories: CategoryTypeResponse[];
  disallowed_categories: CategoryTypeResponse[];
  disallow_discounted_products: boolean;
  sales_owner: SalesOwnerType;
  site_type: TargetSiteType;
}

export interface HurdleResponse {
  hurdle_type: string;
  price: number;
  quantity: number;
  payment_gateway: PaymentVendorCode;
  credit_card_id: CardVendorCode;
  allowed_products: ProductsType[];
  disallowed_products: ProductsType[];
  allowed_categories: CategoryTypeResponse[];
  disallowed_categories: CategoryTypeResponse[];
  only_app: boolean;
}

// 쿠폰 상세 조회
export interface CouponDetail {
  id: number;
  name: string;
  description: string;
  benefitInfo: BenefitInfoType;
  effectivePeriod: EffectivePeriodType;
  used: boolean;
  usedAt: string;
  issuedAt: string;
  target: TargetType;
  hurdle: HurdleType;
  displayTarget: DisplayType;
  displayHurdle: DisplayType;
}

export interface DisplayProducts {
  contentsProductNo: string;
  dealProductNo: string;
  dealProductName: string;
  siteAttributes: string[];
}

export interface DisplayCategories {
  code: string;
  name: string;
  siteKey: string;
  status: boolean;
}

export interface DisplayType {
  allowedProducts: DisplayProducts[];
  disallowedProducts: DisplayProducts[];
  allowedCategories: DisplayCategories[];
  disallowedCategories: DisplayCategories[];
}

export interface CouponDetailRespons {
  id: number;
  name: string;
  description: string;
  benefit: BenefitResponse;
  effective_period: EffectivePeriodResponse;
  used: boolean;
  issued_at: string;
  used_at: string;
  target: TargetResponse;
  hurdle: HurdleResponse;
  display_target: DisplayResponse;
  display_hurdle: DisplayResponse;
}

export interface DisplayProductsResponse {
  contents_product_no: string;
  deal_product_no: string;
  deal_product_name: string;
  site_attributes: string[];
}

export interface DisplayCategoriesResponse {
  code: string;
  name: string;
  site_key: string;
  status: boolean;
}

export interface DisplayResponse {
  allowed_products: DisplayProductsResponse[];
  disallowed_products: DisplayProductsResponse[];
  allowed_categories: DisplayCategoriesResponse[];
  disallowed_categories: DisplayCategoriesResponse[];
}
