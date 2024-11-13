import {
  formattedKurlypayVendors,
  KAKAOPAY_COUPON,
  KURLYPAY_BC_COUPON,
  KURLYPAY_COUPON_ALL,
  KURLYPAY_CREDITCARD_COUPON,
  NAVERPAY_COUPON,
  PLCC_COUPON,
  TOSSPAYMENTS_COUPON_WITH_HYUNDAI,
  TOSSPAYMENTS_COUPON_WITH_SHINHAN,
} from '../../../../../../fixtures';
import { CreditCardFixture } from '../../../../../../fixtures/checkout/credit-cards';
import { vendorsFixture, vendorsFixtureWithKurlyPayCredit } from '../../../../../../fixtures/checkout/payment-vendors';
import { CardVenderCode, PaymentVenderName } from '../../../../../shared/constant';
import { EasyPaymentType } from '../../../../../shared/interfaces';
import { findCouponVendor } from './findCouponVendor';
import { KURLYPAY_VENDORS_WITHOUT_PLCC } from '../../../../../../fixtures/checkout/kurlypayVendors.fixtures';

describe('findCouponVendor - 선택한 쿠폰의 코드, 회사ID, 이름을 return 합니다.', () => {
  context('선택한 쿠폰이 없으면', () => {
    it('undefined를 return 한다.', () => {
      const vendor = findCouponVendor({
        selectedCoupon: undefined,
        vendors: [],
        creditCards: [],
        kurlypayVendors: [],
      });

      expect(vendor).toBeUndefined();
    });
  });

  context('선택한 쿠폰의 결제수단을 결제수단에서 찾지 못했다면', () => {
    it('undefined 를 return 한다.', () => {
      const vendor = findCouponVendor({
        selectedCoupon: NAVERPAY_COUPON,
        vendors: [],
        creditCards: CreditCardFixture,
        kurlypayVendors: formattedKurlypayVendors,
      });

      expect(vendor).toBeUndefined();
    });
  });

  context.each`
    coupon | name
    ${TOSSPAYMENTS_COUPON_WITH_HYUNDAI} | ${'현대카드'}
    ${KURLYPAY_CREDITCARD_COUPON} | ${'현대카드'}
    ${TOSSPAYMENTS_COUPON_WITH_SHINHAN} | ${'신한카드'}
  `('신용카드 전용 쿠폰일 때', ({ coupon, name }) => {
    it(`${name} 쿠폰의 결제수단 정보를 return 한다.`, () => {
      const vendor = findCouponVendor({
        selectedCoupon: coupon,
        vendors: vendorsFixtureWithKurlyPayCredit,
        creditCards: CreditCardFixture,
        kurlypayVendors: formattedKurlypayVendors,
      });

      expect(vendor).toEqual({
        code: 'kurlypay-credit',
        cardId: coupon.creditCardId,
        name,
      });
    });
  });

  context('신용카드 목록에 찾는 카드가 없다면', () => {
    it('undefined를 return 한다.', () => {
      const vendor = findCouponVendor({
        selectedCoupon: TOSSPAYMENTS_COUPON_WITH_HYUNDAI,
        vendors: vendorsFixtureWithKurlyPayCredit,
        creditCards: [],
        kurlypayVendors: formattedKurlypayVendors,
      });

      expect(vendor).toBeUndefined();
    });
  });

  context.each`
    coupon | name
    ${PLCC_COUPON} | ${'컬리카드'}
    ${KURLYPAY_COUPON_ALL} | ${'컬리페이 카드'}
  `('컬리페이 결제수단 전용 쿠폰일 때', ({ coupon, name }) => {
    it(`${name} 쿠폰의 결제수단 정보를 return 한다.`, () => {
      const vendor = findCouponVendor({
        selectedCoupon: coupon,
        vendors: vendorsFixture,
        creditCards: CreditCardFixture,
        kurlypayVendors: formattedKurlypayVendors,
      });

      expect(vendor).toEqual({
        code: PaymentVenderName.KURLYPAY,
        cardId: coupon.creditCardId,
        name,
        easyPaymentType: EasyPaymentType.CARD,
      });
    });
  });

  context('컬리페이-BC 결제수단 전용 쿠폰일 때', () => {
    context('결제수단에 PLCC 카드가 있으면', () => {
      it('PLCC 결제수단 정보를 return 한다.', () => {
        const vendor = findCouponVendor({
          selectedCoupon: KURLYPAY_BC_COUPON,
          vendors: vendorsFixture,
          creditCards: CreditCardFixture,
          // PLCC 카드가 결제수단에 있음
          kurlypayVendors: formattedKurlypayVendors,
        });

        expect(vendor).toEqual({
          code: PaymentVenderName.KURLYPAY,
          cardId: CardVenderCode.KURLYPAY_CARD,
          name: '컬리카드',
          easyPaymentType: EasyPaymentType.CARD,
        });
      });
    });

    context('결제수단에 PLCC 카드가 없으면', () => {
      it('컬리페이-BC 결제수단 정보를 return 한다.', () => {
        const vendor = findCouponVendor({
          selectedCoupon: KURLYPAY_BC_COUPON,
          vendors: vendorsFixture,
          creditCards: CreditCardFixture,
          // PLCC 카드가 결제수단에 없고 BC 카드가 있음
          kurlypayVendors: KURLYPAY_VENDORS_WITHOUT_PLCC,
        });

        expect(vendor).toEqual({
          code: PaymentVenderName.KURLYPAY,
          cardId: CardVenderCode.BC_CARD,
          name: 'BC카드',
          easyPaymentType: EasyPaymentType.CARD,
        });
      });
    });
  });

  context('컬리페이 결제수단에서 결제수단을 찾지 못했다면', () => {
    it('undefined 를 return 한다.', () => {
      const vendor = findCouponVendor({
        selectedCoupon: PLCC_COUPON,
        vendors: vendorsFixture,
        creditCards: CreditCardFixture,
        kurlypayVendors: [],
      });

      expect(vendor).toBeUndefined();
    });
  });

  context.each`
    coupon | name
    ${NAVERPAY_COUPON} | ${'네이버페이'}
    ${KAKAOPAY_COUPON} | ${'카카오페이'}
  `('간편결제 쿠폰 일 때', ({ coupon, name }) => {
    it(`${name} 쿠폰의 결제수단 정보를 return 한다.`, () => {
      const vendor = findCouponVendor({
        selectedCoupon: coupon,
        vendors: vendorsFixture,
        creditCards: CreditCardFixture,
        kurlypayVendors: formattedKurlypayVendors,
      });

      expect(vendor).toEqual({
        code: coupon.paymentGateways[0],
        cardId: null,
        name,
      });
    });
  });
});
