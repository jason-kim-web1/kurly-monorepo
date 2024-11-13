import { calculateProductPrices } from './calculateProductPrices';

// 권장 소비자가 : retailPrice
// 컬리 판매가 : productPrice

describe('calculateProductPrices - 가격 계산 테스트', () => {
  it('권장o 컬리판매o 할인x = 둘 중 높은 값을 반환 받는다.', () => {
    const retailPrice = 20000;
    const productPrice = 18000;

    const { price, finalDiscountPrice } = calculateProductPrices({
      retailPrice,
      productPrice,
      discountPrice: 0,
    });

    expect(price).toBe(retailPrice);
    expect(finalDiscountPrice).toBe(retailPrice - productPrice);
  });

  it('권장o 컬리판매o 할인o = 둘 중 높은 값을 반환 받고 그 갭 + 할인금액 이 할인가이다.', () => {
    const retailPrice = 20000;
    const productPrice = 18000;
    const discountPrice = 1800;

    const { price, finalDiscountPrice } = calculateProductPrices({
      retailPrice,
      productPrice,
      discountPrice,
    });

    expect(price).toBe(retailPrice);
    expect(finalDiscountPrice).toBe(retailPrice - productPrice + discountPrice);
  });

  it('권장x 컬리판매o 할인x = 컬리판매가를 반환 받는다.', () => {
    const productPrice = 18000;

    const { price, finalDiscountPrice } = calculateProductPrices({
      retailPrice: 0,
      productPrice,
      discountPrice: 0,
    });

    expect(price).toBe(productPrice);
    expect(finalDiscountPrice).toBe(0);
  });

  it('권장x 컬리판매o 할인o = 권장 소비자가를 반환 받고 할인가를 노출한다.', () => {
    const productPrice = 18000;
    const discountPrice = 1800;

    const { price, finalDiscountPrice } = calculateProductPrices({
      retailPrice: 0,
      productPrice,
      discountPrice,
    });

    expect(price).toBe(productPrice);
    expect(finalDiscountPrice).toBe(discountPrice);
  });
});
