import DownloadableCouponBanner from './DownloadableCouponBanner';
import { CouponBannerBenefitType, CouponBannerHurdleType, CouponBannerType } from './types';

const mock = {
  type: 'DOWNLOAD_COUPON',
  bannerName: '동물복지 우유 15% 지원 쿠폰',
  bannerLink: null,
  accessKey: '9c161496',
};

describe('DownloadableCouponBanner', () => {
  given(
    'instance',
    () =>
      new DownloadableCouponBanner(mock.type as CouponBannerType, mock.bannerName, mock.accessKey, {
        name: given.couponName,
        benefitType: given.benefitType,
        benefitValue: given.benefitValue,
        effectivePeriod: given.effectivePeriod,
        minimumOrderPrice: given.minimumOrderPrice,
        minimumOrderAmount: given.minimumOrderAmount,
        maximumDiscountPrice: given.maximumDiscountPrice,
        hurdleType: given.hurdleType,
        creditCardId: given.creditCardId,
        paymentGateways: given.paymentGateways,
        allowDiscountedProducts: given.allowDiscountedProducts,
        allowedProducts: given.allowedProducts,
        allowedCategories: given.allowedCategories,
        disallowedProducts: given.disallowedProducts,
        disallowedCategories: given.disallowedCategories,
      }),
  );

  given('couponName', () => '동물복지 우유 15% 지원 쿠폰');
  given('creditCardId', () => null);
  given('paymentGateways', () => []);
  given('allowDiscountedProducts', () => true);
  given('allowedProducts', () => []);
  given('allowedCategories', () => []);
  given('disallowedProducts', () => []);
  given('disallowedCategories', () => []);

  it('bannerName 이 있어야 한다', () => {
    expect(given.instance.bannerName).toBe(mock.bannerName);
  });

  it('downloadable 쿠폰의 경우 배너의 링크가 존재하지 않는다', () => {
    expect(given.instance.bannerLink).toBeNull();
  });

  context('쿠폰의 유효기간이 무한이면', () => {
    given('effectivePeriod', () => ({
      startDateTime: '2022-03-21 11:00:00',
      endDateTime: '2022-03-22 11:00:00',
      infinite: true,
    }));

    it('기간제한 없음 문구가 있어야 한다', () => {
      const { expirationText } = given.instance.couponExtraInfo;
      expect(expirationText).toBe('기간제한 없음');
    });
  });

  context('쿠폰의 유효기간이 무한이 아니면', () => {
    given('effectivePeriod', () => ({
      startDateTime: '2022-03-21 11:00:00',
      endDateTime: '2022-03-22 22:59:59',
      infinite: false,
    }));

    it('종료일 문구가 있어야 한다', () => {
      const { expirationText } = given.instance.couponExtraInfo;
      expect(expirationText).toBe('2022년 03월 22일 23시까지');
    });
  });

  context('benefitType 이 PERCENT_DISCOUNT 일 경우 ', () => {
    const expectedDiscountPercentage = 15;

    given<CouponBannerBenefitType>('benefitType', () => 'PERCENT_DISCOUNT');
    given('benefitValue', () => expectedDiscountPercentage);

    it('discountPrice 는 null 임', () => {
      const { discountPrice } = given.instance.couponExtraInfo;
      expect(discountPrice).toBeNull();
    });

    it('benefitText 는 null 임', () => {
      const { benefitText } = given.instance.couponExtraInfo;
      expect(benefitText).toBeNull();
    });

    it(`discountPercentage 는 ${expectedDiscountPercentage}`, () => {
      const { discountPercentage } = given.instance.couponExtraInfo;
      expect(discountPercentage).toBe(expectedDiscountPercentage);
    });
  });

  context('benefitType 이 PRICE_DISCOUNT 일 경우', () => {
    const expectedDiscountPrice = 1000;
    given<CouponBannerBenefitType>('benefitType', () => 'PRICE_DISCOUNT');
    given('benefitValue', () => expectedDiscountPrice);

    it('discountPercentage 는 null', () => {
      const { discountPercentage } = given.instance.couponExtraInfo;
      expect(discountPercentage).toBeNull();
    });

    it('benefitText 는 null', () => {
      const { benefitText } = given.instance.couponExtraInfo;
      expect(benefitText).toBeNull();
    });

    it(`discountPrice 는 ${expectedDiscountPrice}`, () => {
      const { discountPrice } = given.instance.couponExtraInfo;
      expect(discountPrice).toBe(expectedDiscountPrice);
    });
  });

  context('benefitType 이 FREE_SHIPPING 일 경우', () => {
    const expectedBenefitText = '무료배송';
    given<CouponBannerBenefitType>('benefitType', () => 'FREE_SHIPPING');
    given('benefitValue', () => expectedBenefitText);

    it('discountPrice 는 null', () => {
      const { discountPrice } = given.instance.couponExtraInfo;
      expect(discountPrice).toBeNull();
    });

    it('discountPercentage 는 null', () => {
      const { discountPercentage } = given.instance.couponExtraInfo;
      expect(discountPercentage).toBeNull();
    });

    it(`benefitText 는 ${expectedBenefitText}`, () => {
      const { benefitText } = given.instance.couponExtraInfo;
      expect(benefitText).toBe(expectedBenefitText);
    });
  });

  context('최소 주문 금액이 0 보다 크고 최소 주문 수량이 2 보다 작을 경우', () => {
    given('minimumOrderPrice', () => 0);
    given('minimumOrderAmount', () => 1);
    given('maximumDiscountPrice', () => 1234);

    it('prefix 없는 할인 문구를 가진다', () => {
      const { discountBenefit } = given.instance.couponExtraInfo;

      expect(discountBenefit).toBe('최대 1,234원 할인');
    });
  });

  context('최소 주문 금액이 0보다 클 경우', () => {
    given('minimumOrderPrice', () => 1);
    given('minimumOrderAmount', () => 0);
    given('maximumDiscountPrice', () => 1234);

    it('prefix 로 최소 주문 금액을 표기한다', () => {
      const { discountBenefit } = given.instance.couponExtraInfo;

      expect(discountBenefit).toBe('1원 이상 주문 시 최대 1,234원 할인');
    });
  });

  context('최소 주문 수량이 1보다 클 경우', () => {
    given('minimumOrderPrice', () => 0);
    given('minimumOrderAmount', () => 2);
    given('maximumDiscountPrice', () => 1234);

    it('prefix 로 최소 주문 수량을 표기한다', () => {
      const { discountBenefit } = given.instance.couponExtraInfo;

      expect(discountBenefit).toBe('2개 이상 주문 시 최대 1,234원 할인');
    });
  });

  context('Hurdle 에 허용된 카테고리가 있으면 혜택 문구들에 특정상품 한정이 포함된다', () => {
    given<CouponBannerHurdleType>('hurdleType', () => 'ALLOWED_CATEGORY');

    it('상세 혜택 문구들에 특정상품 한정이 포함되어 있다', () => {
      const { specificBenefits } = given.instance.couponExtraInfo;

      expect(specificBenefits).toContain('특정상품 한정');
    });
  });

  context('Hurdle 에 허용된 상품이 있으면 혜택 문구들에 특정상품 한정이 포함된다', () => {
    given<CouponBannerHurdleType>('hurdleType', () => 'ALLOWED_PRODUCT');
    given('allowedProducts', () => [1, 2, 3, 4]);

    it('상세 혜택 문구들에 특정상품 한정이 포함되어 있다', () => {
      const { specificBenefits } = given.instance.couponExtraInfo;

      expect(specificBenefits).toContain('특정상품 한정');
    });
  });

  context('할인상품제외 제약이 있을 경우', () => {
    given('allowDiscountedProducts', () => false);

    it('상세 헤택 문구들에 할인상품 제외가 포함 되어 있다', () => {
      const { specificBenefits } = given.instance.couponExtraInfo;

      expect(specificBenefits).toContain('할인상품 제외');
    });
  });

  context('허용되지 않은 상품 혹은 카테고리 제약이 있을 경우', () => {
    given('disallowedProducts', () => [1, 2, 3]);
    given('disallowedCategories', () => [1, 2, 3]);

    it('상세 헤택 문구들에 일부 상품 제외가 포함 되어 있다', () => {
      const { specificBenefits } = given.instance.couponExtraInfo;

      expect(specificBenefits).toContain('일부 상품 제외');
    });
  });

  describe('결제 방법 혜택 문구', () => {
    given<CouponBannerHurdleType>('hurdleType', () => 'PAYMENT_METHOD');

    context('결제 방법이 카카오페이', () => {
      given('paymentGateways', () => ['kakao-pay']);

      it('카카오페이 문구가 포함되어 있다', () => {
        const { specificBenefits } = given.instance.couponExtraInfo;

        expect(specificBenefits).toContain('카카오페이 결제시');
      });
    });

    context('결제 방법이 네이버페이', () => {
      given('paymentGateways', () => ['naver-pay']);

      it('네이버페이 문구가 포함되어 있다', () => {
        const { specificBenefits } = given.instance.couponExtraInfo;

        expect(specificBenefits).toContain('네이버페이 결제시');
      });
    });

    context('신용카드 결제 혜택이 있을 경우', () => {
      given('creditCardId', () => '12');
      given('paymentGateways', () => ['naver-pay']);

      it('신용카드 결제 혜택이 있으면 다른 결제 혜택은 보여주지 않는다.', () => {
        const { specificBenefits } = given.instance.couponExtraInfo;

        expect(specificBenefits).not.toContain('네이버페이 결제시');
      });
    });
  });

  describe('신용카드 결제 혜택', () => {
    given<CouponBannerHurdleType>('hurdleType', () => 'PAYMENT_METHOD');

    context('롯데카드', () => {
      given('creditCardId', () => '71');
      it('롯데카드 결제 혜택 문구가 포함 되어 있다', () => {
        const { specificBenefits } = given.instance.couponExtraInfo;

        expect(specificBenefits).toContain('롯데카드 결제시');
      });
    });

    context('하나(외환) 카드', () => {
      given('creditCardId', () => '21');
      it('하나(외환) 카드 결제 혜택 문구가 포함 되어 있다', () => {
        const { specificBenefits } = given.instance.couponExtraInfo;

        expect(specificBenefits).toContain('하나(외환)카드 결제시');
      });
    });
  });
});
