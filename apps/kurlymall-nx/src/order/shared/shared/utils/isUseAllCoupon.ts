import { CalculatedPrice } from '../../../../shared/interfaces';

/**
 * @param { CalculatedPrice } price 가격
 * @return { boolean } 상품금액 전액 쿠폰결제이면 true 를 반환합니다.
 */
export const isUseAllCoupon = ({ totalPrice, couponDiscountPrice }: CalculatedPrice) => {
  return couponDiscountPrice === totalPrice;
};
