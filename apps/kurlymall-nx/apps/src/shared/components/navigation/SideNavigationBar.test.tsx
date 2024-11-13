import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

import SideNavigationBar from './SideNavigationBar';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');

const navigationOptions = [
  {
    id: 0,
    text: '공지사항',
    url: '',
  },
  {
    id: 1,
    text: '자주하는 질문',
    url: '',
  },
];

const push = jest.fn();

describe('SideNavigationBar', () => {
  let store: MockStoreEnhanced<unknown>;

  const renderNavigation = () => render(<SideNavigationBar title="고객센터" options={navigationOptions} />);

  beforeEach(() => {
    store = mockStore(() => ({
      member: {
        mypage: { isKurlypay: true },
      },
    }));

    (useRouter as jest.Mock).mockImplementation(() => ({
      isReady: true,
      pathname: '',
      push,
    }));

    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
  });

  it('render title', () => {
    const { container } = renderNavigation();

    expect(container).toHaveTextContent('고객센터');
  });

  it('render options', () => {
    const { container } = renderNavigation();

    navigationOptions.forEach(({ text }) => {
      expect(container).toHaveTextContent(text);
    });
  });
});
