import { fireEvent, render, waitFor } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import PgTermsModal from './PgTermsModal';

import { setValue } from '../reducers/terms';

import { fetchPersonalInformationTermsHTML } from '../api';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('../api');

describe('PgTermsModal', () => {
  const handleClose = jest.fn();

  let store: MockStoreEnhanced<unknown>;

  const renderPgTermsModal = () => render(<PgTermsModal open onClose={handleClose} />);

  beforeEach(() => {
    store = mockStore(() => ({
      terms: {
        personalInformationTermsHTML: '',
      },
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
  });

  beforeEach(() => {
    (fetchPersonalInformationTermsHTML as jest.Mock).mockResolvedValue('<div>개인정보 수집 이용 및 처리 동의<div>');
  });

  it('renders PgTermsModal', async () => {
    const { getByText } = renderPgTermsModal();

    fireEvent.click(getByText('확인'));

    expect(handleClose).toBeCalled();

    await waitFor(() => {
      const actions = store.getActions();

      expect(setValue.match(actions[0])).toBe(true);
    });
  });
});
