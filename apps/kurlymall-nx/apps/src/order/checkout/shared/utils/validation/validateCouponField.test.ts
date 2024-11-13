import {
  ALL_PAYMENTGATEWAYS_COUPON,
  KAKAOPAY_COUPON,
  KAKAOPAY_VENDOR,
  NAVERPAY_COUPON,
  PLCC_COUPON,
  TOSSPAYMENTS_COUPON_WITH_HYUNDAI,
} from '../../../../../../fixtures';
import { EasyPaymentCardType } from '../../../../../shared/interfaces';
import { validateCouponField } from './validateCouponField';

describe('validateCouponField - 결제하기 클릭 시 쿠폰 검증', () => {
  const passResult = {
    errorMessage: '',
    documentId: '',
  };

  given('selectedCoupon', () => undefined);
  given('usedPoint', () => 0);
  given('couponVendor', () => undefined);
  given('paymentVendor', () => undefined);
  given('price', () => ({
    totalPrice: 0,
    discountPrice: 0,
    expectedPoint: 0,
    couponDiscountPrice: 0,
    paymentPrice: 1000,
    deliveryPrice: 0,
    deliveryPriceDiscountReason: '',
    usedPlccPoint: 0,
    kurlycardAccruedPoint: 0,
  }));

  given('params', () => ({
    selectedCoupon: given.selectedCoupon,
    usedPoint: given.usedPoint,
    couponVendor: given.couponVendor,
    paymentVendor: given.paymentVendor,
    price: given.price,
  }));

  context('선택한 쿠폰이 없으면', () => {
    it('통과한다.', () => {
      const result = validateCouponField(given.params);

      expect(result).toEqual(passResult);
    });
  });

  context('선택한 쿠폰이 모든 결제수단에 사용 가능한 쿠폰이면', () => {
    given('selectedCoupon', () => ALL_PAYMENTGATEWAYS_COUPON);

    it('통과한다.', () => {
      const result = validateCouponField(given.params);

      expect(result).toEqual(passResult);
    });
  });

  context('적립금을 사용할 수 없는 쿠폰인데, 적립금이 사용되었다면', () => {
    given('selectedCoupon', () => ({
      paymentGateways: ['kakao-pay'],
      pointAllowed: false,
      creditCardId: '',
    }));
    given('selectedVendor', () => KAKAOPAY_VENDOR);
    given('usedPoint', () => 1000);

    it('"적립금을 사용할 수 없습니다." 에러 메세지 format을 return 한다.', () => {
      const result = validateCouponField(given.params);

      expect(result).toEqual({
        errorMessage: '적립금을 사용할 수 없습니다.',
        documentId: '',
      });
    });
  });

  context('선택한 쿠폰의 전용 결제수단이 없다면', () => {
    given('selectedCoupon', () => KAKAOPAY_COUPON);
    given('couponVendor', () => undefined);
    given('paymentVendor', () => ({
      code: 'naver-pay',
      cardId: null,
      name: '네이버페이',
      easyPaymentCardType: null,
    }));

    it('"선택하신 결제수단으로 결제할 수 없습니다." 에러 메세지 format을 return 한다.', () => {
      const result = validateCouponField(given.params);

      expect(result).toEqual({
        errorMessage: '선택하신 결제수단으로 결제할 수 없습니다.',
        documentId: '',
      });
    });
  });

  context('선택한 결제수단이 없다면', () => {
    given('selectedCoupon', () => KAKAOPAY_COUPON);
    given('couponVendor', () => ({
      code: 'kakao-pay',
      cardId: null,
      name: '카카오페이',
      easyPaymentCardType: null,
    }));
    given('paymentVendor', () => undefined);

    it('"선택하신 결제수단으로 결제할 수 없습니다." 에러 메세지 format을 return 한다.', () => {
      const result = validateCouponField(given.params);

      expect(result).toEqual({
        errorMessage: '선택하신 결제수단으로 결제할 수 없습니다.',
        documentId: '',
      });
    });
  });

  context('쿠폰의 전용 결제수단과 선택한 결제수단이 올바르면', () => {
    const validationVendor = {
      code: 'naver-pay',
      cardId: null,
      name: '네이버페이',
      easyPaymentCardType: null,
    };

    given('selectedCoupon', () => NAVERPAY_COUPON);
    given('couponVendor', () => validationVendor);
    given('paymentVendor', () => validationVendor);

    it('통과한다.', () => {
      const result = validateCouponField(given.params);

      expect(result).toEqual(passResult);
    });
  });

  context('쿠폰의 전용 결제수단이 비씨(페이북)이고 선택한 결제수단이 컬리카드면', () => {
    given('selectedCoupon', () => ({
      paymentGateways: ['toss-payments'],
      pointAllowed: true,
      creditCardId: '31',
    }));
    given('couponVendor', () => ({
      code: 'toss-payments',
      cardId: '31',
      name: '비씨(페이북)',
      easyPaymentCardType: EasyPaymentCardType.CREDIT_CARD,
    }));
    given('paymentVendor', () => ({
      code: 'kurlypay',
      cardId: 'P1',
      name: '컬리카드',
      easyPaymentCardType: EasyPaymentCardType.CREDIT_CARD,
    }));

    it('통과한다.', () => {
      const result = validateCouponField(given.params);

      expect(result).toEqual(passResult);
    });
  });

  context('결제수단 전용 쿠폰을 썼는데, 최종 결제금액이 0원이면', () => {
    given('selectedCoupon', () => TOSSPAYMENTS_COUPON_WITH_HYUNDAI);
    given('couponVendor', () => ({
      code: 'toss-payments',
      cardId: '61',
      name: '현대카드',
      easyPaymentCardType: EasyPaymentCardType.CREDIT_CARD,
    }));
    given('paymentVendor', () => ({
      code: 'toss-payments',
      cardId: '61',
      name: '현대',
      easyPaymentCardType: EasyPaymentCardType.CREDIT_CARD,
    }));
    given('price', () => ({
      totalPrice: 10000,
      discountPrice: 9000,
      expectedPoint: 0,
      couponDiscountPrice: 1000,
      paymentPrice: 0,
      deliveryPrice: 0,
      usedPlccPoint: 0,
      kurlycardAccruedPoint: 0,
      deliveryPriceDiscountReason: 'FREE_DELIVERY_PRODUCT_INCLUDED',
    }));

    it('"{결제수단 쿠폰} 전용 쿠폰 사용시, 0원 결제가 불가능합니다." 에러 메세지 format 을 return 한다.', () => {
      const result = validateCouponField(given.params);

      expect(result).toEqual({
        errorMessage: '현대카드 전용 쿠폰 사용시,\n0원 결제가 불가능합니다.',
        documentId: '',
      });
    });
  });

  context('쿠폰의 전용 결제수단과 선택한 결제수단이 다르면', () => {
    given('selectedCoupon', () => PLCC_COUPON);
    given('couponVendor', () => ({
      code: 'kurlypay',
      cardId: 'P1',
      name: '컬리카드',
      easyPaymentCardType: EasyPaymentCardType.CREDIT_CARD,
    }));
    given('paymentVendor', () => ({
      code: 'naver-pay',
      cardId: null,
      name: '네이버페이',
      easyPaymentCardType: null,
    }));

    it('통과하지 않는다.', () => {
      const result = validateCouponField(given.params);

      expect(result).toEqual({
        errorMessage: '컬리카드 전용 쿠폰 사용시,\n네이버페이로 결제가 불가능합니다.',
        documentId: '',
      });
    });
  });

  context('선택한 결제수단이 컬리페이 결제수단이면', () => {
    given('selectedCoupon', () => PLCC_COUPON);
    given('couponVendor', () => ({
      code: 'kurlypay',
      cardId: 'P1',
      name: '컬리카드',
      easyPaymentCardType: EasyPaymentCardType.CREDIT_CARD,
    }));
    given('paymentVendor', () => ({
      code: 'kurlypay',
      cardId: '31',
      name: '비씨(페이북)',
      easyPaymentCardType: EasyPaymentCardType.CREDIT_CARD,
    }));

    it('결제수단 후미에 "(으)"가 붙은 에러 메세지 format 을 return 한다.', () => {
      const result = validateCouponField(given.params);

      expect(result).toEqual({
        errorMessage: '컬리카드 전용 쿠폰 사용시,\n비씨(페이북)(으)로 결제가 불가능합니다.',
        documentId: '',
      });
    });
  });

  context('선택한 결제수단이 휴대폰 결제수단이면', () => {
    given('selectedCoupon', () => PLCC_COUPON);
    given('couponVendor', () => ({
      code: 'kurlypay',
      cardId: 'P1',
      name: '컬리카드',
      easyPaymentCardType: EasyPaymentCardType.CREDIT_CARD,
    }));
    given('paymentVendor', () => ({
      code: 'phonebill',
      cardId: null,
      name: '휴대폰',
      easyPaymentCardType: null,
    }));

    it('결제수단 후미에 "(으)"가 붙은 에러 메세지 format 을 return 한다.', () => {
      const result = validateCouponField(given.params);

      expect(result).toEqual({
        errorMessage: '컬리카드 전용 쿠폰 사용시,\n휴대폰(으)로 결제가 불가능합니다.',
        documentId: '',
      });
    });
  });
});
