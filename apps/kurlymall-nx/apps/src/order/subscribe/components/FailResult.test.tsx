import { render, screen } from '@testing-library/react';

import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { useSelector } from 'react-redux';

import FailResult from './FailResult';

jest.mock('react-redux');

const mockStore = configureStore(getDefaultMiddleware());

describe('FailResult', () => {
  let store: MockStoreEnhanced<unknown>;

  given('isChangePayment', () => false);
  given('errorMessage', () => null);

  beforeEach(() => {
    jest.clearAllMocks();

    store = mockStore(() => ({
      subscribeResult: {
        isChangePayment: given.isChangePayment,
        errorMessage: given.errorMessage,
      },
    }));

    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
  });

  const renderFailResult = () => render(<FailResult />);

  context('정기결제 주문 실패면', () => {
    it('"컬리멤버스 결제가 실패했습니다" 문구를 볼 수 있다.', () => {
      renderFailResult();

      expect(screen.queryByText(/컬리멤버스 결제가 실패했습니다./)).toBeInTheDocument();
    });
  });

  context('결제수단 변경 실패면', () => {
    given('isChangePayment', () => true);

    it('"결제수단 변경이 실패했습니다" 문구를 볼 수 있다.', () => {
      renderFailResult();

      expect(screen.queryByText(/결제수단 변경이 실패했습니다./)).toBeInTheDocument();
    });
  });

  context('실패에 대한 에러 메세지가 있으면', () => {
    given('errorMessage', () => '카드 승인 실패');

    it('해당 문구를 볼 수 있다.', () => {
      renderFailResult();

      expect(screen.queryByText('카드 승인 실패')).toBeInTheDocument();
    });
  });
});
