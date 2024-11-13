import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { initialState, loadPersonalInformationTerms, loadPgTermsHTML, setValue } from './terms';

import { fetchPersonalInformationTermsHTML, fetchPgTermsHTML } from '../api';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('../api');

describe('terms reducer', () => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let store: MockStoreEnhanced<unknown, any>;

  given('personalInformationTermsHTML', () => '');
  given('pgTermsHTML', () => '');

  beforeEach(() => {
    store = mockStore(() => ({
      terms: {
        ...initialState,
        personalInformationTermsHTML: given.personalInformationTermsHTML,
        pgTermsHTML: given.pgTermsHTML,
      },
    }));
  });

  const data = '<div>Hello</div>';

  beforeEach(() => {
    (fetchPersonalInformationTermsHTML as jest.Mock).mockResolvedValue(data);
    (fetchPgTermsHTML as jest.Mock).mockResolvedValue(data);
  });

  describe('loadPersonalInformationTerms', () => {
    context('when terms is empty', () => {
      given('personalInformationTermsHTML', () => '');

      it('dispatch setValue action', async () => {
        await store.dispatch(loadPersonalInformationTerms());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setValue({ personalInformationTermsHTML: data }));
      });
    });

    context('when already has terms', () => {
      given('personalInformationTermsHTML', () => data);

      it('calls nothing', async () => {
        await store.dispatch(loadPersonalInformationTerms());

        const actions = store.getActions();

        expect(actions.length).toBe(0);
      });
    });
  });

  describe('loadPgTermsHTML', () => {
    context('when terms is empty', () => {
      given('pgTermsHTML', () => '');

      it('dispatch setValue action', async () => {
        await store.dispatch(loadPgTermsHTML());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setValue({ pgTermsHTML: data }));
      });
    });

    context('when already has terms', () => {
      given('pgTermsHTML', () => data);

      it('calls nothing', async () => {
        await store.dispatch(loadPgTermsHTML());

        const actions = store.getActions();

        expect(actions.length).toBe(0);
      });
    });
  });
});
