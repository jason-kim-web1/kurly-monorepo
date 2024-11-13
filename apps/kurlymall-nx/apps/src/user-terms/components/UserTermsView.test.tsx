import { render, screen } from '@testing-library/react';

import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import UserTermsView from './UserTermsView';
import { getUserTerms, getUserTermsDetails, setVersion } from '../../../src/user-terms/slice';

const html = `
  6차 이용약관 (2021년 6월 22일)
  29회 개인정보처리방침 (2022년 05년 04일)
`;

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('../../../src/user-terms/slice');
jest.mock('../../shared/api/user-terms/terms');

let store: MockStoreEnhanced<unknown>;

beforeEach(() => {
  jest.clearAllMocks();

  store = mockStore(() => ({
    terms: given.userTermsType,
  }));

  (getUserTerms as jest.Mock).mockImplementation((userTerms) => userTerms(store.getState()));
  (getUserTermsDetails as jest.Mock).mockImplementation(() => store.dispatch);

  (setVersion as unknown as jest.Mock).mockResolvedValue('');
});

describe('UserTermsView', () => {
  const renderUserTermsView = () => render(<UserTermsView html={html} />);

  context('userTermsType이 Agreement일 때', () => {
    given('UserTerms', () => [{ userTermsType: '이용약관' }]);
    it('이용약관을 렌더링한다.', () => {
      renderUserTermsView();
      screen.queryByRole('title', { name: '이용약관' });
    });
  });

  context('userTermsType이 Privacy-Policy일 때', () => {
    given('UserTerms', () => [{ userTermsType: '개인정보처리방침' }]);
    it('개인정보처리방침을 렌더링한다.', () => {
      renderUserTermsView();
      screen.queryByRole('title', { name: '개인정보처리방침' });
    });
  });
});
