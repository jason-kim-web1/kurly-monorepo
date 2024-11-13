import {
  mockDealProductsWithReservableProduct,
  mockDealProductsWithoutReservableProduct,
  mockCheckoutProduct,
} from '../../../../../fixtures';
import { getReservableProducts, isReservableProducts } from './getReservableProduct';

describe('isReservableProducts 테스트', () => {
  context('예약 상품이 있으면', () => {
    given('products', () => mockDealProductsWithReservableProduct);

    it('true 를 반환한다.', () => {
      const result = isReservableProducts(given.products);

      expect(result).toBeTruthy();
    });
  });

  context('예약 상품이 없으면', () => {
    given('products', () => mockDealProductsWithoutReservableProduct);

    it('false 를 반환한다.', () => {
      const result = isReservableProducts(given.products);

      expect(result).toBeFalsy();
    });
  });
});

describe('getReservableProducts 테스트', () => {
  context('상품이 없으면', () => {
    given('products', () => []);

    it('빈 배열을 반환한다.', () => {
      const result = getReservableProducts(given.products);

      expect(result).toStrictEqual([]);
    });
  });

  context('예약 상품이 없으면', () => {
    given('products', () => [
      {
        ...mockCheckoutProduct,
        isReservable: false,
      },
      {
        ...mockCheckoutProduct,
        isReservable: false,
      },
    ]);

    it('빈 배열을 반환한다.', () => {
      const result = getReservableProducts(given.products);

      expect(result).toStrictEqual([]);
    });
  });

  context('예약 상품이 있으면', () => {
    given('products', () => [
      {
        ...mockCheckoutProduct,
        isReservable: true,
      },
      {
        ...mockCheckoutProduct,
        isReservable: false,
      },
    ]);

    it('해당 조건에 맞는 배열을 반환한다.', () => {
      const result = getReservableProducts(given.products);

      expect(result).toStrictEqual([given.products[0]]);
    });
  });
});
