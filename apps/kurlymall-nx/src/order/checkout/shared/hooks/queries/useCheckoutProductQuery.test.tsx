import { useDispatch, useSelector } from 'react-redux';

import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import useCheckoutError from '../useCheckoutError';
import useCheckoutProductQuery from './useCheckoutProductQuery';

import { getCheckoutProducts } from '../../services/product.service';

import {
  giftProductDetailFixtures,
  memberPointBenefitFixture,
  productDetailFixtures,
} from '../../../../../../fixtures';
import { renderHookWithProviders } from '../../../../../../util/testutil';
import { OrderTypes } from '../../utils';
import { initialState } from '../../../../../shared/reducers/member';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('../../services/product.service');
jest.mock('../useCheckoutError');

const onError = jest.fn();

describe.skip('useCheckoutProductQuery', () => {
  let store: MockStoreEnhanced<unknown, any>;

  given('errorMessage', () => '');
  given('pointBenefit', () => memberPointBenefitFixture);
  given('orderType', () => OrderTypes.CHECKOUT);

  const defaultPreloadedState = {
    member: {
      ...initialState,
      pointBenefit: memberPointBenefitFixture,
    },
  };

  const renderUseCheckoutProductQuery = (preloadedState = {}) =>
    renderHookWithProviders(() => useCheckoutProductQuery(), { preloadedState });

  beforeEach(() => {
    store = mockStore(() => ({
      checkout: {
        orderType: given.orderType,
      },
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
    (useCheckoutError as jest.Mock).mockReturnValue({
      onError,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  context('일반 주문이면', () => {
    it('일반주문 상품 목록 조회 결과를 return 한다.', async () => {
      given('orderType', () => OrderTypes.CHECKOUT);
      (getCheckoutProducts as jest.Mock).mockResolvedValue(productDetailFixtures);

      const { result, waitFor } = renderUseCheckoutProductQuery();

      await waitFor(() => result.current.isSuccess);

      expect(result.current.data).toEqual(productDetailFixtures);
    });
  });

  context('선물하기 주문이면', () => {
    it('선물하기 상품 목록 조회 결과를 return 한다.', async () => {
      given('orderType', () => OrderTypes.GIFT);
      (getCheckoutProducts as jest.Mock).mockResolvedValue(giftProductDetailFixtures);

      const { result, waitFor } = renderUseCheckoutProductQuery();

      await waitFor(() => result.current.isSuccess);

      expect(result.current.data).toEqual(giftProductDetailFixtures);
    });
  });

  context('useMember의 결과 percent 값이 없으면', () => {
    it('percent 0 으로 요청한다.', async () => {
      given('orderType', () => OrderTypes.CHECKOUT);
      (getCheckoutProducts as jest.Mock).mockResolvedValue(productDetailFixtures);

      const percentZeroState = Object.assign(defaultPreloadedState);

      percentZeroState.member.pointBenefit.percent = 0;

      const { result, waitFor } = renderUseCheckoutProductQuery(percentZeroState);

      await waitFor(() => result.current.isSuccess);

      expect(getCheckoutProducts).toHaveBeenCalledWith({
        percent: 0,
        orderType: OrderTypes.CHECKOUT,
      });
    });
  });

  context('api 요청 실패 시', () => {
    context('에러일 경우', () => {
      const errorMessage = '주문 실패!';

      it('useCheckoutError 의 onError를 실행한다.', async () => {
        given('orderType', () => OrderTypes.CHECKOUT);
        (getCheckoutProducts as jest.Mock).mockRejectedValue(new Error(errorMessage));

        const { waitFor, result } = renderUseCheckoutProductQuery(defaultPreloadedState);

        await waitFor(() => result.current.isError);

        expect(onError).toBeCalled();
      });
    });
  });
});
