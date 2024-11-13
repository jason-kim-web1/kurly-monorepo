import { PriceService } from './priceService';

describe('PriceService', () => {
  // retailPrice: 권장소비자가
  // basePrice: 컬리 판매가
  // discountPrice: 할인가

  context('대표가, 컬리판매가, 원가', () => {
    given('retailPrice', () => 20000);
    given('basePrice', () => 18000);
    given('discountedPrice', () => 16200);

    // case1: 권장O 컬리판매O 할인X
    it('할인이 없고 권장소비자가, 컬리판매가가 있는 경우, 대표가와 원가를 확인할 수 있다.', () => {
      const priceService = new PriceService({
        retailPrice: given.retailPrice,
        basePrice: given.basePrice,
        discountedPrice: null,
      });

      expect(priceService.representativePrice).toBe(given.basePrice);
      expect(priceService.kurlyPrice).toBe(null);
      expect(priceService.originalPrice).toBe(given.retailPrice);
    });

    // case2: 권장O 컬리판매O 할인O
    it('권장소비자가, 컬리판매가, 할인이 모두 있는 경우, 대표가, 컬리 판매가, 원가를 확인할 수 있다.', () => {
      const priceService = new PriceService({
        retailPrice: given.retailPrice,
        basePrice: given.basePrice,
        discountedPrice: given.discountedPrice,
      });

      expect(priceService.representativePrice).toBe(given.discountedPrice);
      expect(priceService.kurlyPrice).toBe(given.basePrice);
      expect(priceService.originalPrice).toBe(given.retailPrice);
    });

    // case3: 권장X 컬리판매O 할인X
    it('컬리판매가만 있는 경우, 대표가만 확인할 수 있다.', () => {
      const priceService = new PriceService({
        retailPrice: null,
        basePrice: given.basePrice,
        discountedPrice: null,
      });

      expect(priceService.representativePrice).toBe(given.basePrice);
      expect(priceService.kurlyPrice).toBe(null);
      expect(priceService.originalPrice).toBe(null);
    });

    // case4: 권장X 컬리판매O 할인O
    it('권장소비자가 없고 컬리판매가, 할인이 있는 경우, 대표가, 원가를 확인할 수 있다.', () => {
      const priceService = new PriceService({
        retailPrice: null,
        basePrice: given.basePrice,
        discountedPrice: given.discountedPrice,
      });

      expect(priceService.representativePrice).toBe(given.discountedPrice);
      expect(priceService.kurlyPrice).toBe(given.basePrice);
      expect(priceService.originalPrice).toBe(null);
    });

    // case4: 권장X 컬리판매O 할인O, 할인률 100%, 할인가가 0원인 경우
    it('권장소비자가 없고 컬리판매가, 할인이 있는 경우, 대표가, 원가를 확인할 수 있다.', () => {
      const priceService = new PriceService({
        retailPrice: null,
        basePrice: 10,
        discountedPrice: 0,
      });

      expect(priceService.representativePrice).toBe(0);
      expect(priceService.kurlyPrice).toBe(10);
      expect(priceService.originalPrice).toBe(null);
    });
  });

  context('할인X, 컬리판매가O, 원가O', () => {
    given('retailPrice', () => 19600);
    given('basePrice', () => 19600);
    given('discountedPrice', () => 19600);

    // edge case1: 할인X, 권장 == 컬리판매가
    it('할인가가 있지만(할인X), 소비자권장가와 컬리판매가가 같은 경우 대표가로 컬리판매가만 보여준다.', () => {
      const priceService = new PriceService({
        retailPrice: given.retailPrice,
        basePrice: given.basePrice,
        discountedPrice: given.discountedPrice,
      });

      expect(priceService.representativePrice).toBe(given.basePrice);
      expect(priceService.kurlyPrice).toBe(null);
      expect(priceService.originalPrice).toBe(null);
    });

    given('discountedPrice', () => null);
    // edge case2: 할인X, 권장 == 컬리판매가
    it('할인가 없고(할인X), 소비자권장가와 컬리판매가가 같은 경우 대표가로 컬리판매가만 보여준다.', () => {
      const priceService = new PriceService({
        retailPrice: given.retailPrice,
        basePrice: given.basePrice,
        discountedPrice: given.discountedPrice,
      });

      expect(priceService.representativePrice).toBe(given.basePrice);
      expect(priceService.kurlyPrice).toBe(null);
      expect(priceService.originalPrice).toBe(null);
    });
  });

  context('할인 0% 이하, 컬리판매가O, 원가O', () => {
    given('retailPrice', () => 16000);
    given('basePrice', () => 15920);
    given('discountedPrice', () => 15920);
    // edge case3: 할인 0% 이하, 할인가 == 컬리판매가, 소비자가O
    it('할인 0% 이하, 할인가, 컬리판매가가 같고 소비자가가 존재하는 경우 컬리판매가와 소비자가 보여준다.', () => {
      const priceService = new PriceService({
        retailPrice: given.retailPrice,
        basePrice: given.basePrice,
        discountedPrice: given.discountedPrice,
      });

      expect(priceService.representativePrice).toBe(given.discountedPrice);
      expect(priceService.kurlyPrice).toBe(given.basePrice);
      expect(priceService.originalPrice).toBe(null);
    });

    given('retailPrice', () => 15920);
    given('basePrice', () => 16000);
    // edge case3: 할인 0% 이하, 할인가 == 소비자가, 컬리가O
    it('할인 0% 이하, 할인가, 소비자가가 같고 컬리가가 존재하는 경우 컬리판매가와 소비자가 보여준다.', () => {
      const priceService = new PriceService({
        retailPrice: given.retailPrice,
        basePrice: given.basePrice,
        discountedPrice: given.discountedPrice,
      });

      expect(priceService.representativePrice).toBe(given.discountedPrice);
      expect(priceService.kurlyPrice).toBe(given.basePrice);
      expect(priceService.originalPrice).toBe(null);
    });
  });
});
