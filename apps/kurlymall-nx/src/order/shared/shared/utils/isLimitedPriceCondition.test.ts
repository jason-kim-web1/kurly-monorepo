import { isLimitedPriceCondition } from './isLimitedPriceCondition';

describe('isLimitedPriceCondition Test', () => {
  context('100원 초과 결제이면', () => {
    given('price', () => ({
      totalPrice: 10000,
      discountPrice: 0,
      expectedPoint: 0,
      deliveryPrice: 3000,
      couponDiscountPrice: 0,
      paymentPrice: 13000,
    }));
    given('isUseAllPoint', () => false);
    given('isLuckyBoxOrder', () => false);

    it('false 를 반환한다.', () => {
      const result = isLimitedPriceCondition({
        price: given.price,
        isUseAllPoint: given.isUseAllPoint,
        isLuckyBoxOrder: given.isLuckyBoxOrder,
      });

      expect(result).toBeFalsy();
    });
  });

  describe('100원 미만 결제', () => {
    context('럭키박스 단건 결제이면', () => {
      given('price', () => ({
        totalPrice: 0,
        discountPrice: 0,
        expectedPoint: 0,
        deliveryPrice: 0,
        couponDiscountPrice: 0,
        paymentPrice: 0,
      }));
      given('isLuckyBoxOrder', () => true);

      it('false 를 반환한다.', () => {
        const result = isLimitedPriceCondition({
          price: given.price,
          isUseAllPoint: given.isUseAllPoint,
          isLuckyBoxOrder: given.isLuckyBoxOrder,
        });

        expect(result).toBeFalsy();
      });
    });

    context('전액 적립금 결제이면', () => {
      given('price', () => ({
        totalPrice: 10000,
        discountPrice: 0,
        expectedPoint: 0,
        deliveryPrice: 3000,
        couponDiscountPrice: 0,
        paymentPrice: 0,
      }));
      given('isUseAllPoint', () => true);
      given('isLuckyBoxOrder', () => false);

      it('false 를 반환한다.', () => {
        const result = isLimitedPriceCondition({
          price: given.price,
          isUseAllPoint: given.isUseAllPoint,
          isLuckyBoxOrder: given.isLuckyBoxOrder,
        });

        expect(result).toBeFalsy();
      });
    });

    context('전액 쿠폰 결제이면', () => {
      given('price', () => ({
        totalPrice: 10000,
        discountPrice: 0,
        expectedPoint: 0,
        deliveryPrice: 0,
        couponDiscountPrice: 10000,
        paymentPrice: 0,
      }));
      given('isUseAllPoint', () => false);
      given('isLuckyBoxOrder', () => false);

      it('false 를 반환한다.', () => {
        const result = isLimitedPriceCondition({
          price: given.price,
          isUseAllPoint: given.isUseAllPoint,
          isLuckyBoxOrder: given.isLuckyBoxOrder,
        });

        expect(result).toBeFalsy();
      });
    });

    context('둘다 아니면', () => {
      given('price', () => ({
        totalPrice: 10000,
        discountPrice: 0,
        expectedPoint: 0,
        deliveryPrice: 3000,
        couponDiscountPrice: 12950,
        paymentPrice: 50,
      }));
      given('isUseAllPoint', () => false);
      given('isLuckyBoxOrder', () => false);

      it('true 를 반환한다.', () => {
        const result = isLimitedPriceCondition({
          price: given.price,
          isUseAllPoint: given.isUseAllPoint,
          isLuckyBoxOrder: given.isLuckyBoxOrder,
        });

        expect(result).toBeTruthy();
      });
    });
  });
});
