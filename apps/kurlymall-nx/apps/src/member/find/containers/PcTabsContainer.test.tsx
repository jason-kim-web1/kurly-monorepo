import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import PcTabsContainer from './PcTabsContainer';
import { selectTab } from '../reducers/find.slice';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');

describe('PcTabsContainer', () => {
  let store: MockStoreEnhanced<unknown>;

  const renderPcTabsContainer = () => render(<PcTabsContainer />);

  beforeEach(() => {
    store = mockStore(() => ({
      find: {
        selectedTab: '휴대폰 인증',
        idByPhone: {},
        passwordByPhone: {},
      },
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
  });

  it('renders PcTabsContainer', () => {
    const { container } = renderPcTabsContainer();

    expect(container).toHaveTextContent('휴대폰 인증');
  });

  describe('Clicking menu', () => {
    it('dispatches selectTab action', () => {
      const { getByText } = renderPcTabsContainer();

      fireEvent.click(getByText('이메일 인증'));

      const actions = store.getActions();

      expect(actions[0]).toEqual(selectTab('이메일 인증'));
    });
  });
});