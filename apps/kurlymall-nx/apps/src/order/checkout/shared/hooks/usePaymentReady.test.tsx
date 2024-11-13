import { renderHook } from '@testing-library/react-hooks';

import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import { loadAppToken } from '../../../shared/shared/services/appToken.storage.service';
import usePaymentReady from './usePaymentReady';
import { setAccessToken } from '../../../../shared/reducers/auth';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('next/router');
jest.mock('../../../shared/shared/services/appToken.storage.service');

describe('usePaymentReady', () => {
  given('accessToken', () => 'someAccessToken');
  given('isReady', () => false);

  let store: MockStoreEnhanced<unknown>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore(() => ({
      auth: {
        accessToken: given.accessToken,
      },
    }));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useRouter as jest.Mock).mockImplementation(() => ({
      isReady: given.isReady,
      query: {},
    }));
  });

  const renderUsePaymentReady = () => renderHook(() => usePaymentReady());

  context('isReady가 false인 경우', () => {
    given('isReady', () => false);

    it('paymentReady는 false를 반환한다.', () => {
      const { result } = renderUsePaymentReady();
      expect(result.current.paymentReady).toBe(false);
    });
  });

  context('isReady가 true이고', () => {
    given('isReady', () => true);

    context('accessToken이 없는 경우', () => {
      given('accessToken', () => '');

      context('loadAppToken에 accessToken이 없으면', () => {
        it('아무 액션도 일어나지 않고 paymentReady는 false를 반환한다.', () => {
          (loadAppToken as jest.Mock).mockImplementation(() => null);

          const { result } = renderUsePaymentReady();
          const actions = store.getActions();

          expect(actions).toHaveLength(0);
          expect(result.current.paymentReady).toBe(false);
        });
      });

      context('loadAppToken에 accessToken이 있으면', () => {
        it('setAccessToken를 호출하고 paymentReady는 false를 반환한다.', () => {
          (loadAppToken as jest.Mock).mockImplementation(() => 'someLocalAccessToken');

          const { result } = renderUsePaymentReady();
          const actions = store.getActions();

          expect(actions[0]).toEqual(
            setAccessToken({
              accessToken: 'someLocalAccessToken',
              isGuest: false,
            }),
          );
          expect(result.current.paymentReady).toBe(false);
        });
      });
    });

    context('accessToken이 있는 경우', () => {
      given('accessToken', () => 'someAccessToken');

      it('paymentReady는 true를 반환한다.', () => {
        const { result } = renderUsePaymentReady();
        expect(result.current.paymentReady).toBe(true);
      });
    });
  });
});
