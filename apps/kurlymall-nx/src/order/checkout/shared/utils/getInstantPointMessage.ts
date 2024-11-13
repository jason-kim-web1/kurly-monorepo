import { validateCouponCalculate, validateProductPrice, validateWithCoupon } from './validatePLCCPoint';
import { CheckoutCoupon, CheckoutProductItem } from '../../../../shared/interfaces';

export const getInstantPointMessage = ({
  products,
  coupon,
  plccDiscountPrice,
  selectedPlccPoint,
}: {
  products?: CheckoutProductItem[];
  coupon?: CheckoutCoupon;
  plccDiscountPrice: number;
  selectedPlccPoint?: boolean;
}) => {
  // 최소 금액 검증
  const validatePrice = validateProductPrice({ plccDiscountPrice, products });
  if (!validatePrice) {
    return '쿠폰 적용 후 상품 금액이 첫 결제 할인 기준 금액보다 큰 경우에만 사용할 수 있습니다.\n(주류 상품은 할인 대상에서 제외됩니다.)';
  }

  // 쿠폰검증
  const validateCoupon = validateWithCoupon({
    coupon,
  });
  if (!validateCoupon) {
    return '선택하신 쿠폰할인과 중복 할인이 불가능 합니다. 쿠폰 해제 후 카드 혜택 할인을 선택해주세요';
  }

  // 금액검증
  const validatePlccCaluclate = validateCouponCalculate({
    plccDiscountPrice,
    products,
    coupon,
  });
  if (!validatePlccCaluclate) {
    // 즉시할인 사용중 쿠폰 가능여부로 기준을 계산하기 때문에 메시지가 다름
    if (selectedPlccPoint) {
      return '상품금액이 쿠폰 할인 기준 금액보다 큰 경우에만 사용할 수 있습니다.';
    }
    return '쿠폰 적용 후 상품 금액이 첫 결제 할인 기준 금액보다 큰 경우에만 사용할 수 있습니다.\n(주류 상품은 할인 대상에서 제외됩니다.)';
  }
};
