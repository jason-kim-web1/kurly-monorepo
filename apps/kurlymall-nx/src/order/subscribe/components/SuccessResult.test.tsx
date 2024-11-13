import { render, screen } from '@testing-library/react';

import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { useSelector } from 'react-redux';

import SuccessResult from './SuccessResult';

jest.mock('react-redux');

const mockStore = configureStore(getDefaultMiddleware());
describe('SuccessResult', () => {
  let store: MockStoreEnhanced<unknown>;

  given('isChangePayment', () => false);

  beforeEach(() => {
    jest.clearAllMocks();

    store = mockStore(() => ({
      subscribeResult: {
        isChangePayment: given.isChangePayment,
      },
    }));

    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
  });

  const renderSuccessResult = () => render(<SuccessResult />);

  context('결제수단 변경이면', () => {
    given('isChangePayment', () => true);
    it('"결제수단 변경이 완료되었습니다." 문구를 볼 수 있다.', () => {
      renderSuccessResult();

      expect(screen.queryByText(/결제수단 변경이 완료되었습니다./)).toBeInTheDocument();
    });
  });

  context('정기결제 주문이면', () => {
    it('"컬리멤버스 결제가 완료되었습니다." 문구를 볼 수 있다.', () => {
      renderSuccessResult();

      expect(screen.queryByText(/컬리멤버스 결제가 완료되었습니다./)).toBeInTheDocument();
    });
  });
});
