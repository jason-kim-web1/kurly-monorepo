import { useRouter } from 'next/router';

import { waitFor } from '@testing-library/react';

import useGuestCheckDuringWebPayment from './useGuestCheckDuringWebPayment';
import { isWebview } from '../../../../../util/window/getDevice';
import { ORDER_PATH } from '../../../../shared/constant';
import { renderHookWithProviders } from '../../../../../util/testutil';

jest.mock('next/router');
jest.mock('../../../../../util/window/getDevice');

describe('usePaymentReady', () => {
  given('isReady', () => false);
  given('isWebview', () => false);

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockImplementation(() => ({
      isReady: given.isReady,
    }));
    (isWebview as jest.Mock).mockImplementation(() => given.isWebview);
  });

  const renderUseGuestCheckDuringWebPayment = (preloadedState = {}) =>
    renderHookWithProviders(() => useGuestCheckDuringWebPayment({}), {
      preloadedState,
    });

  context('useRouter().isReady가 false인 경우', () => {
    given('isReady', () => false);

    it('paymentReady는 false를 반환한다.', () => {
      const { result } = renderUseGuestCheckDuringWebPayment();
      expect(result.current.paymentReady).toBe(false);
    });
  });

  context('accessToken이 없는 경우', () => {
    it('paymentReady는 false를 반환한다.', () => {
      const { result } = renderUseGuestCheckDuringWebPayment({
        auth: {
          accessToken: '',
        },
      });
      expect(result.current.paymentReady).toBe(false);
    });
  });

  context('useRouter().isReady가 true이고, accessToken이 있는 경우', () => {
    given('isReady', () => true);
    const accessToken = 'someAccessToken';

    context('isGuest가 false이면', () => {
      it('paymentReady는 true를 반환한다.', () => {
        const { result } = renderUseGuestCheckDuringWebPayment({
          auth: {
            isGuest: false,
            accessToken,
          },
        });
        expect(result.current.paymentReady).toBe(true);
      });
    });

    context('isWebview가 true이면', () => {
      given('isWebview', () => true);

      it('paymentReady는 true를 반환한다.', () => {
        const { result } = renderUseGuestCheckDuringWebPayment({
          auth: {
            isGuest: true,
            accessToken,
          },
        });
        expect(result.current.paymentReady).toBe(true);
      });
    });

    context('isGuest가 true이고, isWebview가 false이면', () => {
      given('isWebview', () => false);

      it('유효시간 만료 메세지와 함께 결제 실패 페이지로 이동하고 paymentReady는 false를 반환한다.', async () => {
        const { result, store } = renderUseGuestCheckDuringWebPayment({
          auth: {
            isGuest: true,
            accessToken,
          },
        });
        expect(result.current.paymentReady).toBe(false);

        await waitFor(() => {
          expect(store.getState().payments.paymentsResult.reason).toEqual(
            '유효시간이 만료되었습니다. 로그인을 다시 시도해주세요.',
          );
          expect(store.getState().page.redirection).toEqual({ url: ORDER_PATH.fail.uri, replace: true });
        });
      });
    });
  });
});
