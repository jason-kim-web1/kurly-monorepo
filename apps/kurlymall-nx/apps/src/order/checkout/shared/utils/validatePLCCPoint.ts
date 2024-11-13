import { isEmpty } from 'lodash';

import { Benefit, CheckoutCoupon, CheckoutProductItem, KurlypayVendor } from '../../../../shared/interfaces';
import { PaymentVendor } from '../../../shared/shared/interfaces';
import { isKurlycard, isKurlypayVendor } from '../../../shared/shared/services';
import { CardVenderCode } from '../../../../shared/constant';

const MINIMUM_PRICE = 1000;

export const getProductPrice = (products: CheckoutProductItem[]) => {
  const nonAlcoholDealProducts = products.filter((product) => !product.isAlcoholDealProduct);
  return nonAlcoholDealProducts.reduce((acc, cur) => {
    return acc + (cur.price - cur.discountedPrice) * cur.quantity;
  }, 0);
};

// 1p+3pl 합주문시, 주류(3pl) 제외한 금액이 31,000원 이상 인지 확인
export const validateProductPrice = ({
  products,
  plccDiscountPrice,
}: {
  products?: CheckoutProductItem[];
  plccDiscountPrice: number;
}) => {
  if (plccDiscountPrice <= 0 || !products) {
    return false;
  }
  return getProductPrice(products) >= plccDiscountPrice + MINIMUM_PRICE;
};

export const validateAvailablePLCCPoint = ({
  products,
  isJoinOrder,
  plccDiscountPrice,
}: {
  products?: CheckoutProductItem[];
  isJoinOrder: boolean;
  plccDiscountPrice: number;
}) => {
  if (!products || isJoinOrder) {
    return false;
  }

  // 주류 상품외에도 구매하는지 확인
  const nonAlcoholDealProducts = products.filter((product) => !product.isAlcoholDealProduct);

  return !isEmpty(nonAlcoholDealProducts) && plccDiscountPrice > 0;
};

/**
 * BC카드, 카드할인 아닌 쿠폰 경우 사용 제외
 * @param paymentVendor 결제수단
 * @param kurlypayVendor 컬리페이 결제수단
 * @param coupon 선택한 쿠폰
 */
export const validateWithCoupon = ({
  paymentVendor,
  kurlypayVendor,
  coupon,
}: {
  paymentVendor?: PaymentVendor;
  kurlypayVendor?: KurlypayVendor;
  coupon?: CheckoutCoupon;
}) => {
  if (!coupon) {
    return true;
  }

  // paymentVendor 와 kurlypayVendor가 있다면, 카드 선택 여부도 검증함
  if (paymentVendor && kurlypayVendor) {
    if (!isKurlypayVendor(paymentVendor) || !isKurlycard(kurlypayVendor)) {
      return false;
    }
  }

  return coupon.creditCardId === CardVenderCode.BC_CARD || coupon.paymentGateways[0] === 'ALL';
};

// 쿠폰 선택까지 했을때 최종 할인금액이 1000원 이상인지 검증
export const validateCouponCalculate = ({
  plccDiscountPrice,
  products,
  coupon,
}: {
  plccDiscountPrice: number;
  products?: CheckoutProductItem[];
  coupon?: CheckoutCoupon;
}) => {
  // plccDiscountPrice 가 없다면, 사용된 상태로써 검증 필요 없음
  if (!plccDiscountPrice || !products) {
    return false;
  }

  return (
    getProductPrice(products) -
      plccDiscountPrice -
      (coupon && coupon.type !== Benefit.FREE_SHIPPING ? coupon.totalCouponDiscount : 0) >=
    MINIMUM_PRICE
  );
};
