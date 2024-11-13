import { CalculatedPrice } from '../../../../shared/interfaces';
import { isUseAllCoupon } from './isUseAllCoupon';

/**
 * 100원 미만 결제 불가능하면 true 를 반환합니다. (PG 사에서 100원 미만 결제 불가능)
 * @param { CalculatedPrice } price 가격
 * @param { boolean } isUseAllPoint 전액적립금 사용 여부
 * @param { boolean } isLuckyBoxOrder 럭키박스 단건 주문 여부
 * @return { boolean } 100원 미만 결제가 불가능하면 true 를 반환합니다.
 */
export const isLimitedPriceCondition = ({
  price,
  isUseAllPoint,
  isLuckyBoxOrder,
}: {
  price: CalculatedPrice;
  isUseAllPoint: boolean;
  isLuckyBoxOrder: boolean;
}) => {
  const { paymentPrice } = price;

  if (paymentPrice > 99) {
    return false;
  }

  if (isLuckyBoxOrder && paymentPrice === 0) {
    return false;
  }

  if (isUseAllPoint) {
    return false;
  }

  if (isUseAllCoupon(price) && paymentPrice === 0) {
    return false;
  }

  return true;
};
