import { checkoutCouponsFixture } from '../../../../../fixtures';
import { CheckoutProduct } from '../../../../shared/interfaces';
import { disableFreeShippingCoupons, getProductsLabel } from './product.service';
import { PROMOTION_TYPE } from '../../../cart/constants/PromotionType';

describe('getProductsLabel 상품 구분 테스트', () => {
  const product: CheckoutProduct = {
    dealProductNo: 10041705,
    dealProductCode: 'D00010041705',
    dealProductName: '[타코] 두리안 주스',
    contentProductNo: 5041705,
    contentProductName: '[타코] 두리안 주스',
    imageUrl: 'https://img-cf.kurly.com/shop/data/goods/1568969683950s0.jpg',
    productVerticalSmallUrl: 'https://img-cf.kurly.com/shop/data/goods/1568969683950s0.jpg',
    quantity: 2,
    displayPrice: 3300,
    displayDiscountPrice: 0,
    isPickupDealProduct: false,
    isReservable: false,
    isAlcoholDealProduct: false,
    isGiftCard: false,
  };

  context('상품에 특정 라벨이나 레거시 정보가 없으면', () => {
    it('모두 false 를 반환한다.', () => {
      const result = getProductsLabel([
        {
          ...product,
          exceptionLabel: null,
          legacyPromotion: null,
        },
      ]);

      expect(result).toStrictEqual({
        isReusablePackage: false,
        isEventProducts: false,
        isLuckyBoxOrder: false,
      });
    });
  });

  context('exceptionLabel 에 REFRESH_PACKAGE 라벨이 있으면', () => {
    it('isReusablePackage: true 를 반환한다.', () => {
      const result = getProductsLabel([
        {
          ...product,
          exceptionLabel: 'REFRESH_PACKAGE',
          legacyPromotion: null,
        },
      ]);

      expect(result).toStrictEqual({
        isReusablePackage: true,
        isEventProducts: false,
        isLuckyBoxOrder: false,
      });
    });
  });

  context('legacyPromotion 에 NEWBIE 라벨이 있으면', () => {
    it('isEventProducts: true 를 반환한다.', () => {
      const result = getProductsLabel([
        {
          ...product,
          exceptionLabel: null,
          legacyPromotion: PROMOTION_TYPE.NEWBIE,
        },
      ]);

      expect(result).toStrictEqual({
        isReusablePackage: false,
        isEventProducts: true,
        isLuckyBoxOrder: false,
      });
    });
  });

  context('(여러건) legacyPromotion 에 LUCKY_BOX 라벨이 있으면', () => {
    it('isEventProducts: true, isLuckyBoxOrder: false 를 반환한다.', () => {
      const result = getProductsLabel([
        {
          ...product,
          exceptionLabel: null,
          legacyPromotion: PROMOTION_TYPE.LUCKY_BOX,
        },
        {
          ...product,
          exceptionLabel: null,
          legacyPromotion: PROMOTION_TYPE.NEWBIE,
        },
      ]);

      expect(result).toStrictEqual({
        isReusablePackage: false,
        isEventProducts: true,
        isLuckyBoxOrder: false,
      });
    });
  });

  context('(단건) legacyPromotion 에 LUCKY_BOX 라벨이 있으면', () => {
    it('isEventProducts, isLuckyBoxOrder: true 를 반환한다.', () => {
      const result = getProductsLabel([
        {
          ...product,
          exceptionLabel: null,
          legacyPromotion: PROMOTION_TYPE.LUCKY_BOX,
        },
      ]);

      expect(result).toStrictEqual({
        isReusablePackage: false,
        isEventProducts: true,
        isLuckyBoxOrder: true,
      });
    });
  });
});

describe('disableFreeShippingCoupons - 무료배송 쿠폰 삭제 테스트', () => {
  context('무료배송 쿠폰이 존재하면', () => {
    given('coupons', () => checkoutCouponsFixture);
    it('무료배송 쿠폰을 사용 불가로 반환한다.', () => {
      const result = disableFreeShippingCoupons(given.coupons);

      const freeShippingCoupons = result.filter(({ type }) => type === 'FREE_SHIPPING');

      freeShippingCoupons.forEach(({ usable }) => {
        expect(usable).toBeFalsy();
      });
    });
  });

  context('무료배송 쿠폰이 존재하지 않으면', () => {
    const notInFreeShippingCoupons = checkoutCouponsFixture.filter(({ type }) => type !== 'FREE_SHIPPING');
    given('coupons', () => notInFreeShippingCoupons);
    it('원배열 그대로 반환한다.', () => {
      const result = disableFreeShippingCoupons(given.coupons);

      expect(result).toStrictEqual(given.coupons);
    });
  });
});
