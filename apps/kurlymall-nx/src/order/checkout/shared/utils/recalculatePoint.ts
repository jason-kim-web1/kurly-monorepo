import { AvailablePoint, CheckoutCoupon } from '../../../../shared/interfaces';
import { originalTotalPrice } from './originalTotalPrice';

interface Params {
  price: {
    totalPrice: number;
    deliveryPrice: number;
    discountPrice: number;
    couponDiscountPrice: number;
  };
  usedPoint: number;
  availablePoint: AvailablePoint;
  selectedCoupon?: CheckoutCoupon;
  selectedPlccPoint?: boolean;
  hasKurlypayError?: boolean;
  isLiquidity?: boolean;
}

export const recalculatePoint = ({
  price,
  usedPoint,
  selectedCoupon,
  selectedPlccPoint,
  hasKurlypayError = false,
  isLiquidity = false,
  availablePoint: { free, paid },
}: Params) => {
  // 쿠폰을 선택했으나, 포인트를 사용할 수 없는 쿠폰일 경우
  if (selectedCoupon && selectedCoupon.paymentGateways[0] !== 'ALL') {
    return 0;
  }

  // 즉시할인 (PLCC) 포인트를 사용 한 경우
  if (selectedPlccPoint) {
    return 0;
  }

  // 컬리페이 간편결제 장애 & 환금성 상품 주문
  if (hasKurlypayError && isLiquidity) {
    return 0;
  }

  // 결제해야하는 금액
  const originalTotal = originalTotalPrice({ price });

  // 사용가능한 적립금+컬리캐시: 컬리페이 점검시에는 적립금만 사용 가능
  let totalAvailablePoint = free + paid;
  if (hasKurlypayError) {
    totalAvailablePoint = free;
  }

  if (isLiquidity) {
    totalAvailablePoint = paid;
  }

  const compare = totalAvailablePoint <= originalTotal ? totalAvailablePoint : originalTotal;

  return compare - usedPoint <= 0 ? compare : usedPoint;
};
