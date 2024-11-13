import { render, screen } from '@testing-library/react';

import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { useSelector } from 'react-redux';

import SuccessBilling from './SuccessBilling';

jest.mock('react-redux');

const mockStore = configureStore(getDefaultMiddleware());

describe('SuccessBilling', () => {
  let store: MockStoreEnhanced<unknown>;

  given('isChangePayment', () => false);

  beforeEach(() => {
    jest.clearAllMocks();

    store = mockStore(() => ({
      subscribeResult: {
        price: 1900,
        date: '2024년 03월 29일',
        isChangePayment: given.isChangePayment,
      },
    }));

    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
  });

  const renderSuccessBilling = () => render(<SuccessBilling />);

  context('결제수단 변경이면', () => {
    given('isChangePayment', () => true);
    it('결제금액을 볼 수 없고, 다음 자동 결제일만 볼 수 있다.', () => {
      renderSuccessBilling();

      expect(screen.queryByText('결제금액')).not.toBeInTheDocument();
      expect(screen.queryByText('2024년 03월 29일')).toBeInTheDocument();
    });
  });

  context('정기결제 주문이면', () => {
    it('결제금액을 볼 수 있다.', () => {
      renderSuccessBilling();

      expect(screen.queryByText(/1,900/)).toBeInTheDocument();
      expect(screen.queryByText('2024년 03월 29일')).toBeInTheDocument();
    });
  });
});
