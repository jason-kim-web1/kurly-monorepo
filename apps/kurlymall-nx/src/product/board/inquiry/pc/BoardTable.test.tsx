import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import BoardTable from './BoardTable';

jest.mock('react-redux');

describe('BoardTable', () => {
  let store: MockStoreEnhanced<unknown>;

  const mockStore = configureStore(getDefaultMiddleware());

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore(() => ({
      productDetail: {},
      productList: { queryId: 'aaaaaaa' },
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
  });

  given('boardItems', () => []);
  given('loading', () => false);
  given('pageSize', () => 10);

  const renderBoardTable = () =>
    render(<BoardTable items={given.boardItems} loading={given.loading} pageSize={given.pageSize} isError={false} />);

  it('render table heads', () => {
    const { container } = renderBoardTable();

    expect(container).toHaveTextContent('제목');
    expect(container).toHaveTextContent('작성자');
    expect(container).toHaveTextContent('작성일');
    expect(container).toHaveTextContent('답변상태');
  });

  context('when board items are empty', () => {
    given('boardItems', () => []);

    it('render empty text', () => {
      const { container } = renderBoardTable();

      expect(container).toHaveTextContent('등록된 문의가 없습니다.');
    });
  });
});
