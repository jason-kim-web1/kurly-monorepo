import { CheckoutCoupon } from '../../../../shared/interfaces';
import { originalTotalPrice } from './originalTotalPrice';
import { recalculatePoint } from './recalculatePoint';

describe('recalculatePoint', () => {
  const price = {
    totalPrice: 10000,
    deliveryPrice: 3000,
    discountPrice: 0,
    couponDiscountPrice: 2000,
  };

  context('쿠폰이 있으면', () => {
    const availablePoint = {
      free: 10000,
      paid: 10000,
    };

    context.each([0, 10, 100, 1000])('usedPoint가 사용가능한 적립금/컬리캐시 보다 낮거나 같을 경우', (usedPoint) => {
      it('사용가능한 적립금/컬리캐시 이하의 usedPoint을 return 한다.', () => {
        const result = recalculatePoint({ price, usedPoint, availablePoint });

        expect(result).toBe(usedPoint);
      });
    });

    context.each([20001, 30000, 40000])('usedPoint가 사용가능한 적립금/컬리캐시보다 높을 경우', (usedPoint) => {
      it('사용가능한 적립금/컬리캐시 return한다.', () => {
        const result = recalculatePoint({ price, usedPoint, availablePoint });

        const originalTotal = originalTotalPrice({ price });

        expect(result).toBe(originalTotal);
      });
    });
  });

  context('선택한 쿠폰이 특정 결제수단 한정 쿠폰이면', () => {
    const availablePoint = {
      free: 10000,
      paid: 10000,
    };
    const usedPoint = 1000;
    const selectedCoupon: CheckoutCoupon = {
      couponCode: '100188231',
      usable: true,
      totalCouponDiscount: 1485,
      name: '카카오페이 결제 할인쿠폰',
      description: '카카오페이 결제시 채소 1,000원 할인 쿠폰',
      type: 'PERCENT_DISCOUNT',
      value: 15,
      pointAllowed: false,
      paymentGateways: ['kakao-pay'],
      creditCardId: null,
      endAt: null,
    };

    it('0을 return 한다.', () => {
      const result = recalculatePoint({ price, usedPoint, availablePoint, selectedCoupon });

      expect(result).toBe(0);
    });
  });

  context('사용가능한 적립금/컬리캐시보다 상품 가격이 높고', () => {
    const availablePoint = {
      free: 500,
      paid: 500,
    };

    context.each([0, 10, 100, 1000])('usedPoint가 사용가능한 적립금/컬리캐시보다 낮거나 같을 경우', (usedPoint) => {
      it('사용가능한 적립금/컬리캐시 이하의 usedPoint을 return 한다.', () => {
        const result = recalculatePoint({ price, usedPoint, availablePoint });

        expect(result).toBe(usedPoint);
      });
    });

    context.each([1001, 2000, 3000, 10000])('usedPoint가 사용가능한 적립금/컬리캐시보다 높을 경우', (usedPoint) => {
      it('사용가능한 적립금/컬리캐시를 return한다.', () => {
        const result = recalculatePoint({ price, usedPoint, availablePoint });

        expect(result).toBe(availablePoint.free + availablePoint.paid);
      });
    });
  });

  context('사용가능한 적립금/컬리캐시보다 상품 가격이 낮고', () => {
    const availablePoint = {
      free: 10000,
      paid: 10000,
    };
    const originalTotal = originalTotalPrice({ price });

    context.each([0, 10, 100, 1000])('usedPoint가 originalTotal보다 낮거나 같을 경우', (usedPoint) => {
      it('originalTotal 이하의 usedPoint을 return 한다.', () => {
        const result = recalculatePoint({ price, usedPoint, availablePoint });

        expect(result).toBe(usedPoint);
      });
    });

    context.each([20001, 30000, 40000])('usedPoint가 originalTotal보다 높을 경우', (usedPoint) => {
      it('originalTotal를 return한다.', () => {
        const result = recalculatePoint({ price, usedPoint, availablePoint });

        expect(result).toBe(originalTotal);
      });
    });
  });

  context('컬리페이 점검중이고, 사용자가 컬리캐시를 사용할 경우', () => {
    const hasKurlypayError = true;
    const availablePoint = {
      free: 5000,
      paid: 30000,
    };
    const usedPoint = 10000;

    it('최대 사용 가능한 금액은 적립금 금액이다.', () => {
      const result = recalculatePoint({ hasKurlypayError, price, usedPoint, availablePoint });

      expect(result).toBe(availablePoint.free);
    });
  });

  context('환금성 상품일 경우', () => {
    const availablePoint = {
      free: 1000,
      paid: 2000,
    };
    const usedPoint = 5000;

    it('최대 사용 가능한 금액은 컬리캐시 금액이다.', () => {
      const result = recalculatePoint({ isLiquidity: true, price, usedPoint, availablePoint });

      expect(result).toBe(availablePoint.paid);
    });
  });
});
