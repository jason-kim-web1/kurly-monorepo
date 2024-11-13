import createMockStore, { MockStoreEnhanced } from 'redux-mock-store';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { waitFor } from '@testing-library/react';

import checkoutCouponReducer, {
  initialState as checkoutCouponInitialState,
  notifyCouponMessage,
  selectCoupon,
  setCoupons,
  setSelectedCoupon,
} from './checkout-coupon.slice';

import {
  ALL_PAYMENTGATEWAYS_COUPON,
  checkoutCouponsFixture,
  KAKAOPAY_COUPON,
  KURLYPAY_COUPON_ALL,
  KURLYPAY_COUPON_WITH_HYUNDAI,
  KURLYPAY_COUPON_WITH_KB,
  KURLYPAY_COUPON_WITH_SHINHAN,
  NAVERPAY_COUPON,
  paymentMethodResponse,
  PLCC_COUPON,
  TOSS_COUPON,
  TOSSPAYMENTS_COUPON_WITH_HYUNDAI,
  TOSSPAYMENTS_COUPON_WITH_SHINHAN,
} from '../../../../../fixtures';
import { initialState as checkoutinitialState } from './checkout.slice';
import { initialState as checkoutPaymentInitialState } from './checkout-payment.slice';
import { calculatePrice, formattedPaymentVendors } from '../../../shared/shared/services';
import { DEFAULT_KURLYPAY_VENDORS } from '../../../../../fixtures/checkout/kurlypayVendors.fixtures';
import { readPaymentMethods } from '../../../../shared/api';
import { Grade } from '../../../../shared/enums';
import { CheckoutType } from '../../../../shared/interfaces';

jest.mock('../../../../shared/api');
jest.mock('../../../shared/shared/services', () => {
  const originalModule = jest.requireActual('../../../shared/shared/services');
  return {
    ...originalModule,
    calculatePrice: jest.fn(),
  };
});

describe('checkout coupon slice 테스트', () => {
  context('setCoupons 는', () => {
    it('쿠폰 목록을 변경한다.', () => {
      expect(checkoutCouponReducer(checkoutCouponInitialState, setCoupons(checkoutCouponsFixture))).toEqual({
        ...checkoutCouponInitialState,
        coupons: checkoutCouponsFixture,
      });
    });
  });

  context('setSelectCoupon 은', () => {
    it('선택한 쿠폰을 변경한다.', () => {
      expect(checkoutCouponReducer(checkoutCouponInitialState, setSelectedCoupon(KAKAOPAY_COUPON))).toEqual({
        ...checkoutCouponInitialState,
        selectedCoupon: KAKAOPAY_COUPON,
      });
    });
  });
});

describe('checkout coupon thunk 테스트', () => {
  let store: MockStoreEnhanced<unknown, any>;

  const mockStore = createMockStore(getDefaultMiddleware());

  const mockRecalculatedResponse = {
    totalPrice: 199960,
    discountPrice: 58500,
    expectedPoint: 2697,
    couponDiscountPrice: 7500,
    paymentPrice: 133960,
    deliveryPrice: 0,
    usedPlccPoint: 0,
  };

  given('products', () => [
    {
      price: 50000,
      discountedPrice: 0,
      quantity: 1,
      isAlcoholDealProduct: false,
    },
  ]);
  given('selectedPlccPoint', () => false);
  given('plccDiscountPrice', () => 0);

  given('vendors', () => []);
  given('creditCards', () => []);
  given('kurlypayVendors', () => []);

  given('selectedCoupon', () => undefined);
  given('formattedVendors', () =>
    formattedPaymentVendors(paymentMethodResponse.paymentMethods, paymentMethodResponse.kurlypayEasyPayment, {
      checkoutType: CheckoutType.NORMAL,
      isGiftOrder: false,
      isJoinOrder: false,
      userGrade: Grade.Normal,
      isSubscribed: false,
    }),
  );

  beforeEach(() => {
    store = mockStore(() => ({
      member: {
        pointBenefit: 0,
        point: 0,
        subscription: {
          isSubscribed: false,
        },
      },
      checkout: {
        ...checkoutinitialState,
        products: given.products,
        price: {
          totalPrice: 199960,
          discountPrice: 58500,
          expectedPoint: 2697,
          couponDiscountPrice: 0,
          paymentPrice: 133960,
          deliveryPrice: 0,
          usedPlccPoint: 0,
        },
      },
      checkoutCoupon: {
        ...checkoutCouponInitialState,
        selectedCoupon: given.selectedCoupon,
      },
      checkoutPayment: {
        ...checkoutPaymentInitialState,
        selectedPlccPoint: given.selectedPlccPoint,
        plccDiscountPrice: given.plccDiscountPrice,
        vendors: given.vendors,
        creditCards: given.creditCards,
        kurlypayVendors: given.kurlypayVendors,
        selectedVendor: given.selectedVendor,
        selectedCreditCard: given.selectedCreditCard,
        selectedKurlypayVendor: given.selectedKurlypayVendor,
      },
    }));

    (calculatePrice as jest.Mock).mockResolvedValue(mockRecalculatedResponse);
    (readPaymentMethods as jest.Mock).mockResolvedValue(paymentMethodResponse);
  });

  context('selectCoupon 은', () => {
    context('plcc 즉시할인을 사용하지 않으면', () => {
      it('쿠폰을 변경하고 결제금액을 재계산 한다.', async () => {
        store.dispatch(selectCoupon(ALL_PAYMENTGATEWAYS_COUPON));

        const actions = store.getActions();

        // selectCoupon thunk actions
        expect(actions[0]).toEqual({ type: 'checkout-coupon/setSelectedCoupon', payload: ALL_PAYMENTGATEWAYS_COUPON });
        expect(actions[1]).toEqual({ type: 'checkout/setPoints', payload: 0 });
        expect(actions[2]).toEqual({ type: 'checkout/setValue', payload: { isUseAllPoint: false } });
        expect(actions[3]).toEqual({ type: 'checkout/setValue', payload: { isUsePaidPoint: false } });

        await waitFor(() => {
          // recalculatePrice thunk actions
          expect(actions[4]).toEqual({ type: 'checkout/setPrice', payload: mockRecalculatedResponse });
          expect(actions[5]).toEqual({ type: 'checkout-payment/setPaymentVendors', payload: given.formattedVendors });
          expect(actions[6]).toEqual({
            type: 'checkout-payment/setDefaultPaymentMethodId',
            payload: null,
          });
          expect(actions[7]).toEqual({
            type: 'checkout-payment/setSelectedKurlypayVendor',
            payload: given.formattedVendors.kurlypayVendors[0],
          });
        });
      });
    });

    context('plcc 즉시할인을 사용하면', () => {
      given('selectedPlccPoint', () => true);

      context('최소 금액 31,000원 보다 낮은 경우', () => {
        given('plccDiscountPrice', () => 30000);
        given('products', () => [
          {
            id: 11081420,
            dealProductNo: 11081420,
            dealProductName: '돼지바 멀티팩 (6입)',
            contentProductNo: 5081424,
            contentProductName: '[롯데푸드] 아이스크림 골라담기 6종',
            price: 30500,
            discountedPrice: 0,
            quantity: 1,
            thumbnailUrl: 'https://img-cf.kurly.com/shop/data/goods/162694366519l0.jpg',
            isPickupProduct: false,
            isReservable: false,
            isAlcoholDealProduct: false,
          },
        ]);

        it('최소 금액 검증 문구를 볼 수 있다.', () => {
          store.dispatch(selectCoupon(ALL_PAYMENTGATEWAYS_COUPON));

          const actions = store.getActions();

          expect(actions[0]).toEqual({
            type: 'page/notify',
            payload:
              '쿠폰 적용 후 상품 금액이 첫 결제 할인 기준 금액보다 큰 경우에만 사용할 수 있습니다.\n(주류 상품은 할인 대상에서 제외됩니다.)',
          });
        });
      });

      // 비씨 카드 전용쿠폰 또는 전체사용 가능 쿠폰만 가능
      context.each`
        coupon
        ${PLCC_COUPON}
        ${TOSSPAYMENTS_COUPON_WITH_HYUNDAI}
        ${NAVERPAY_COUPON}
      `('중복할인과 같이 사용할 수 없는 카드이면', ({ coupon }) => {
        given('plccDiscountPrice', () => 30000);

        it('쿠폰검증 문구를 볼 수 있다.', () => {
          store.dispatch(selectCoupon(coupon));

          const actions = store.getActions();

          expect(actions[0]).toEqual({
            type: 'page/notify',
            payload: '선택하신 쿠폰할인과 중복 할인이 불가능 합니다. 쿠폰 해제 후 카드 혜택 할인을 선택해주세요',
          });
        });
      });

      context('즉시할인과 쿠폰 사용시 총 금액이 1000원 미만이면', () => {
        given('plccDiscountPrice', () => 30000);
        given('products', () => [
          {
            price: 33999,
            discountedPrice: 0,
            quantity: 1,
          },
        ]);

        it('금액검증 문구를 볼 수 있다.', () => {
          // 3000원 짜리 쿠폰
          store.dispatch(selectCoupon(ALL_PAYMENTGATEWAYS_COUPON));

          const actions = store.getActions();

          expect(actions[0]).toEqual({
            type: 'page/notify',
            payload: '상품금액이 쿠폰 할인 기준 금액보다 큰 경우에만 사용할 수 있습니다.',
          });
        });
      });
    });
  });

  context('notifyCouponMessage', () => {
    given('vendors', () => given.formattedVendors.vendors);
    given('creditCards', () => given.formattedVendors.creditCards);
    given('kurlypayVendors', () => given.formattedVendors.kurlypayVendors);

    context.each`
      coupon
      ${undefined}
      ${ALL_PAYMENTGATEWAYS_COUPON}
    `('선택한 쿠폰이 없거나 모든 결제수단에 사용 가능한 쿠폰이면', ({ coupon }) => {
      given('selectedCoupon', () => coupon);

      it('아무런 actions 도 수행하지 않는다.', () => {
        store.dispatch(notifyCouponMessage());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });

    context.each`
      coupon | message
      ${TOSSPAYMENTS_COUPON_WITH_HYUNDAI} | ${'현대카드 전용 쿠폰 사용 시, 현대카드 결제만 가능합니다. (법인카드 제외)'}
      ${TOSSPAYMENTS_COUPON_WITH_SHINHAN} | ${'신한카드 전용 쿠폰 사용 시, 신한카드 결제만 가능합니다. (법인카드 제외)'}
      ${KAKAOPAY_COUPON} | ${'카카오페이 전용 쿠폰 사용 시, 카카오페이 결제만 가능합니다.'}
      ${NAVERPAY_COUPON} | ${'네이버페이 전용 쿠폰 사용 시, 네이버페이 결제만 가능합니다.'}
      ${TOSS_COUPON} | ${'토스 전용 쿠폰 사용 시, 토스 결제만 가능합니다.'}
      ${PLCC_COUPON} | ${'컬리페이 컬리카드 전용 쿠폰 사용 시, 컬리페이 컬리카드 결제만 가능합니다. (법인카드 제외)'}
      ${KURLYPAY_COUPON_WITH_KB} | ${'컬리페이 KB국민카드 전용 쿠폰 사용 시, 컬리페이 KB국민카드 결제만 가능합니다. (법인카드 제외)'}
      ${KURLYPAY_COUPON_ALL} | ${'컬리페이 카드 전용 쿠폰 사용 시, 컬리페이 카드 결제만 가능합니다. (법인카드 제외)'}
    `('결제수단 전용 쿠폰이면', ({ coupon, message }) => {
      given('selectedCoupon', () => coupon);

      it(`${message} 메세지를 띄운다.`, async () => {
        store.dispatch(notifyCouponMessage());

        const actions = store.getActions();

        await waitFor(() => {
          expect(actions[0]).toEqual({
            type: 'page/notify',
            payload: message,
          });
        });
      });
    });

    context.each`
      selectedCoupon | message
      ${KURLYPAY_COUPON_WITH_SHINHAN} | ${'컬리페이 신한 (구, LG)카드 전용 쿠폰 사용 시, 컬리페이 신한 (구, LG)카드 결제만 가능합니다. (법인카드 제외)'}
      ${KURLYPAY_COUPON_WITH_HYUNDAI} | ${'컬리페이 현대카드 전용 쿠폰 사용 시, 컬리페이 현대카드 결제만 가능합니다. (법인카드 제외)'}
    `('컬리페이 전용쿠폰 일 때', ({ selectedCoupon, message }) => {
      given('selectedCoupon', () => selectedCoupon);

      context('컬리페이 결제수단에 없으면', () => {
        given('kurlypayVendors', () => DEFAULT_KURLYPAY_VENDORS);

        it(`${message} 메세지를 띄운다.`, async () => {
          store.dispatch(notifyCouponMessage());

          const actions = store.getActions();

          await waitFor(() => {
            expect(actions[0]).toEqual({
              type: 'page/notify',
              payload: message,
            });
          });
        });
      });
    });
  });
});
