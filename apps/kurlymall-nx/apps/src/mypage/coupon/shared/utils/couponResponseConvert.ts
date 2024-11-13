import { LuckyBoxCoupon } from '../interfaces/LuckyBoxCoupon.interfaces';
import {
  CategoryType,
  CategoryTypeResponse,
  Coupon,
  CouponDetail,
  CouponDetailRespons,
  CouponResponse,
  DisplayCategories,
  DisplayCategoriesResponse,
  DisplayProducts,
  DisplayProductsResponse,
} from '../interfaces/Coupon.interfaces';

export const convertLuckyBoxCoupon = ({
  voucherType,
  voucherId,
  voucherName,
  expireDate,
  used,
  dealProductName,
  isExpired,
}: LuckyBoxCoupon): Coupon => ({
  luckyBoxCouponCode: voucherType,
  ids: [voucherId],
  name: voucherName,
  effectivePeriod: {
    endAt: expireDate,
  },
  used: used,
  target: {
    allowedProducts: [
      {
        name: dealProductName,
      },
    ],
  },
  benefitInfo: {
    type: 'PRICE_DISCOUNT',
    value: 0,
  },
  isExpired: isExpired,
});

export const convertDisplayProduct = (data: DisplayProductsResponse[]): DisplayProducts[] => {
  return data
    ? data.map((product) => ({
        contentsProductNo: product.contents_product_no,
        dealProductNo: product.deal_product_no,
        dealProductName: product.deal_product_name,
        siteAttributes: product.site_attributes,
      }))
    : [];
};

export const convertDisplayCategories = (data: DisplayCategoriesResponse[]): DisplayCategories[] => {
  return data
    ? data.map((category) => ({
        code: category.code,
        name: category.name,
        siteKey: category.site_key,
        status: category.status,
      }))
    : [];
};

export const convertCategories = (data: CategoryTypeResponse[]): CategoryType[] => {
  return data
    ? data.map((category) => ({
        code: category.code,
        name: category.name,
        subCategory: category.sub_category,
      }))
    : [];
};

export const convertCouponData = (data: CouponResponse): Coupon => ({
  ids: data.ids,
  name: data.name,
  description: data.description,
  benefitInfo: {
    type: data.benefit.benefit_type,
    value: data.benefit.value,
    maximumDiscountPrice: data.benefit.maximum_discount_price,
  },
  effectivePeriod: {
    endAt: data.effective_period.end_at,
    startAt: data.effective_period.start_at,
  },
  used: data.used,
  usedAt: data.used_at,
  issuedAt: data.issued_at,
  target: {
    scope: data.target.target_scope,
    allowedProducts: data.target.allowed_products,
    disallowedProducts: data.target.disallowed_products,
    allowedCategories: convertCategories(data.target.allowed_categories),
    disallowedCategories: convertCategories(data.target.disallowed_categories),
    disallowDiscountedProducts: data.target.disallow_discounted_products,
    salesOwner: data.target.sales_owner,
    siteType: data.target.site_type,
  },
  hurdle: data.hurdle && {
    type: data.hurdle.hurdle_type,
    price: data.hurdle.price,
    quantity: data.hurdle.quantity,
    paymentGateways: data.hurdle.payment_gateway,
    creditCardId: data.hurdle.credit_card_id,
    allowedProducts: data.hurdle.allowed_products,
    disallowedProducts: data.hurdle.disallowed_products,
    allowedCategories: convertCategories(data.target.allowed_categories),
    disallowedCategories: convertCategories(data.target.disallowed_categories),
    isOnlyApp: data.hurdle.only_app,
  },
});

export const convertCouponDetail = (data: CouponDetailRespons): CouponDetail => ({
  id: data.id,
  name: data.name,
  description: data.description,
  benefitInfo: {
    type: data.benefit.benefit_type,
    value: data.benefit.value,
    maximumDiscountPrice: data.benefit.maximum_discount_price,
  },
  effectivePeriod: {
    endAt: data.effective_period.end_at,
    startAt: data.effective_period.start_at,
  },
  used: data.used,
  usedAt: data.used_at,
  issuedAt: data.issued_at,
  target: {
    scope: data.target.target_scope,
    allowedProducts: data.target.allowed_products,
    disallowedProducts: data.target.disallowed_products,
    allowedCategories: convertCategories(data.target.allowed_categories),
    disallowedCategories: convertCategories(data.target.disallowed_categories),
    disallowDiscountedProducts: data.target.disallow_discounted_products,
    salesOwner: data.target.sales_owner,
    siteType: data.target.site_type,
  },
  hurdle: data.hurdle && {
    type: data.hurdle.hurdle_type,
    price: data.hurdle.price,
    quantity: data.hurdle.quantity,
    paymentGateways: data.hurdle.payment_gateway,
    creditCardId: data.hurdle.credit_card_id,
    allowedProducts: data.hurdle.allowed_products,
    disallowedProducts: data.hurdle.disallowed_products,
    allowedCategories: convertCategories(data.hurdle.allowed_categories),
    disallowedCategories: convertCategories(data.hurdle.disallowed_categories),
    isOnlyApp: data.hurdle.only_app,
  },
  displayTarget: {
    allowedProducts: convertDisplayProduct(data.display_target.allowed_products),
    disallowedProducts: convertDisplayProduct(data.display_target.disallowed_products),
    allowedCategories: convertDisplayCategories(data.display_target.allowed_categories),
    disallowedCategories: convertDisplayCategories(data.display_target.disallowed_categories),
  },
  displayHurdle: {
    allowedProducts: convertDisplayProduct(data.display_hurdle.allowed_products),
    disallowedProducts: convertDisplayProduct(data.display_hurdle.disallowed_products),
    allowedCategories: convertDisplayCategories(data.display_hurdle.allowed_categories),
    disallowedCategories: convertDisplayCategories(data.display_hurdle.disallowed_categories),
  },
});
