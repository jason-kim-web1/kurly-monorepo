import { format } from 'date-fns';

import roundToNearestMinutes from 'date-fns/fp/roundToNearestMinutes';

import { head, isEmpty } from 'lodash';

import { CouponBanner } from './CouponBanner';
import { ProductCouponBannerExtraInfo, CouponBannerType, ProductCouponBanner } from './types';
import { addComma } from '../../../src/shared/services';
import { CartVendorName, PaymentVendorName } from '../../../src/shared/constant/payment-method';

const formatCouponEndDateTime = (dateTime: string) => {
  const date = new Date(dateTime);
  const test = roundToNearestMinutes(date);
  return format(test, 'yyyy년 MM월 dd일 HH시까지');
};

export default class DownloadableCouponBanner extends CouponBanner {
  private readonly _accessKey: string;

  private readonly _couponMeta: ProductCouponBanner;

  constructor(type: CouponBannerType, bannerName: string, accessKey: string, couponMeta: ProductCouponBanner) {
    super(type, bannerName);
    this._accessKey = accessKey;
    this._couponMeta = couponMeta;
  }

  get accessKey(): string {
    return this._accessKey;
  }

  get bannerLink(): null {
    return null;
  }

  get couponExtraInfo(): ProductCouponBannerExtraInfo {
    const { benefitType, benefitValue, name } = this._couponMeta;

    return {
      couponName: name,
      discountPercentage: benefitType === 'PERCENT_DISCOUNT' ? Number(benefitValue) : null,
      discountPrice: benefitType === 'PRICE_DISCOUNT' ? Number(benefitValue) : null,
      benefitText: benefitType === 'FREE_SHIPPING' ? '무료배송' : null,
      expirationText: this.getExpirationText(),
      discountBenefit: this.buildConditionalDiscountPriceText(),
      specificBenefits: [
        this.creditCartBenefitText,
        this.paymentBenefitText,
        this.limitedProductCategoryOnly,
        this.disallowDiscountedProductText,
        this.disallowSomeProductText,
      ].filter((text) => !isEmpty(text)),
    };
  }

  private getExpirationText() {
    const { infinite, endDateTime } = this._couponMeta.effectivePeriod;
    return infinite ? '기간제한 없음' : formatCouponEndDateTime(endDateTime);
  }

  private buildBenefitAmountText(): string {
    const { minimumOrderPrice, minimumOrderAmount } = this._couponMeta;

    const postfix = '이상 주문 시';

    if (minimumOrderPrice > 0) {
      return `${minimumOrderPrice}원 ${postfix}`;
    }

    if (minimumOrderAmount > 1) {
      return `${minimumOrderAmount}개 ${postfix}`;
    }

    return '';
  }

  private buildConditionalDiscountPriceText(): string {
    const { minimumOrderPrice, minimumOrderAmount, maximumDiscountPrice } = this._couponMeta;

    if (maximumDiscountPrice <= 0) {
      return '';
    }

    const discountText = `최대 ${addComma(maximumDiscountPrice)}원 할인`;

    if (minimumOrderAmount <= 1 && minimumOrderPrice <= 0) {
      return discountText;
    }

    const benefitAmountText = this.buildBenefitAmountText();

    return `${benefitAmountText} ${discountText}`.trim();
  }

  private get limitedProductCategoryOnly(): string {
    const { hurdleType, allowedProducts, allowedCategories } = this._couponMeta;

    if (
      hurdleType === 'ALLOWED_CATEGORY' ||
      hurdleType === 'ALLOWED_PRODUCT' ||
      !isEmpty(allowedProducts) ||
      !isEmpty(allowedCategories)
    ) {
      return '특정상품 한정';
    }

    return '';
  }

  private get disallowDiscountedProductText(): string {
    const { allowDiscountedProducts } = this._couponMeta;

    return allowDiscountedProducts ? '' : '할인상품 제외';
  }

  private get disallowSomeProductText(): string {
    const { disallowedProducts, disallowedCategories } = this._couponMeta;

    if (!isEmpty(disallowedProducts) || !isEmpty(disallowedCategories)) {
      return '일부 상품 제외';
    }

    return '';
  }

  private get paymentBenefitText(): string {
    const { hurdleType, paymentGateways, creditCardId } = this._couponMeta;

    // 카드결제 혜택이 있으면 다른 결제 혜택은 보여주지 않는다.
    if (hurdleType !== 'PAYMENT_METHOD' || creditCardId) {
      return '';
    }

    const paymentGateway = head(paymentGateways);

    if (!paymentGateway) {
      return '';
    }

    const paymentMethodText = PaymentVendorName[paymentGateway];

    return `${paymentMethodText} 결제시`;
  }

  private get creditCartBenefitText(): string {
    const { hurdleType, creditCardId } = this._couponMeta;

    if (hurdleType !== 'PAYMENT_METHOD' || !creditCardId) {
      return '';
    }

    const creditCartVendor = CartVendorName[creditCardId];

    return `${creditCartVendor}카드 결제시`;
  }
}
