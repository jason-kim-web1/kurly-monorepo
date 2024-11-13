import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { renderHook } from '@testing-library/react-hooks';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { useSelector } from 'react-redux';

import useAcceptedProduct from './useAcceptedProduct';

import { productDetailFixture } from '../fixtures';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');

describe('useAcceptedProduct Test', () => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let store: MockStoreEnhanced<unknown, any>;

  given('changeATFOption', () => false);
  given('product', () => productDetailFixture);

  const renderUseAcceptedProduct = () => renderHook(() => useAcceptedProduct({ product: given.product }));

  beforeEach(() => {
    store = mockStore(() => ({
      productDetail: {
        changeATFOption: given.changeATFOption,
      },
    }));

    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
  });

  context('changeATFOption이 false인 경우', () => {
    given('changeATFOption', () => false);

    it('서버에서 내려온 값을 리턴한다.', async () => {
      const { result } = renderUseAcceptedProduct();

      expect(result.current.acceptedProduct).toStrictEqual(given.product);
    });
  });

  context('changeATFOption가 true인 경우', () => {
    given('changeATFOption', () => true);

    it('store의 상태를 리턴한다.', async () => {
      const { result } = renderUseAcceptedProduct();

      expect(result.current.acceptedProduct).toStrictEqual({ changeATFOption: true, memberCoupon: {} });
    });
  });
});
