import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import reducer, { initialState, loadAuth, loadSession, setAccessToken, syncSession } from './auth';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('../api/auth/token');

describe('Auth reducer', () => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let store: MockStoreEnhanced<unknown, any>;

  beforeEach(() => {
    store = mockStore({
      auth: initialState,
    });
  });

  describe('setAccessToken', () => {
    it('updates accessToken', () => {
      const { accessToken, isGuest, uid } = reducer(
        initialState,
        setAccessToken({
          accessToken: 'abcde',
          isGuest: true,
          uid: 'abcde-12345',
        }),
      );

      expect(accessToken).toBe('abcde');
      expect(isGuest).toBe(true);
      expect(uid).toBe('abcde-12345');
    });
  });

  describe('loadAuth', () => {
    it('sets accessToken', async () => {
      await store.dispatch(loadAuth());

      const actions = store.getActions();

      expect(setAccessToken.match(actions[0])).toBe(true);
    });
  });

  describe('loadSession', () => {
    it('sets accessToken', async () => {
      await store.dispatch(loadSession());

      const actions = store.getActions();

      expect(setAccessToken.match(actions[0])).toBe(true);
    });
  });

  describe('syncSession', () => {
    const jwt = '12345';

    it('updates authentication', async () => {
      await store.dispatch(syncSession(jwt));

      const actions = store.getActions();

      expect(setAccessToken.match(actions[0])).toBe(true);
    });
  });
});
