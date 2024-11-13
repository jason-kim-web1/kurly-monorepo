import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import SearchFormContainer from './SearchFormContainer';
import { initialState, redirectTo } from '../../shared/reducers/page';
import { USER_MENU_PATH, getPageUrl } from '../../shared/constant';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('next/router');
jest.mock('../../shared/services');

const push = jest.fn();

describe('SearchFormContainer', () => {
  let store: MockStoreEnhanced<unknown>;

  given('searchWord', () => '');
  given('queryId', () => '');

  const renderSearchFormContainer = () => render(<SearchFormContainer sword={given.searchWord} sticky={false} />);

  beforeEach(() => {
    jest.clearAllMocks();

    store = mockStore(() => ({
      header: {
        searchWord: given.searchWord,
      },
      main: {
        site: 'MARKET',
      },
      productList: {
        queryId: given.queryId,
      },
      page: initialState,
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));
  });

  describe('Changing search word', () => {
    it('calls changeSearchWord', () => {
      const { getByPlaceholderText } = renderSearchFormContainer();

      const input = getByPlaceholderText('검색어를 입력해주세요') as HTMLInputElement;

      userEvent.type(input, '검색어');

      const inputValue = input.value;
      expect(inputValue).toBe('검색어');
    });
  });

  describe('Submit', () => {
    context('when search word is exists', () => {
      const word = 'word';
      const queryId = 'fusion_query_id';

      given('searchWord', () => word);
      given('queryId', () => queryId);
      it('moves to search page with enter key', async () => {
        const { getByPlaceholderText } = renderSearchFormContainer();
        const input = getByPlaceholderText('검색어를 입력해주세요');
        userEvent.type(input, '{enter}');

        await waitFor(() => {
          const actions = store.getActions();

          expect(actions[1]).toEqual(
            redirectTo({
              url: getPageUrl(USER_MENU_PATH.search),
              query: {
                sword: given.searchWord,
              },
            }),
          );
        });
      });

      it('moves to search page with click button', async () => {
        const { getByRole } = renderSearchFormContainer();
        const button = getByRole('button', {
          name: /submit/i,
        });
        userEvent.click(button);

        await waitFor(() => {
          const actions = store.getActions();

          expect(actions[1]).toEqual(
            redirectTo({
              url: getPageUrl(USER_MENU_PATH.search),
              query: {
                sword: given.searchWord,
              },
            }),
          );
        });
      });
    });
  });
});
