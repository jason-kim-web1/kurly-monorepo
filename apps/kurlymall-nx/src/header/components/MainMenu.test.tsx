import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { useRouter } from 'next/router';

import { USER_MENUS } from '../constants';

import MainMenu from './MainMenu';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');

jest.mock('next/router');
const push = jest.fn();

describe('MainMenu', () => {
  let store: MockStoreEnhanced<unknown>;

  given('isGuest', () => true);
  given('userNotification', () => ({
    hasNew: false,
    badge: {
      member: false,
    },
  }));
  given('isSubscribed', () => true);

  const renderMainMenu = () => render(<MainMenu userNotification={given.userNotification} userMenus={USER_MENUS} />);

  beforeEach(() => {
    jest.clearAllMocks();

    store = mockStore(() => ({
      auth: {
        hasSession: true,
        isGuest: given.isGuest,
      },
      member: {
        info: {
          name: '홍길동',
          gradeName: '라벤더',
        },
        subscription: {
          isSubscribed: given.isSubscribed,
        },
      },
    }));

    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));

    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));
  });

  it('renders MainMenu', () => {
    const { container } = renderMainMenu();

    expect(container).toHaveTextContent('회원가입');
    expect(container).toHaveTextContent('로그인');
    expect(container).toHaveTextContent('고객센터');
  });

  context('when logged in', () => {
    given('isGuest', () => false);

    it('renders name and grade', () => {
      const { container } = renderMainMenu();

      expect(container).not.toHaveTextContent('회원가입');
      expect(container).not.toHaveTextContent('로그인');
      expect(container).toHaveTextContent('홍길동');
      expect(container).toHaveTextContent('라벤더');
    });

    context('when user has any badge', () => {
      given('isGuest', () => false);
      given('userNotification', () => ({
        hasNew: true,
        badge: {
          member: false,
        },
      }));

      it('renders new icon', () => {
        const { getByTestId } = renderMainMenu();

        expect(getByTestId('new-icon')).toBeInTheDocument();
      });
    });
  });
});
