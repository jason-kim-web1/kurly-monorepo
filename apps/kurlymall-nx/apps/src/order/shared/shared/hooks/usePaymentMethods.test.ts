import { renderHook } from '@testing-library/react-hooks';

import { useDispatch, useSelector } from 'react-redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import usePaymentMethods from './usePaymentMethods';
import { TOSSPAYMENTS_VENDOR, vendorsFixture } from '../../../../../fixtures/checkout/payment-vendors';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');

describe('usePaymentMethods', () => {
  const [KAKAO_PAY, NAVER_PAY] = vendorsFixture;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let store: MockStoreEnhanced<unknown, any>;

  given('simplePaymentVendors', () => []);
  given('selectedVendor', () => undefined);
  given('selectedCreditCard', () => undefined);
  given('selectedCoupon', () => undefined);
  given('event', () => ({
    'naver-pay': [
      {
        code: 'naver-pay',
        title: '네이버페이 이벤트',
        descriptions: ['이벤트 내용'],
      },
    ],
  }));
  given('paymentPrice', () => 10000);
  given('vendors', () => vendorsFixture);

  const renderUsePaymentMethods = () => renderHook(() => usePaymentMethods());

  beforeEach(() => {
    store = mockStore(() => ({
      checkout: {
        price: {
          paymentPrice: given.paymentPrice,
        },
        isGiftOrder: given.isGiftOrder,
      },
      checkoutCoupon: {
        selectedCoupon: given.selectedCoupon,
      },
      checkoutPayment: {
        selectedVendor: given.selectedVendor,
        selectedCreditCard: given.selectedCreditCard,
        simplePaymentVendors: given.simplePaymentVendors,
        event: given.event,
        vendors: given.vendors,
      },
    }));

    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
  });

  context('when selected vendor exists', () => {
    given('selectedVendor', () => NAVER_PAY);

    it('returns events', () => {
      const { result } = renderUsePaymentMethods();

      expect(result.current.events).toEqual([
        {
          vendorName: '네이버페이',
          title: '네이버페이 이벤트',
          descriptions: ['이벤트 내용'],
        },
      ]);
    });
  });

  context.skip('when selected vendor is simplePay', () => {
    given('selectedVendor', () => ({
      ...KAKAO_PAY,
      isSimplePay: true,
    }));
    given('simplePaymentVendors', () => [KAKAO_PAY]);

    it('returns events', () => {
      const { result } = renderUsePaymentMethods();

      expect(result.current.events).toEqual([
        {
          vendorName: KAKAO_PAY.name,
          title: '카카오페이 이벤트',
          descriptions: ['이벤트 내용'],
        },
      ]);
    });
  });

  context('when selected vendor is toss-payments', () => {
    given('selectedVendor', () => TOSSPAYMENTS_VENDOR);

    context('when event exists', () => {
      given('event', () => ({
        'toss-payments': [
          {
            code: 'toss-payments',
            title: '신용카드 이벤트',
            descriptions: ['이벤트 내용'],
          },
        ],
      }));

      it('returns events without vendorName', () => {
        const { result } = renderUsePaymentMethods();

        expect(result.current.events).toEqual([
          {
            title: '신용카드 이벤트',
            descriptions: ['이벤트 내용'],
          },
        ]);
      });
    });

    context('when event does not exists', () => {
      given('event', () => ({}));

      it('returns empty array', () => {
        const { result } = renderUsePaymentMethods();

        expect(result.current.events).toEqual([]);
      });
    });
  });

  context('when kakao-pay coupon selected', () => {
    given('selectedCoupon', () => ({
      name: '카카오페이 쿠폰',
      paymentGateways: ['kakao-pay'],
    }));

    it('returns true', () => {
      const { result } = renderUsePaymentMethods();

      expect(result.current.kakaoPayCouponSelected).toBe(true);
    });
  });

  describe('hasSimplePayEvent', () => {
    context('when simplePayEvent exists', () => {
      given('simplePaymentVendors', () => [{ ...NAVER_PAY, hasEvent: true }]);

      it('returns true', () => {
        const { result } = renderUsePaymentMethods();

        expect(result.current.hasSimplePayEvent).toBe(true);
      });
    });

    context('when simplePayEvent does not exist', () => {
      given('simplePaymentVendors', () => [{ ...NAVER_PAY, hasEvent: false }]);

      it('returns false', () => {
        const { result } = renderUsePaymentMethods();

        expect(result.current.hasSimplePayEvent).toBe(false);
      });
    });
  });
});
