import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import MembersContainer from './MembersContainer';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');

describe('MembersContainer', () => {
  let store: MockStoreEnhanced<unknown>;

  const member = {
    memberId: 'gildong',
    status: 'ACTIVE',
    joinedAt: '2021.05.11',
  };

  beforeEach(() => {
    store = mockStore(() => ({
      find: {
        members: [member],
      },
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
  });

  const renderMembersContainer = () => render(<MembersContainer />);

  it('renders MembersContainer', () => {
    const { container } = renderMembersContainer();

    expect(container).toHaveTextContent(member.memberId);
    expect(container).toHaveTextContent(`가입일 ${member.joinedAt}`);
  });
});
