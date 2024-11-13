import { renderHook } from '@testing-library/react-hooks';

import { waitFor } from '@testing-library/react';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { useDispatch, useSelector } from 'react-redux';

import usePickProduct from './usePickProduct';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');

describe('usePickProduct Test', () => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let store: MockStoreEnhanced<unknown, any>;

  given('isGuest', () => true);
  given('isPicked', () => false);
  given('productNo', () => 1000001173);

  const renderUsePickProduct = () => renderHook(() => usePickProduct());

  beforeEach(() => {
    store = mockStore(() => ({
      auth: {
        isGuest: given.isGuest,
      },
      productDetail: {
        isPicked: given.isPicked,
      },
    }));

    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
  });

  describe('찜여부를 확인', () => {
    context('게스트 유저라면', () => {
      it('아무 동작하지 않는다.', async () => {
        renderUsePickProduct();

        await waitFor(() => {
          const actions = store.getActions();

          expect(actions).toEqual([]);
        });
      });
    });

    context('로그인 유저지만 상품번호를 가지지 않는 경우,', () => {
      given('isGuest', () => false);
      given('productNo', () => undefined);

      it('아무 동작하지 않는다.', async () => {
        renderUsePickProduct();

        await waitFor(() => {
          const actions = store.getActions();

          expect(actions).toEqual([]);
        });
      });
    });

    context('로그인 유저고, 상품번호를 가지는 경우,', () => {
      given('isGuest', () => false);
      given('productNo', () => 1000001173);

      it('상품의 찜 여부를 로드한다.', async () => {
        const { result } = renderUsePickProduct();

        await waitFor(() => {
          expect(result.current.isActiveLike).toBe(false);
        });
      });
    });
  });

  describe('찜하기를 실행한다면,', () => {
    context('게스트 유저라면', () => {
      given('isGuest', () => true);

      it('로그인 요청 Alert을 보여준다', async () => {
        const { result } = renderUsePickProduct();

        result.current.toggleLike();

        await waitFor(() => {
          const actions = store.getActions();

          expect(actions).toHaveLength(1);
          expect(actions[0].type).toEqual('page/redirectToLogin');
        });
      });
    });

    context('로그인 유저라면', () => {
      given('isGuest', () => false);
      given('productNo', () => 1000001173);
      given('isPicked', () => false);

      it('찜하기를 토글한다.', async () => {
        const { result } = renderUsePickProduct();

        result.current.toggleLike();

        await waitFor(() => {
          const actions = store.getActions();

          expect(actions).toHaveLength(1);

          expect(actions[0].type).toEqual('product/setIsPicked');
          expect(!result.current.isActiveLike).toBe(true);
        });
      });
    });
  });
});
