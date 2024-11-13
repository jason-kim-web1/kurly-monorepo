import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { setPoints, setPrice, setValue } from '../reducers/checkout.slice';
import useCheckoutPoint from './useCheckoutPoint';

import { calculatePriceResponseMock, postPriceResponseMock } from '../../../../shared/api/checkout/__mocks__/checkout';
import { formattedPaymentVendors } from '../../../shared/shared/services';

import { paymentMethodResponse } from '../../../../../fixtures';
import { postPriceCalculate, readPaymentMethods } from '../../../../shared/api';
import { Grade } from '../../../../shared/enums';
import { CheckoutType } from '../../../../shared/interfaces';
import { setPaymentVendors } from '../reducers/checkout-payment.slice';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('../../../../shared/api');

describe('useCheckoutPoint Test', () => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let store: MockStoreEnhanced<unknown, any>;

  given('usedPoint', () => 0);
  given('availablePoint', () => ({ free: 2500, paid: 2500 }));

  given('totalPrice', () => 9900);
  given('paymentPrice', () => 12900);
  given('discountPrice', () => 0);

  given('selectedCoupon', () => undefined);
  given('selectedVendor', () => undefined);
  given('selectedCreditCard', () => undefined);
  given('pointBenefit', () => undefined);
  given('formattedVendors', () =>
    formattedPaymentVendors(paymentMethodResponse.paymentMethods, paymentMethodResponse.kurlypayEasyPayment, {
      checkoutType: CheckoutType.NORMAL,
      isGiftOrder: false,
      userGrade: Grade.Normal,
      isSubscribed: false,
      isJoinOrder: false,
    }),
  );
  given('isKurlypayMember', () => undefined);

  const renderUseCheckoutPoint = () => renderHook(() => useCheckoutPoint());

  beforeEach(() => {
    store = mockStore(() => ({
      auth: {
        isGuest: false,
      },
      checkout: {
        usedPoint: given.usedPoint,
        price: {
          totalPrice: given.totalPrice,
          paymentPrice: given.paymentPrice,
          discountPrice: given.discountPrice,
          deliveryPrice: 3000,
        },
        availablePoint: given.availablePoint,
      },
      checkoutPayment: {
        selectedVendor: given.selectedVendor,
        selectedCreditCard: given.selectedCreditCard,
        isKurlypayMember: given.isKurlypayMember,
      },
      checkoutCoupon: {
        selectedCoupon: given.selectedCoupon,
      },
      member: {
        pointBenefit: {
          percent: 1,
        },
        subscription: {
          isSubscribed: false,
        },
      },
    }));

    (postPriceCalculate as jest.Mock).mockResolvedValue(postPriceResponseMock);
    (readPaymentMethods as jest.Mock).mockResolvedValue(paymentMethodResponse);

    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
  });

  it('store의 availablePoint를 return 한다', () => {
    const { result } = renderUseCheckoutPoint();

    expect(result.current.availablePoint).toEqual(given.availablePoint);
  });

  describe('changePoints 테스트', () => {
    given('usedPoint', () => 1000);

    context('changePoints가 호출되면', () => {
      it('setPoints, recalculatePrice thunk 를 실행한다.', async () => {
        const { result } = renderUseCheckoutPoint();

        result.current.changePoints(given.usedPoint);

        await waitFor(() => {
          const actions = store.getActions();

          expect(actions[0]).toEqual(setPoints(given.usedPoint));
          expect(actions[1]).toEqual(setPoints(given.usedPoint));
          expect(actions[2]).toEqual(setValue({ isUseAllPoint: false }));
          expect(actions[3]).toEqual(setValue({ isUsePaidPoint: false }));
          expect(actions[4]).toEqual(setPrice(calculatePriceResponseMock));
          expect(actions[5]).toEqual(setPaymentVendors(given.formattedVendors));
        });
      });
    });
  });

  describe('changeTotalPoints 테스트', () => {
    context('포인트가 결제할 금액보다 많으면', () => {
      given('availablePoint', () => ({ free: 10000, paid: 10000 }));
      given('usedPoint', () => 0);
      given('paymentPrice', () => 12900);

      it('결제할 금액만 포인트를 쓸 수 있다.', async () => {
        const { result } = renderUseCheckoutPoint();

        result.current.changeTotalPoints();

        await waitFor(() => {
          const actions = store.getActions();

          expect(actions[0]).toEqual(setPoints(given.paymentPrice + given.usedPoint));
          given('usedPoint', () => 12900);

          expect(actions[1]).toEqual(setPoints(given.usedPoint));
          expect(actions[2]).toEqual(setValue({ isUseAllPoint: false }));
          expect(actions[3]).toEqual(setValue({ isUsePaidPoint: false }));
          expect(actions[4]).toEqual(setPrice(calculatePriceResponseMock));
          expect(actions[5]).toEqual(setPaymentVendors(given.formattedVendors));
        });
      });
    });

    context('포인트가 결제할 금액보다 적으면', () => {
      given('availablePoint', () => ({ free: 2500, paid: 2500 }));
      given('usedPoint', () => 0);
      given('paymentPrice', () => 12900);

      it('전체 포인트 모두 쓸 수 있다.', async () => {
        const { result } = renderUseCheckoutPoint();

        result.current.changeTotalPoints();

        await waitFor(() => {
          const actions = store.getActions();

          expect(actions[0]).toEqual(setPoints(given.availablePoint.free + given.availablePoint.paid));
          given('usedPoint', () => 5000);

          expect(actions[1]).toEqual(setPoints(given.usedPoint));
          expect(actions[2]).toEqual(setValue({ isUseAllPoint: false }));
          expect(actions[3]).toEqual(setValue({ isUsePaidPoint: false }));
          expect(actions[4]).toEqual(setPrice(calculatePriceResponseMock));
          expect(actions[5]).toEqual(setPaymentVendors(given.formattedVendors));
        });
      });
    });

    context('사용 적립금 + 실 결제금액이 갖고있는 전체 적립금보다 많으면', () => {
      given('availablePoint', () => ({ free: 2500, paid: 2500 }));
      given('paymentPrice', () => 5000);
      given('usedPoint', () => 1000);

      it('전체 적립금을 적립금으로 사용한다', async () => {
        const { result } = renderUseCheckoutPoint();

        result.current.changeTotalPoints();

        await waitFor(() => {
          const actions = store.getActions();

          expect(actions[0]).toEqual(setPoints(given.availablePoint.free + given.availablePoint.paid));
        });
      });
    });

    context('사용 적립금 + 실 결제금액이 갖고있는 전체 적립금보다 적으면', () => {
      given('availablePoint', () => ({ free: 2500, paid: 2500 }));
      given('paymentPrice', () => 2000);
      given('usedPoint', () => 1000);

      it('사용 적립금 + 실 결제금액을 적립금으로 사용한다', async () => {
        const { result } = renderUseCheckoutPoint();

        result.current.changeTotalPoints();

        await waitFor(() => {
          const actions = store.getActions();

          expect(actions[0]).toEqual(setPoints(given.paymentPrice + given.usedPoint));
        });
      });
    });

    context('사용 적립금/컬리캐시가 무상적립금보다 크면', () => {
      given('availablePoint', () => ({ free: 100, paid: 1000 }));
      given('paymentPrice', () => 2000);
      given('usedPoint', () => 1000);

      it('무상적립금 우선 사용 후 컬리캐시가 사용된다.', async () => {
        const { result } = renderUseCheckoutPoint();

        result.current.changeTotalPoints();

        await waitFor(() => {
          const actions = store.getActions();
          expect(actions[3]).toEqual(setValue({ isUsePaidPoint: true }));
        });
      });
    });

    context('사용 적립금/컬리캐시가 무상적립금보다 작으면', () => {
      given('availablePoint', () => ({ free: 100, paid: 1000 }));
      given('paymentPrice', () => 2000);
      given('usedPoint', () => 90);

      it('무상적립금만 사용된다', async () => {
        const { result } = renderUseCheckoutPoint();

        result.current.changeTotalPoints();

        await waitFor(() => {
          const actions = store.getActions();
          expect(actions[3]).toEqual(setValue({ isUsePaidPoint: false }));
        });
      });
    });
  });
});
