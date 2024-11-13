import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import AddressContainer from './AddressContainer';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');

describe('AddressContainer', () => {
  let store: MockStoreEnhanced<unknown>;

  const renderAddressContainer = () => render(<AddressContainer />);

  given('addressInfomation', () => ({
    roadAddress: '한국타이어빌딩',
    addressDetail: '마켓컬리 15층',
  }));

  beforeEach(() => {
    store = mockStore(() => ({
      social: {
        signup: {
          form: {
            addressInfomation: given.addressInfomation,
          },
        },
      },
    }));

    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
  });

  it('renders', () => {
    renderAddressContainer();
  });

  it('shows address', () => {
    const { container } = renderAddressContainer();

    expect(container).toHaveTextContent('한국타이어빌딩');
    expect(container).toHaveTextContent('마켓컬리 15층');
  });
});
