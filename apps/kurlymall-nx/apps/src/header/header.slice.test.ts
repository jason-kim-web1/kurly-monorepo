import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import reducer, { changeSearchWord, initialState, loadUserNotification, setUserNotification } from './header.slice';

import { getUserNotification } from './services/notification.service';

import { userNotificationFixture } from '../../fixtures';
import { KURLYPAY_PAGES } from '../shared/hooks/useKurlypay';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('./services/notification.service');

describe('Header store', () => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let store: MockStoreEnhanced<unknown, any>;

  beforeEach(() => {
    store = mockStore({
      giftCheckout: initialState,
      auth: { accessToken: 'abcde' },
    });
  });

  beforeEach(() => {
    (getUserNotification as jest.Mock).mockReturnValue(userNotificationFixture);
  });

  describe('setValue', () => {
    it('updates with value', () => {
      const { searchWord } = reducer(initialState, changeSearchWord('검색어'));

      expect(searchWord).toBe('검색어');
    });
  });

  describe('setUserNotification', () => {
    context('when user has not badge', () => {
      const notification = {
        badge: {
          coupon: false,
          emoney: false,
        },
      };

      it('updates userNotification', () => {
        const state = reducer(initialState, setUserNotification(notification));

        expect(state.userNotification).toEqual(notification);
        expect(state.userMenus).toEqual(
          expect.arrayContaining([
            {
              title: '쿠폰',
              link: '/mypage/coupon',
              hasNew: false,
            },
            {
              title: '적립금 · 컬리캐시',
              link: KURLYPAY_PAGES.mypage,
              hasNew: false,
            },
          ]),
        );
      });
    });

    context('when user has coupon badge', () => {
      const notification = {
        badge: {
          coupon: true,
          emoney: false,
        },
      };

      it('updates coupon badge', () => {
        const state = reducer(initialState, setUserNotification(notification));

        expect(state.userMenus).toEqual(
          expect.arrayContaining([{ title: '쿠폰', link: '/mypage/coupon', hasNew: true }]),
        );
      });
    });

    context('when user has coupon badge', () => {
      const notification = {
        badge: {
          coupon: true,
        },
      };

      it('updates coupon badge', () => {
        const state = reducer(initialState, setUserNotification(notification));

        expect(state.userMenus).toEqual(
          expect.arrayContaining([{ title: '쿠폰', link: '/mypage/coupon', hasNew: true }]),
        );
      });
    });
  });

  describe('loadUserNotification', () => {
    context('when success', () => {
      it('calls actions', async () => {
        await store.dispatch(loadUserNotification());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setUserNotification(userNotificationFixture));
      });
    });

    context('when fail', () => {
      beforeEach(() => {
        (getUserNotification as jest.Mock).mockRejectedValue(new Error());
      });

      it('nothings happen', async () => {
        await store.dispatch(loadUserNotification());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });
  });
});
