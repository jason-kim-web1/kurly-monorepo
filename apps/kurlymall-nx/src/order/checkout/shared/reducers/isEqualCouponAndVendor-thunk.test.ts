import { getDefaultMiddleware } from '@reduxjs/toolkit';
import createMockStore, { MockStoreEnhanced } from 'redux-mock-store';

import { isEqualCouponAndVendor } from './checkout-coupon.slice';

import {
  BC_COUPON,
  KAKAOPAY_COUPON,
  KURLYPAY_BC_COUPON,
  NAVERPAY_COUPON,
  PLCC_COUPON,
  TOSSPAYMENTS_COUPON_WITH_HYUNDAI,
  formattedPaymentVendorFixture,
} from '../../../../../fixtures';
import {
  EASY_KURLYPAY_VENDOR,
  KAKAOPAY_VENDOR,
  KURLYPAY_CERDIT_VENDOR,
  NAVERPAY_VENDOR,
  PAYCO_VENDOR,
  TOSSPAYMENTS_VENDOR,
  TOSS_VENDOR,
} from '../../../../../fixtures/checkout/payment-vendors';
import { BC_CARD, HYUNDAI_CARD } from '../../../../../fixtures/checkout/credit-cards';
import {
  KURLYPAY_BC_CREDITCARD,
  KURLYPAY_PLCC_CREDITCARD,
  KURLYPAY_VENDORS_WITH_PLCC,
} from '../../../../../fixtures/checkout/kurlypayVendors.fixtures';

describe('isEqualCouponAndVendor thunk test', () => {
  let store: MockStoreEnhanced<unknown, any>;

  const mockStore = createMockStore(getDefaultMiddleware());

  beforeEach(() => {
    store = mockStore(() => ({
      checkoutCoupon: {
        selectedCoupon: given.selectedCoupon,
      },
      checkoutPayment: {
        vendors: formattedPaymentVendorFixture.vendors,
        creditCards: formattedPaymentVendorFixture.creditCards,
        kurlypayVendors: given.kurlypayVendors,
        selectedVendor: given.selectedVendor,
        selectedCreditCard: given.selectedCreditCard,
        selectedKurlypayVendor: given.selectedKurlypayVendor,
      },
    }));
  });

  context('일반-BC 신용카드 전용 쿠폰 일 때', () => {
    given('selectedCoupon', () => BC_COUPON);

    context('결제수단이 [일반 - BC신용카드] 이면', () => {
      given('selectedVendor', () => KURLYPAY_CERDIT_VENDOR);
      given('selectedCreditCard', () => BC_CARD);

      it('사용 가능하다.', () => {
        const result = store.dispatch(isEqualCouponAndVendor());

        expect(result).toBeTruthy();
      });
    });

    context('결제수단이 [컬리페이 - BC신용카드] 이면', () => {
      given('selectedVendor', () => EASY_KURLYPAY_VENDOR);
      given('selectedKurlypayVendor', () => KURLYPAY_BC_CREDITCARD);

      it('사용 가능하다.', () => {
        const result = store.dispatch(isEqualCouponAndVendor());

        expect(result).toBeTruthy();
      });
    });

    context('결제수단이 [컬리페이-PLCC신용카드] 이면', () => {
      given('selectedVendor', () => EASY_KURLYPAY_VENDOR);
      given('selectedKurlypayVendor', () => KURLYPAY_PLCC_CREDITCARD);

      it('사용 가능하다.', () => {
        const result = store.dispatch(isEqualCouponAndVendor());

        expect(result).toBeTruthy();
      });
    });
  });

  context('일반 신용카드 전용 쿠폰 일 때', () => {
    given('selectedCoupon', () => TOSSPAYMENTS_COUPON_WITH_HYUNDAI);

    context('결제수단이 같으면', () => {
      given('selectedVendor', () => TOSSPAYMENTS_VENDOR);
      given('selectedCreditCard', () => HYUNDAI_CARD);

      it('사용 가능하다.', () => {
        const result = store.dispatch(isEqualCouponAndVendor());

        expect(result).toBeTruthy();
      });
    });

    context('결제수단이 다르면', () => {
      given('selectedVendor', () => EASY_KURLYPAY_VENDOR);
      given('selectedCreditCard', () => HYUNDAI_CARD);

      it('사용 불가능 하다.', () => {
        const result = store.dispatch(isEqualCouponAndVendor());

        expect(result).toBeFalsy();
      });
    });
  });

  context('컬리페이-BC 신용카드 전용 쿠폰 일 때', () => {
    given('selectedCoupon', () => KURLYPAY_BC_COUPON);
    given('kurlypayVendors', () => KURLYPAY_VENDORS_WITH_PLCC);

    context('결제수단이 [일반 - BC신용카드] 이면', () => {
      given('selectedVendor', () => KURLYPAY_CERDIT_VENDOR);
      given('selectedCreditCard', () => BC_CARD);

      it('사용 불가능하다.', () => {
        const result = store.dispatch(isEqualCouponAndVendor());

        expect(result).toBeFalsy();
      });
    });

    context('결제수단이 [컬리페이 - BC신용카드] 이면', () => {
      given('selectedVendor', () => EASY_KURLYPAY_VENDOR);
      given('selectedKurlypayVendor', () => KURLYPAY_BC_CREDITCARD);

      it('사용 가능하다.', () => {
        const result = store.dispatch(isEqualCouponAndVendor());

        expect(result).toBeTruthy();
      });
    });

    context('결제수단이 [컬리페이 - PLCC신용카드] 이면', () => {
      given('selectedVendor', () => EASY_KURLYPAY_VENDOR);
      given('selectedKurlypayVendor', () => KURLYPAY_PLCC_CREDITCARD);

      it('사용 가능하다.', () => {
        const result = store.dispatch(isEqualCouponAndVendor());

        expect(result).toBeTruthy();
      });
    });
  });

  context('컬리페이-PLCC 신용카드 전용 쿠폰 일 때', () => {
    given('selectedCoupon', () => PLCC_COUPON);
    given('kurlypayVendors', () => KURLYPAY_VENDORS_WITH_PLCC);

    context('결제수단이 [일반 - BC신용카드] 이면', () => {
      given('selectedVendor', () => KURLYPAY_CERDIT_VENDOR);
      given('selectedCreditCard', () => BC_CARD);

      it('사용 불가하다.', () => {
        const result = store.dispatch(isEqualCouponAndVendor());

        expect(result).toBeFalsy();
      });
    });

    context('결제수단이 [컬리페이 - BC신용카드] 이면', () => {
      given('selectedVendor', () => EASY_KURLYPAY_VENDOR);
      given('selectedKurlypayVendor', () => KURLYPAY_BC_CREDITCARD);

      it('사용 불가하다.', () => {
        const result = store.dispatch(isEqualCouponAndVendor());

        expect(result).toBeFalsy();
      });
    });

    context('결제수단이 [컬리페이 - PLCC신용카드] 이면', () => {
      given('selectedVendor', () => EASY_KURLYPAY_VENDOR);
      given('selectedKurlypayVendor', () => KURLYPAY_PLCC_CREDITCARD);

      it('사용 가능하다.', () => {
        const result = store.dispatch(isEqualCouponAndVendor());

        expect(result).toBeTruthy();
      });
    });
  });

  context('카카오페이 전용 쿠폰 일 때', () => {
    given('selectedCoupon', () => KAKAOPAY_COUPON);

    context('결제수단이 카카오페이 이면', () => {
      given('selectedVendor', () => KAKAOPAY_VENDOR);

      it('사용 가능하다.', () => {
        const result = store.dispatch(isEqualCouponAndVendor());

        expect(result).toBeTruthy();
      });
    });

    context.each`
      selectedVendor
      ${NAVERPAY_VENDOR}
      ${TOSS_VENDOR}
      ${PAYCO_VENDOR}
      ${KURLYPAY_CERDIT_VENDOR}
      ${EASY_KURLYPAY_VENDOR}
    `('그 외 결제수단이면', ({ selectedVendor }) => {
      given('selectedVendor', () => selectedVendor);

      it('사용 불가하다.', () => {
        const result = store.dispatch(isEqualCouponAndVendor());

        expect(result).toBeFalsy();
      });
    });
  });

  context('네이버페이 전용 쿠폰 일 때', () => {
    given('selectedCoupon', () => NAVERPAY_COUPON);

    context('결제수단이 네이버페이 이면', () => {
      given('selectedVendor', () => NAVERPAY_VENDOR);

      it('사용 가능하다.', () => {
        const result = store.dispatch(isEqualCouponAndVendor());

        expect(result).toBeTruthy();
      });
    });

    context.each`
      selectedVendor
      ${KAKAOPAY_VENDOR}
      ${TOSS_VENDOR}
      ${PAYCO_VENDOR}
      ${KURLYPAY_CERDIT_VENDOR}
      ${EASY_KURLYPAY_VENDOR}
    `('그 외 결제수단이면', ({ selectedVendor }) => {
      given('selectedVendor', () => selectedVendor);

      it('사용 불가하다.', () => {
        const result = store.dispatch(isEqualCouponAndVendor());

        expect(result).toBeFalsy();
      });
    });
  });
});
