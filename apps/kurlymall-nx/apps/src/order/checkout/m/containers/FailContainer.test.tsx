import { fireEvent, render } from '@testing-library/react';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import FailContainer from './FailContainer';
import { AppDispatch } from '../../../../shared/store';
import { initialState } from '../../../../shared/reducers/page';
import useFailResult from '../../shared/hooks/useFailResult';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('next/router');
jest.mock('../../shared/hooks/useFailResult');

describe('FailContainer', () => {
  const moveCartPage = jest.fn();
  const moveGiftProductPage = jest.fn();
  const moveDetailPage = jest.fn();

  const renderFailContainer = () => render(<FailContainer />);

  let store: MockStoreEnhanced<unknown, AppDispatch>;

  given('reason', () => '');
  given('resultCode', () => 0);
  given('orderNo', () => '12345');
  given('gift', () => false);
  given('isButtonLoading', () => false);
  given('failButtonState', () => ({
    text: '장바구니로 이동',
    handler: moveCartPage,
  }));

  beforeEach(() => {
    store = mockStore(() => ({
      payments: {
        paymentsResult: {
          reason: given.reason,
          resultCode: given.resultCode,
        },
      },
      page: initialState,
    }));

    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        orderNo: given.orderNo,
      },
    }));
    (useFailResult as jest.Mock).mockImplementation(() => ({
      isButtonLoading: given.isButtonLoading,
      failButtonState: given.failButtonState,
    }));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
  });

  it('주문 실패 메세지를 볼 수 있다', () => {
    const { getByText } = renderFailContainer();

    expect(getByText('주문이 실패했습니다.')).toBeInTheDocument();
    expect(getByText('다시 주문해주세요.')).toBeInTheDocument();
  });

  context('PG 에서 결제 실패 사유를 보내주면', () => {
    given('reason', () => '실패 사유가 있음');

    it('실패 사유를 볼 수 있다.', () => {
      const { getByText } = renderFailContainer();

      expect(getByText(given.reason)).toBeInTheDocument();
    });
  });

  context('버튼 상태이 로딩중인 경우', () => {
    given('isButtonLoading', () => true);

    it('버튼명이 노출되지 않는다.', () => {
      const { queryByText } = renderFailContainer();

      expect(queryByText(/로 이동/)).not.toBeInTheDocument();
    });
  });

  context('일반 결제 실패일 경우', () => {
    it('장바구니로 이동 버튼을 볼 수 있다.', () => {
      const { getByText } = renderFailContainer();

      expect(getByText('장바구니로 이동')).toBeInTheDocument();
    });

    it('장바구니로 이동 버튼을 누르면 장바구니로 이동한다.', () => {
      const { getByText } = renderFailContainer();

      fireEvent.click(getByText('장바구니로 이동'));
      expect(moveCartPage).toBeCalled();
    });
  });

  context('선물하기 결제 실패일 경우', () => {
    given('gift', () => true);
    given('failButtonState', () => ({
      text: '선물하기로 이동',
      handler: moveGiftProductPage,
    }));

    it('선물하기로 이동 버튼을 볼 수 있다.', () => {
      const { getByText } = renderFailContainer();

      expect(getByText('선물하기로 이동')).toBeInTheDocument();
    });

    it('선물하기로 이동 버튼을 누르면 선물하기로 이동한다.', () => {
      const { getByText } = renderFailContainer();

      fireEvent.click(getByText('선물하기로 이동'));
      expect(moveGiftProductPage).toBeCalled();
    });
  });

  context('바로구매 결제 실패일 경우', () => {
    given('failButtonState', () => ({
      text: '상품상세로 이동',
      handler: moveDetailPage,
    }));

    it('바로구매 이동 버튼을 볼 수 있다.', () => {
      const { getByText } = renderFailContainer();

      expect(getByText('상품상세로 이동')).toBeInTheDocument();
    });

    it('상품상세로 이동 버튼을 누르면 상품상세로 이동한다.', () => {
      const { getByText } = renderFailContainer();

      fireEvent.click(getByText('상품상세로 이동'));
      expect(moveDetailPage).toBeCalled();
    });
  });
});
