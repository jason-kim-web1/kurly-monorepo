import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { useRouter } from 'next/router';

import AdultVerificationContainer from './AdultVerificationContainer';

const mockStore = configureStore(getDefaultMiddleware());
jest.mock('react-redux');
jest.mock('next/router');

describe('AdultVerificationContainer', () => {
  let store: MockStoreEnhanced<unknown>;

  beforeEach(() => {
    store = mockStore(() => ({
      auth: {
        accessToken: '',
      },
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        result: '',
      },
    }));
  });

  it('render nothing without accessToken and session data', () => {
    const { container } = render(<AdultVerificationContainer />);

    expect(container).toBeEmptyDOMElement();
  });
});
