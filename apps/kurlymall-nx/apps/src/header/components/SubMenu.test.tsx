import { render } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import SubMenu from './SubMenu';
import { initialState } from '../../shared/reducers/page';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');

const menus = [
  { title: '공지사항', link: '/main/page' },
  { title: '사용자메뉴', link: '/main/user' },
  { title: '쿠폰', link: '/main/coupon', hasNew: true },
];

describe('SubMenu', () => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let store: MockStoreEnhanced<unknown, any>;

  const renderSubMenu = () => render(<SubMenu menus={menus} />);

  beforeEach(() => {
    store = mockStore(() => ({ page: initialState }));

    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
  });

  it('renders menus', () => {
    const { container, getByTestId } = renderSubMenu();

    expect(container).toHaveTextContent('공지사항');
    expect(container).toHaveTextContent('사용자메뉴');
    expect(getByTestId('new-icon')).toBeInTheDocument();
  });
});
