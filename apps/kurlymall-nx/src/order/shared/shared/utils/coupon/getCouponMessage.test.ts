import {
  ALL_PAYMENTGATEWAYS_COUPON,
  formattedKurlypayVendors,
  KAKAOPAY_COUPON,
  KURLYPAY_CREDITCARD_COUPON,
  NAVERPAY_COUPON,
  PLCC_COUPON,
  TOSSPAYMENTS_COUPON_WITH_HYUNDAI,
} from '../../../../../../fixtures';
import { CreditCardFixture } from '../../../../../../fixtures/checkout/credit-cards';
import { DEFAULT_KURLYPAY_VENDORS } from '../../../../../../fixtures/checkout/kurlypayVendors.fixtures';
import { vendorsFixture } from '../../../../../../fixtures/checkout/payment-vendors';
import { getCouponMessage } from './getCouponMessage';

describe('getCouponMessage', () => {
  context('선택한 쿠폰이 없으면', () => {
    it('undefined 를 return 한다.', () => {
      const result = getCouponMessage({
        coupon: undefined,
        vendors: vendorsFixture,
        creditCards: CreditCardFixture,
        kurlypayVendors: formattedKurlypayVendors,
      });

      expect(result).toBeUndefined();
    });
  });

  context('모든 결제수단에 이용 가능한 쿠폰이면', () => {
    it('undefined 를 return 한다.', () => {
      const result = getCouponMessage({
        coupon: ALL_PAYMENTGATEWAYS_COUPON,
        vendors: vendorsFixture,
        creditCards: CreditCardFixture,
        kurlypayVendors: formattedKurlypayVendors,
      });

      expect(result).toBeUndefined();
    });
  });

  context.each([TOSSPAYMENTS_COUPON_WITH_HYUNDAI, KURLYPAY_CREDITCARD_COUPON])(
    '신용카드 전용 쿠폰이면',
    (creditCardCoupon) => {
      context('해당 쿠폰의 신용카드가 신용카드 목록에 없을 때', () => {
        it('undefined 를 return 한다.', () => {
          const result = getCouponMessage({
            coupon: creditCardCoupon,
            vendors: vendorsFixture,
            creditCards: [],
            kurlypayVendors: formattedKurlypayVendors,
          });

          expect(result).toBeUndefined();
        });
      });

      context('해당 쿠폰의 신용카드가 신용카드 목록에 있을 때', () => {
        it('전용 쿠폰 사용시 결제 가능한 카드 제한 문구를 보여준다.', () => {
          const result = getCouponMessage({
            coupon: creditCardCoupon,
            vendors: vendorsFixture,
            creditCards: CreditCardFixture,
            kurlypayVendors: formattedKurlypayVendors,
          });

          expect(result).toBe('현대카드 전용 쿠폰 사용 시, 현대카드 결제만 가능합니다. (법인카드 제외)');
        });
      });
    },
  );

  context('간편결제 전용 쿠폰이고', () => {
    context('결제수단에 선택한 쿠폰의 결제수단이 없으면', () => {
      it('undefined 를 return 한다.', () => {
        const result = getCouponMessage({
          coupon: KAKAOPAY_COUPON,
          vendors: [],
          creditCards: CreditCardFixture,
          kurlypayVendors: formattedKurlypayVendors,
        });

        expect(result).toBeUndefined();
      });
    });

    context('결제수단에 선택한 쿠폰의 결제수단이 있으면', () => {
      it('간편결제 전용 쿠폰 한정 텍스트를 리턴한다.', () => {
        const result = getCouponMessage({
          coupon: NAVERPAY_COUPON,
          vendors: vendorsFixture,
          creditCards: CreditCardFixture,
          kurlypayVendors: formattedKurlypayVendors,
        });

        expect(result).toBe('네이버페이 전용 쿠폰 사용 시, 네이버페이 결제만 가능합니다.');
      });
    });
  });

  context('컬리페이 간편결제 전용 쿠폰이면', () => {
    it('전용 쿠폰 한정 텍스트를 리턴한다.', () => {
      const result = getCouponMessage({
        coupon: PLCC_COUPON,
        vendors: vendorsFixture,
        creditCards: CreditCardFixture,
        kurlypayVendors: formattedKurlypayVendors,
      });

      expect(result).toBe('컬리페이 컬리카드 전용 쿠폰 사용 시, 컬리페이 컬리카드 결제만 가능합니다. (법인카드 제외)');
    });

    context('컬리페이 간편결제 수단에 해당 쿠폰의 전용 결제수단이 없으면', () => {
      it('전용 쿠폰 한정 텍스트를 리턴한다', () => {
        const result = getCouponMessage({
          coupon: PLCC_COUPON,
          vendors: vendorsFixture,
          creditCards: CreditCardFixture,
          kurlypayVendors: DEFAULT_KURLYPAY_VENDORS,
        });

        expect(result).toBe(
          '컬리페이 컬리카드 전용 쿠폰 사용 시, 컬리페이 컬리카드 결제만 가능합니다. (법인카드 제외)',
        );
      });
    });
  });
});
