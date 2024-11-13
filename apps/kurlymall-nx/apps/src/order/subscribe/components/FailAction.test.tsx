import { fireEvent, render, screen } from '@testing-library/react';

import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import FailAction from './FailAction';
import useNavigator from '../../../shared/hooks/useNavigator';

jest.mock('../../../shared/hooks/useNavigator');
jest.mock('react-redux');
jest.mock('next/router');

const mockStore = configureStore(getDefaultMiddleware());
describe('FailAction', () => {
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
  const renderFailAction = () => render(<FailAction />);

  const goToMyMembership = jest.fn();
  const goToMembership = jest.fn();
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));
    (useNavigator as jest.Mock).mockReturnValue({
      goToMyMembership,
      goToMembership,
    });
  });

  it('안내 문구를 볼 수 있다.', () => {
    renderFailAction();

    expect(screen.queryByText(/문의가 있을 경우,/)).toBeInTheDocument();
    expect(screen.queryByText(/1:1 문의에 남겨주시면 신속히 해결해드리겠습니다./)).toBeInTheDocument();
  });

  context('정기결제 주문 실패일 경우', () => {
    it('버튼을 클릭하면 "컬리멤버스 구독" 페이지로 이동하는 handler 함수가 실행된다.', () => {
      renderFailAction();

      const button = screen.getByText('확인');

      fireEvent.click(button);

      expect(goToMembership).toBeCalled();
    });
  });

  context('결제수단 변경 실패일 경우', () => {
    given('isChangePayment', () => true);

    it('버튼을 클릭하면 "마이 컬리멤버스" 페이지로 이동하는 handler 함수가 실행된다.', () => {
      renderFailAction();

      const button = screen.getByText('확인');

      fireEvent.click(button);

      expect(goToMyMembership).toBeCalled();
    });
  });
});
