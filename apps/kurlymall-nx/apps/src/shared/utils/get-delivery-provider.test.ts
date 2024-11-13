import { ordersFixture } from '../../mypage/order/shared/fixtures/orders.fixture';
import { BusinessType } from '../enums';
import { getDeliveryProvider } from './get-delivery-provider';

describe('get delivery provider test', () => {
  const fixture = ordersFixture;
  given('orders', () => fixture);

  context('비즈니스 타입이 KURLY_NON_DELIVERY(1P)인 상품을 주문하면', () => {
    const kurlyNonDeliveryFixture = fixture.map((order) => {
      return { ...order, businessType: BusinessType.KURLY_NON_DELIVERY };
    });
    given('orders', () => kurlyNonDeliveryFixture);

    it('none을 리턴한다.', () => {
      const provider = getDeliveryProvider(given.orders);

      expect(provider).toBe('none');
    });
  });

  context('비즈니스 타입이 PARTNER_NON_DELIVERY(3P)인 상품을 주문하면', () => {
    const parterNonDeliveryFixture = fixture.map((order) => {
      return { ...order, businessType: BusinessType.PARTNER_NON_DELIVERY };
    });
    given('orders', () => parterNonDeliveryFixture);

    it('none을 리턴한다.', () => {
      const provider = getDeliveryProvider(given.orders);

      expect(provider).toBe('none');
    });
  });

  context('비즈니스 타입이 KURLY_FULFILLMENT(1P)인 상품을 주문하면', () => {
    const kurlyFulfillmentFixture = fixture.map((order) => {
      return { ...order, businessType: BusinessType.KURLY_FULFILLMENT };
    });
    given('orders', () => kurlyFulfillmentFixture);

    it('kurly를 리턴한다.', () => {
      const provider = getDeliveryProvider(given.orders);

      expect(provider).toBe('kurly');
    });
  });

  context('비즈니스 타입이 PARTNER_KURLY_CONSIGNMENT(1PL)인 상품을 주문하면', () => {
    const partnerKurlyConsignmentFixture = fixture.map((order) => {
      return { ...order, businessType: BusinessType.PARTNER_KURLY_CONSIGNMENT };
    });
    given('orders', () => partnerKurlyConsignmentFixture);

    it('kurly를 리턴한다.', () => {
      const provider = getDeliveryProvider(given.orders);

      expect(provider).toBe('kurly');
    });
  });

  context('비즈니스 타입이 KURLY_MANUAL_PROCESSING인 상품을 주문하면', () => {
    const kurlyManualProcessingFixture = fixture.map((order) => {
      return { ...order, businessType: BusinessType.KURLY_MANUAL_PROCESSING };
    });
    given('orders', () => kurlyManualProcessingFixture);

    it('kurly를 리턴한다.', () => {
      const provider = getDeliveryProvider(given.orders);

      expect(provider).toBe('kurly');
    });
  });

  context('비즈니스 타입이 PARTNER_FULFILLMENT(3P)인 상품을 주문하면', () => {
    const partnerFulfillmentFixture = fixture.map((order) => {
      return { ...order, businessType: BusinessType.PARTNER_FULFILLMENT };
    });
    given('orders', () => partnerFulfillmentFixture);

    it('partner를 리턴한다.', () => {
      const provider = getDeliveryProvider(given.orders);

      expect(provider).toBe('partner');
    });
  });

  context('비즈니스 타입이 PARTNER_MANUAL_PROCESSING인 상품을 주문하면', () => {
    const partnerManualProcessingFixture = fixture.map((order) => {
      return { ...order, businessType: BusinessType.PARTNER_MANUAL_PROCESSING };
    });
    given('orders', () => partnerManualProcessingFixture);

    it('partner를 리턴한다.', () => {
      const provider = getDeliveryProvider(given.orders);

      expect(provider).toBe('partner');
    });
  });
});
