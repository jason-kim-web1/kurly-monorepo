import { getDefaultMiddleware } from '@reduxjs/toolkit';
import createMockStore, { MockStoreEnhanced } from 'redux-mock-store';

import { waitFor } from '@testing-library/react';

import { notify } from '../../../../shared/reducers/page';

import checkoutPaymentReducer, {
  CheckoutPaymentState,
  initialState,
  loadCheckoutPaymentMethods,
  selectCreditCard,
  selectKurlyPay,
  selectPreviousVendor,
  selectSimplePay,
  selectVendor,
  setKurlypayCardInstallment,
  setPaymentVendors,
  setSelectedCreditCard,
  setSelectedInstallment,
  setSelectedKurlypayVendor,
  setSelectedVendor,
  togglePreferencePaymentMethods,
  toggleUsedPlccPoint,
  updateKurlyPassVendor,
} from './checkout-payment.slice';
import { initialState as checkoutinitialState } from './checkout.slice';
import {
  DEFAULT_KURLYPAY_VENDORS,
  KURLYPAY_KB_CREDITCARD,
} from '../../../../../fixtures/checkout/kurlypayVendors.fixtures';
import {
  EASY_KURLYPAY_VENDOR,
  KAKAOPAY_VENDOR,
  NAVERPAY_VENDOR,
  simpleVendorsFixture,
  TOSSPAYMENTS_VENDOR,
  vendorsFixture,
  vendorsFixtureWithKurlyPayCredit,
} from '../../../../../fixtures/checkout/payment-vendors';
import { CreditCardFixture, HYUNDAI_CARD, KB_CARD } from '../../../../../fixtures/checkout/credit-cards';
import { formattedKurlypayVendors, KurlypayPLCCVendor, paymentMethodResponse } from '../../../../../fixtures';
import { readPaymentMethods } from '../../../../shared/api';
import { formattedPaymentVendors } from '../../../shared/shared/services';
import { Grade } from '../../../../shared/enums';
import { CheckoutType } from '../../../../shared/interfaces';

const mockStore = createMockStore(getDefaultMiddleware());

jest.mock('../../../../shared/api');

describe('checkout payment slice 테스트', () => {
  context('reducer', () => {
    it('결제수단 데이터를 변경한다.', () => {
      const previousState: CheckoutPaymentState = {
        ...initialState,
        vendors: [],
        disableVendorCodes: [],
        event: {},
        creditCards: [],
        installments: {},
        freeInterestInstallments: [],
        simplePaymentVendors: [],
        kurlypayVendors: DEFAULT_KURLYPAY_VENDORS,
        plccDiscountPrice: 0,
        isPLCCExisted: false,
        hasRegisteredCashReceipt: false,
        hasKurlypayError: false,
        isKurlypayMember: false,
      };

      const payments = {
        vendors: vendorsFixture,
        disableVendorCodes: [],
        event: {},
        creditCards: CreditCardFixture,
        installments: {},
        freeInterestInstallments: [],
        simplePaymentVendors: [],
        kurlypayVendors: formattedKurlypayVendors,
        plccDiscountPrice: 0,
        isPLCCExisted: true,
        hasRegisteredCashReceipt: false,
        hasKurlypayError: false,
        isKurlypayMember: false,
      };

      expect(checkoutPaymentReducer(previousState, setPaymentVendors(payments))).toEqual({
        ...previousState,
        ...payments,
      });
    });

    it('setSelectedVendor 는 선택한 결제수단 상태로 변경한다.', () => {
      const previousState: CheckoutPaymentState = {
        ...initialState,
        selectedVendor: undefined,
      };

      expect(checkoutPaymentReducer(previousState, setSelectedVendor(KAKAOPAY_VENDOR))).toEqual({
        ...previousState,
        selectedVendor: KAKAOPAY_VENDOR,
      });
    });

    it('setSelectedCreditCard 는 선택한 신용카드로 변경한다. ', () => {
      const previousState: CheckoutPaymentState = {
        ...initialState,
        selectedCreditCard: undefined,
      };

      expect(checkoutPaymentReducer(previousState, setSelectedCreditCard(HYUNDAI_CARD))).toEqual({
        ...previousState,
        selectedCreditCard: HYUNDAI_CARD,
      });
    });

    it('setSelectedInstallment 는 선택한 할부로 변경한다. ', () => {
      const previousState: CheckoutPaymentState = {
        ...initialState,
        selectedInstallment: undefined,
      };

      expect(checkoutPaymentReducer(previousState, setSelectedInstallment({ name: '일시불', value: '0' }))).toEqual({
        ...previousState,
        selectedInstallment: { name: '일시불', value: '0' },
      });
    });

    it('setKurlypayCardInstallment 는 선택한 컬리페이 카드의 할부를 변경한다', () => {
      const previousState: CheckoutPaymentState = {
        ...initialState,
      };

      expect(checkoutPaymentReducer(previousState, setKurlypayCardInstallment({ name: '3개월', value: '3' }))).toEqual({
        ...previousState,
        kurlypayInstallment: { name: '3개월', value: '3' },
      });
    });

    it('setSelectedKurlypayVendor 는 선택한 컬리페이 카드를 변경한다', () => {
      const previousState: CheckoutPaymentState = {
        ...initialState,
        selectedKurlypayVendor: undefined,
      };

      const kurlypayVendor = formattedKurlypayVendors[1];

      expect(checkoutPaymentReducer(previousState, setSelectedKurlypayVendor(kurlypayVendor))).toEqual({
        ...previousState,
        selectedKurlypayVendor: kurlypayVendor,
      });
    });

    it('togglePreferencePaymentMethods 는 이전 결제수단 상태를 toggle 한다. ', () => {
      const previousState: CheckoutPaymentState = {
        ...initialState,
        isPreferencePayment: false,
      };

      expect(checkoutPaymentReducer(previousState, togglePreferencePaymentMethods())).toEqual({
        ...previousState,
        isPreferencePayment: true,
      });
    });

    it('toggleUsedPlccPoint 는 즉시결제 사용 여부를 toggle 한다. ', () => {
      const previousState: CheckoutPaymentState = {
        ...initialState,
        selectedPlccPoint: false,
      };

      expect(checkoutPaymentReducer(previousState, toggleUsedPlccPoint())).toEqual({
        ...previousState,
        selectedPlccPoint: true,
      });
    });
  });
});

describe('thunk test', () => {
  let store: MockStoreEnhanced<unknown, any>;

  given('selectedCoupon', () => undefined);
  given('vendors', () => vendorsFixture);
  given('creditCards', () => CreditCardFixture);
  given('kurlypayVendors', () => []);
  given('simplePaymentVendors', () => simpleVendorsFixture);
  given('selectedVendor', () => undefined);
  given('selectedCreditCard', () => undefined);
  given('selectedKurlypayVendor', () => undefined);
  given('isKurlypayMember', () => undefined);

  beforeEach(() => {
    store = mockStore(() => ({
      checkout: {
        ...checkoutinitialState,
      },
      checkoutPayment: {
        ...initialState,
        vendors: given.vendors,
        creditCards: given.creditCards,
        kurlypayVendors: given.kurlypayVendors,
        simplePaymentVendors: given.simplePaymentVendors,
        selectedVendor: given.selectedVendor,
        selectedCreditCard: given.selectedCreditCard,
        selectedKurlypayVendor: given.selectedKurlypayVendor,
        isKurlypayMember: given.isKurlypayMember,
      },
      checkoutCoupon: {
        selectedCoupon: given.selectedCoupon,
      },
      member: {
        subscription: {
          isSubscribed: false,
        },
        info: {
          grade: Grade.Normal,
        },
      },
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  describe('loadCheckoutPaymentMethods', () => {
    it('결제 수단 목록, 이벤트 등을 불러온다.', async () => {
      (readPaymentMethods as jest.Mock).mockResolvedValueOnce(paymentMethodResponse);

      await store.dispatch(loadCheckoutPaymentMethods());

      const actions = store.getActions();

      const data = formattedPaymentVendors(
        paymentMethodResponse.paymentMethods,
        paymentMethodResponse.kurlypayEasyPayment,
        {
          checkoutType: CheckoutType.NORMAL,
          isGiftOrder: false,
          isJoinOrder: false,
          userGrade: Grade.Normal,
          isSubscribed: false,
        },
      );

      expect(actions).toHaveLength(3);
      expect(actions[0]).toEqual(setPaymentVendors(data));
    });

    context('컬리페이 결제수단이 undefined 이면', () => {
      given('selectedKurlypayVendor', () => undefined);

      it('첫 번째 컬리페이 결제수단을 선택한다.', async () => {
        (readPaymentMethods as jest.Mock).mockResolvedValueOnce(paymentMethodResponse);

        await store.dispatch(loadCheckoutPaymentMethods());

        const actions = store.getActions();

        expect(actions).toHaveLength(3);
        expect(actions[2]).toEqual(setSelectedKurlypayVendor(formattedKurlypayVendors[0]));
      });
    });
  });

  describe('updateKurlyPassVendor - 컬리패스 주문서 - 자동 결제 수단 선택 처리', () => {
    context('toss-payments 신용카드이면', () => {
      given('vendors', () => vendorsFixture);

      it('결제 수단을 toss-payments 신용카드로 변경한다.', async () => {
        await store.dispatch(updateKurlyPassVendor());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setSelectedVendor(TOSSPAYMENTS_VENDOR));
      });
    });

    context('kurlypay-credit 신용카드이면', () => {
      const KURLYPAY_CREDIT = vendorsFixtureWithKurlyPayCredit[2];

      given('vendors', () => vendorsFixtureWithKurlyPayCredit);

      it('결제 수단을 kurlypay-credit 신용카드로 변경한다.', async () => {
        await store.dispatch(updateKurlyPassVendor());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setSelectedVendor(KURLYPAY_CREDIT));
      });
    });
  });

  describe('selectVendor - 결제 수단 선택', () => {
    context('선택한 쿠폰이 없으면', () => {
      given('selectedCoupon', () => undefined);

      it('setValue action이 실행되어 결제수단을 선택한다.', () => {
        store.dispatch(selectVendor(KAKAOPAY_VENDOR.code));

        const actions = store.getActions();

        expect(actions).toHaveLength(1);
        expect(actions[0]).toEqual(setSelectedVendor(KAKAOPAY_VENDOR));
      });
    });

    context('선택한 결제수단과 쿠폰의 사용 가능한 결제 수단이 같으면', () => {
      given('selectedCoupon', () => ({
        paymentGateways: [KAKAOPAY_VENDOR.code],
      }));
      given('selectedVendor', () => KAKAOPAY_VENDOR);

      it('setSelectedVendor action이 실행되어 결제수단을 선택한다.', () => {
        store.dispatch(selectVendor(KAKAOPAY_VENDOR.code));

        const actions = store.getActions();

        expect(actions).toHaveLength(1);
        expect(actions[0]).toEqual(setSelectedVendor(KAKAOPAY_VENDOR));
      });
    });

    context('선택한 결제수단이 일반 신용카드 전용 쿠폰이고 결제수단은 컬리페이의 신용카드 일 때', () => {
      given('selectedCoupon', () => ({
        paymentGateways: [TOSSPAYMENTS_VENDOR.code],
        creditCardId: HYUNDAI_CARD.value,
      }));
      context('신용카드사가 다르면', () => {
        given('selectedKurlypayVendor', () => KURLYPAY_KB_CREDITCARD);

        it('결제수단 한정 알림 메세지를 띄우기 위한 notify action을 dispatch한다.', async () => {
          store.dispatch(selectVendor(EASY_KURLYPAY_VENDOR.code));

          const actions = store.getActions();

          await waitFor(() => {
            expect(actions).toHaveLength(2);
            expect(actions[0]).toEqual(setSelectedVendor(EASY_KURLYPAY_VENDOR));
            expect(notify.match(actions[1])).toBe(true);
          });
        });
      });
    });

    context('선택한 결제수단과 쿠폰의 사용 가능한 결제 수단이 다르면', () => {
      given('selectedCoupon', () => ({
        paymentGateways: [KAKAOPAY_VENDOR.code],
      }));

      it('결제수단 한정 알림 메세지를 띄우기 위한 notify action을 dispatch한다.', async () => {
        store.dispatch(selectVendor(NAVERPAY_VENDOR.code));

        const actions = store.getActions();

        await waitFor(() => {
          expect(actions).toHaveLength(2);
          expect(actions[0]).toEqual(setSelectedVendor(NAVERPAY_VENDOR));
          expect(notify.match(actions[1])).toBe(true);
        });
      });
    });

    context('선택한 쿠폰이 신용카드 한정 결제 수단 쿠폰이고 선택한 결제 수단과 다르면', () => {
      given('selectedCoupon', () => ({
        creditCardId: CreditCardFixture[0].value,
        paymentGateways: [TOSSPAYMENTS_VENDOR.code],
      }));

      it('신용카드 결제 수단만 사용 가능하다는 알림을 띄운다.', async () => {
        store.dispatch(selectVendor(NAVERPAY_VENDOR.code));

        const actions = store.getActions();

        await waitFor(() => {
          expect(actions).toHaveLength(2);
          expect(actions[0]).toEqual(setSelectedVendor(NAVERPAY_VENDOR));
          expect(notify.match(actions[1])).toBe(true);
        });
      });
    });

    context('잘못된 결제수단 코드를 전달할 경우', () => {
      it('아무것도 실행하지 않는다.', () => {
        store.dispatch(selectVendor('WRONG_CODE' as any));

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });

    context('잘못된 쿠폰을 선택한 경우', () => {
      given('selectedCoupon', () => ({
        paymentGateways: ['WRONG_PAYMENT_GATEWAY'],
      }));

      it('setSelectedVendor을 dispatch 한다.', () => {
        store.dispatch(selectVendor(NAVERPAY_VENDOR.code));

        const actions = store.getActions();

        expect(actions).toHaveLength(1);
        expect(actions[0]).toEqual(setSelectedVendor(NAVERPAY_VENDOR));
      });
    });

    context('잘못된 신용카드 쿠폰을 선택한 경우', () => {
      given('selectedCoupon', () => ({
        creditCardID: 'WRONG_ID',
        paymentGateways: [TOSSPAYMENTS_VENDOR.code],
      }));

      it('setSelectedVendor을 dispatch 한다.', () => {
        store.dispatch(selectVendor(NAVERPAY_VENDOR.code));

        const actions = store.getActions();

        expect(actions).toHaveLength(1);
        expect(actions[0]).toEqual(setSelectedVendor(NAVERPAY_VENDOR));
      });
    });
  });

  describe('selectSimplePay - 간편 결제수단 선택', () => {
    context('간편 결제 수단 목록이 있으면', () => {
      it('간편 결제수단 목록 중 첫 번째 결제 수단을 선택한다.', () => {
        store.dispatch(selectSimplePay());

        const actions = store.getActions();

        expect(actions).toHaveLength(1);
        expect(actions[0]).toEqual(setSelectedVendor(simpleVendorsFixture[0]));
      });
    });

    context('간편 결제 수단 목록이 없으면', () => {
      given('simplePaymentVendors', () => []);

      it('아무것도 실행하지 않는다.', () => {
        store.dispatch(selectSimplePay());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });

    context('이미 선택된 결제 수단이 간편 결제 수단이면', () => {
      given('selectedVendor', () => simpleVendorsFixture[0]);

      it('아무것도 하지 않는다.', () => {
        store.dispatch(selectSimplePay());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });
  });

  describe('selectKurlyPay - 컬리페이 결제수단 선택', () => {
    const selected = formattedKurlypayVendors[1];

    context('선택 된 결제수단이 kurlypay 가 아니면', () => {
      given('selectedVendor', () => KAKAOPAY_VENDOR);

      it('선택 된 결제수단을 kurlypay 로 바꾼다.', () => {
        store.dispatch(selectKurlyPay(selected));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setSelectedVendor(EASY_KURLYPAY_VENDOR));
      });
    });

    context('선택 된 컬리페이 카드가 있으면', () => {
      given('selectedVendor', () => EASY_KURLYPAY_VENDOR);

      it('컬리페이 신용카드 할부를 일시불로 바꾼다', () => {
        store.dispatch(selectKurlyPay(selected));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setSelectedKurlypayVendor(selected));
        expect(actions[1]).toEqual(setKurlypayCardInstallment({ name: '일시불', value: '0' }));
      });
    });
  });

  describe('selectCreditCard - 신용 카드 선택', () => {
    context('selectedCreditCard 가 undefined 이면', () => {
      given('selectedCreditCard', () => undefined);

      it('setSelectedCreditCard와 setSelectedInstallment 가 dispatch 된다.', () => {
        store.dispatch(selectCreditCard(KB_CARD));

        const actions = store.getActions();

        expect(actions.length).toBe(2);

        expect(actions[0]).toEqual(setSelectedCreditCard(KB_CARD));
        expect(actions[1]).toEqual(setSelectedInstallment({ name: '일시불', value: '0' }));
      });
    });

    context('이미 선택된 신용카드를 선택하면', () => {
      given('selectedCreditCard', () => KB_CARD);

      it('아무것도 실행하지 않는다.', () => {
        store.dispatch(selectCreditCard(KB_CARD));

        const actions = store.getActions();

        expect(actions.length).toBe(0);
      });
    });

    context('선택된 결제수단 쿠폰과 다른 신용카드를 선택하면', () => {
      given('selectedCoupon', () => ({
        paymentGateways: ['toss-payments'],
        creditCardId: HYUNDAI_CARD.value,
      }));
      given('selectedCreditCard', () => HYUNDAI_CARD);

      it('카드 전용 쿠폰을 선택하라는 알림을 띄우고 전용 결제수단으로 값을 업데이트 한다.', async () => {
        store.dispatch(selectCreditCard(KB_CARD));

        const actions = store.getActions();

        await waitFor(() => {
          expect(actions.length).toBe(3);

          expect(actions[0]).toEqual(setSelectedCreditCard(KB_CARD));
          expect(actions[1]).toEqual(setSelectedInstallment({ name: '일시불', value: '0' }));
          expect(actions[2]).toEqual(
            notify(
              `${HYUNDAI_CARD.name}카드 전용 쿠폰 사용 시, ${HYUNDAI_CARD.name}카드 결제만 가능합니다. (법인카드 제외)`,
            ),
          );
        });
      });
    });

    context('결제수단 쿠폰의 신용카드 ID가 잘못되었다면', () => {
      given('selectedCoupon', () => ({
        paymentGateways: ['toss-payments'],
        creditCardId: '9999',
      }));
      given('selectedCreditCard', () => HYUNDAI_CARD);

      it('전용 쿠폰의 결제 수단으로 값을 업데이트 한다.', () => {
        store.dispatch(selectCreditCard(KB_CARD));

        const actions = store.getActions();

        expect(actions.length).toBe(2);

        expect(actions[0]).toEqual(setSelectedCreditCard(KB_CARD));
        expect(actions[1]).toEqual(setSelectedInstallment({ name: '일시불', value: '0' }));
      });
    });
  });

  describe('selectPreviousVendor - 이전 결제 수단 선택', () => {
    context('이전 결제수단이 없으면', () => {
      it('아무것도 실행하지 않는다', () => {
        store.dispatch(
          selectPreviousVendor({
            paymentGatewayId: '',
          }),
        );
      });
    });

    context('이전 결제수단이 신용카드면', () => {
      it('selectVendor, selectCreditCards, setSelectedInstallment actions을 실행한다', () => {
        store.dispatch(
          selectPreviousVendor({
            paymentGatewayId: 'toss-payments',
            companyId: HYUNDAI_CARD.value,
          }),
        );

        const actions = store.getActions();

        expect(actions).toHaveLength(3);

        expect(actions[0]).toEqual(setSelectedVendor(TOSSPAYMENTS_VENDOR));
        expect(actions[1]).toEqual(setSelectedCreditCard(HYUNDAI_CARD));
        expect(actions[2]).toEqual(setSelectedInstallment({ name: '일시불', value: '0' }));
      });
    });

    context('이전 결제수단이 컬리페이 간편결제 수단이면', () => {
      given('kurlypayVendors', () => formattedKurlypayVendors);

      it('selectKurlyPay actions을 실행한다.', () => {
        store.dispatch(
          selectPreviousVendor({
            paymentGatewayId: 'kurlypay',
            companyId: 'P1',
          }),
        );

        const actions = store.getActions();

        expect(actions).toHaveLength(2);

        expect(actions[0]).toEqual(setSelectedVendor(EASY_KURLYPAY_VENDOR));
        expect(actions[1]).toEqual(setSelectedKurlypayVendor(KurlypayPLCCVendor));
      });
    });

    context('이전 결제수단이 간편 결제수단이면', () => {
      it('selectVendor actions 만 실행한다', () => {
        store.dispatch(
          selectPreviousVendor({
            paymentGatewayId: 'naver-pay',
          }),
        );

        const actions = store.getActions();

        expect(actions).toHaveLength(1);
        expect(actions[0]).toEqual(setSelectedVendor(NAVERPAY_VENDOR));
      });
    });
  });
});
