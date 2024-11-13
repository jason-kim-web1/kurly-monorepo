import { calculatePriceResponseMock } from '../../../../shared/api/checkout/__mocks__/checkout';
import { calculatePrice } from './price.service';

jest.mock('../../../../shared/api/checkout/checkout');

describe('PriceService', () => {
  describe('calculatePrice', () => {
    it('returns discounted total price', async () => {
      const result = await calculatePrice({
        usedPlccPoint: 0,
        memberReserveRatio: 0,
        deliveryPrice: 0,
        couponCode: null,
        usedPoint: 0,
      });

      expect(result).toEqual(calculatePriceResponseMock);
    });
  });
});
