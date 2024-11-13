import { originalTotalPrice } from './originalTotalPrice';

describe('originalTotalPrice', () => {
  const priceWithCoupon = {
    totalPrice: 9900,
    deliveryPrice: 3000,
    discountPrice: 0,
    couponDiscountPrice: 2000,
  };

  const priceWithoutCoupon = {
    totalPrice: 9900,
    deliveryPrice: 3000,
    discountPrice: 0,
    couponDiscountPrice: 0,
  };

  it.each([priceWithCoupon, priceWithoutCoupon])('쿠폰 사용 여부를 포함한 총 결제 금액을 return 한다.', (price) => {
    const result = originalTotalPrice({ price });

    expect(result).toBe(price.totalPrice + price.deliveryPrice - price.discountPrice - price.couponDiscountPrice);
  });
});
