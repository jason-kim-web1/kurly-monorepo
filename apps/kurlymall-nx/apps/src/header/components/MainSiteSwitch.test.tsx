import { render, screen } from '@testing-library/react';

import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { useDispatch } from 'react-redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import MainSiteSwitch from './MainSiteSwitch';

jest.mock('react-redux');

const mockStore = configureStore(getDefaultMiddleware());

describe('MainSiteSwitch', () => {
  let store: MockStoreEnhanced<unknown>;

  beforeEach(() => {
    store = mockStore(() => ({
      main: {
        site: 'MARKET',
      },
    }));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
  });

  const renderComponent = () => render(<MainSiteSwitch activeSite={given.activeSite} />);

  it('로고 표기', () => {
    renderComponent();
    const logo = screen.getByRole('img');

    expect(logo).toHaveAttribute('alt', '마켓컬리 로고');
  });

  it('마켓컬리 표기', () => {
    renderComponent();
    const market = screen.getByRole('button', { name: /마켓컬리/ });

    expect(market).toBeInTheDocument();
  });

  it('뷰티컬리 표기', () => {
    renderComponent();
    const beauty = screen.getByRole('button', { name: /뷰티컬리/ });

    expect(beauty).toBeInTheDocument();
  });

  context('활성 사이트가 마켓이면', () => {
    given('activeSite', () => 'MARKET');

    it('마켓컬리 텍스트가 활성화 된다', () => {
      renderComponent();
      const market = screen.getByRole('button', { name: /마켓컬리/ });
      expect(market).toHaveClass('active');
    });
  });

  context('활성 사이트가 뷰티이면', () => {
    given('activeSite', () => 'BEAUTY');

    it('뷰티컬리 텍스트가 활성화 된다', () => {
      renderComponent();
      const beauty = screen.getByRole('button', { name: /뷰티컬리/ });
      expect(beauty).toHaveClass('active');
    });
  });
});
