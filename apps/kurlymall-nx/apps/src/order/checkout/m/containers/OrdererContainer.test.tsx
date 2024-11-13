/* eslint-disable react/display-name */
import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import useToggle from '../../shared/hooks/useToggle';

import OrdererContainer from './OrdererContainer';
import useCheckoutOrderer from '../../shared/hooks/useCheckoutOrderer';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('../../shared/hooks/useToggle');
jest.mock('../../shared/hooks/useCheckoutOrderer');

describe('OrdererContainer', () => {
  let store: MockStoreEnhanced<unknown>;

  given('useCheckoutOrdererResponse', () => ({
    isLoading: false,
    isError: false,
    data: undefined,
  }));
  given('hasSession', () => false);
  given('isOpen', () => true);
  given('isGiftOrder', () => false);

  const renderOrdererContainer = () => render(<OrdererContainer />);

  beforeEach(() => {
    store = mockStore(() => ({
      auth: {
        isGuest: false,
        hasSession: given.hasSession,
      },
      checkout: {
        isGiftOrder: false,
      },
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
    (useToggle as jest.Mock).mockImplementation(() => ({
      isOpen: given.isOpen,
      toggle: jest.fn(),
    }));
    (useCheckoutOrderer as jest.Mock).mockImplementation(() => given.useCheckoutOrdererResponse);
  });

  context('일반 주문서라면', () => {
    given('isGiftOrder', () => false);
    it('주문자 정보를 볼 수 있다.', () => {
      const { container } = renderOrdererContainer();

      expect(container).toHaveTextContent('주문자 정보');
    });
  });

  context('선물하기 주문서라면', () => {
    given('isGiftOrder', () => true);
    it('보내는 분 정보를 볼 수 있다.', () => {
      const { container } = renderOrdererContainer();

      expect(container).toHaveTextContent('보내는 분');
    });
  });

  context('로딩중이면', () => {
    given('useCheckoutOrdererResponse', () => ({
      isLoading: true,
      isError: false,
      data: undefined,
    }));
    given('isGiftOrder', () => false);

    it('로딩 컴포넌트를 볼 수 있다.', () => {
      const { container } = renderOrdererContainer();

      expect(container.getElementsByClassName('react-loading-skeleton').length).toBe(1);
    });
  });

  context('에러가 발생하면', () => {
    given('useCheckoutOrdererResponse', () => ({
      isLoading: false,
      isError: true,
      data: undefined,
    }));
    given('isGiftOrder', () => false);

    it('로딩 컴포넌트를 볼 수 있다.', () => {
      const { container } = renderOrdererContainer();

      expect(container.getElementsByClassName('react-loading-skeleton').length).toBe(1);
    });
  });

  context('일반 주문서이면', () => {
    given('useCheckoutOrdererResponse', () => ({
      isLoading: false,
      isError: false,
      data: {
        name: '이름',
        phone: '010-1234-5678',
        email: 'member@kurlycorp.com',
      },
    }));
    given('isGiftOrder', () => false);

    it('로딩 컴포넌트를 볼 수 없다.', () => {
      const { container } = renderOrdererContainer();

      expect(container.getElementsByClassName('react-loading-skeleton').length).toBe(0);
    });

    it('주문자 정보를 볼 수 있다.', () => {
      const { container } = renderOrdererContainer();
      const { name, phone, email } = given.useCheckoutOrdererResponse.data;

      expect(container).toHaveTextContent('주문자 정보');
      expect(container).toHaveTextContent(name);
      expect(container).toHaveTextContent(phone);
      expect(container).toHaveTextContent(email);
    });
  });

  context('선물하기 주문서이면', () => {
    given('useCheckoutOrdererResponse', () => ({
      isLoading: false,
      isError: false,
      data: {
        name: '이름',
        phone: '010-1234-5678',
        email: 'member@kurlycorp.com',
      },
    }));
    given('isGiftOrder', () => true);

    it('로딩 컴포넌트를 볼 수 없다.', () => {
      const { container } = renderOrdererContainer();

      expect(container.getElementsByClassName('react-loading-skeleton').length).toBe(0);
    });

    it('보내는 분 정보를 볼 수 있다.', () => {
      const { container } = renderOrdererContainer();
      const { name, phone, email } = given.useCheckoutOrdererResponse.data;

      expect(container).toHaveTextContent('보내는 분');
      expect(container).toHaveTextContent(name);
      expect(container).toHaveTextContent(phone);
      expect(container).toHaveTextContent(email);
    });
  });
});
