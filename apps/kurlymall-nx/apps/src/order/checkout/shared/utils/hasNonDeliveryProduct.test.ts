import { hasNonDeliveryProduct } from './hasNonDeliveryProduct';

describe('hasNonDeliveryProduct 테스트', () => {
  context('픽업 상품이면', () => {
    given('props', () => ({
      hasReservableProducts: false,
      hasKurlyFulfillmentAndDeliveryProduct: true,
      isPickupOrder: true,
      isGiftCardOrder: false,
    }));

    it('true 를 반환한다.', () => {
      const result = hasNonDeliveryProduct(given.props);

      expect(result).toBeTruthy();
    });
  });

  context('예약 상품이면', () => {
    given('props', () => ({
      hasReservableProducts: true,
      hasKurlyFulfillmentAndDeliveryProduct: true,
      isPickupOrder: false,
      isGiftCardOrder: false,
    }));

    it('true 를 반환한다.', () => {
      const result = hasNonDeliveryProduct(given.props);

      expect(result).toBeTruthy();
    });
  });

  context('컬리 상품권이면', () => {
    given('props', () => ({
      hasReservableProducts: true,
      hasKurlyFulfillmentAndDeliveryProduct: true,
      isPickupOrder: false,
      isGiftCardOrder: true,
    }));

    it('true 를 반환한다.', () => {
      const result = hasNonDeliveryProduct(given.props);

      expect(result).toBeTruthy();
    });
  });

  context('컬리물류 배송 상품이 없으면', () => {
    given('props', () => ({
      hasReservableProducts: false,
      hasKurlyFulfillmentAndDeliveryProduct: false,
      isPickupOrder: false,
      isGiftCardOrder: false,
    }));

    it('true 를 반환한다.', () => {
      const result = hasNonDeliveryProduct(given.props);

      expect(result).toBeTruthy();
    });
  });

  context('픽업 상품 아니고, 예약 상품 아니고, 컬리물류 배송 상품이면', () => {
    given('props', () => ({
      hasReservableProducts: false,
      hasKurlyFulfillmentAndDeliveryProduct: true,
      isPickupOrder: false,
      isGiftCardOrder: false,
    }));

    it('false 를 반환한다.', () => {
      const result = hasNonDeliveryProduct(given.props);

      expect(result).toBeFalsy();
    });
  });
});
