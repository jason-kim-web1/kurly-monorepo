import { isUseAllCoupon } from './isUseAllCoupon';

describe('isUseAllCoupon Test', () => {
  context('쿠폰 할인 금액이 결제금액보다 작으면', () => {
    given('price', () => ({
      totalPrice: 10000,
      discountPrice: 0,
      expectedPoint: 0,
      deliveryPrice: 3000,
      couponDiscountPrice: 1000,
      paymentPrice: 12000,
    }));

    it('false 를 반환한다.', () => {
      const result = isUseAllCoupon(given.price);

      expect(result).toBeFalsy();
    });
  });

  context('쿠폰 할인 금액이 결제금액과 같으면', () => {
    given('price', () => ({
      totalPrice: 10000,
      discountPrice: 0,
      expectedPoint: 0,
      deliveryPrice: 3000,
      couponDiscountPrice: 10000,
      paymentPrice: 3000,
    }));

    it('true 를 반환한다.', () => {
      const result = isUseAllCoupon(given.price);

      expect(result).toBeTruthy();
    });
  });
});
