import { render, fireEvent, waitFor } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import FindByPhoneFormContainer from './FindIdByPhoneFormContainer';

import { sentVerificationNumber, successFindIdByPhone } from '../../reducers/find.slice';

import { findIdByPhone, sendVerificationNumber } from '../../services';
import { hideLoading, showLoading } from '../../../../shared/reducers/page';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('../../services');

describe('FindByPhoneFormContainer', () => {
  const members = [
    {
      memberId: 'honggildong***',
      status: 'ACTIVE',
      joinedAt: '2021-09-11T07:04:21.964652',
    },
  ];
  const form = {
    name: '홍길동',
    phone: '01012345678',
    verificationNumber: '1234567',
  };

  let store: MockStoreEnhanced<unknown>;

  given('status', () => 'INITIAL');

  const renderFindByPhoneFormContainer = () => render(<FindByPhoneFormContainer />);

  beforeEach(() => {
    jest.clearAllMocks();

    store = mockStore(() => ({
      find: {
        idByPhone: {
          status: given.status,
        },
      },
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);

    (sendVerificationNumber as jest.Mock).mockResolvedValue('');
    (findIdByPhone as jest.Mock).mockResolvedValue({ members });
  });

  it('renders FindByPhoneFormContainer', () => {
    renderFindByPhoneFormContainer();
  });

  describe('Submitting form', () => {
    context('when form is valid', () => {
      it('calls sentVerificationNumber action', async () => {
        const { getByText, getByLabelText } = renderFindByPhoneFormContainer();

        fireEvent.change(getByLabelText('이름'), {
          target: { name: 'name', value: form.name },
        });
        fireEvent.change(getByLabelText('휴대폰 번호'), {
          target: { name: 'phone', value: form.phone },
        });
        fireEvent.click(getByText('인증번호 받기'));

        await waitFor(() => {
          const actions = store.getActions();

          expect(actions[0]).toEqual(showLoading());
          expect(actions[1]).toEqual(sentVerificationNumber());
          expect(actions[2]).toEqual(hideLoading());
        });
      });
    });

    context('when form is valid', () => {
      given('status', () => 'SENT');

      it('calls successFindIdByPhone action', async () => {
        const { getByText, getByLabelText } = renderFindByPhoneFormContainer();

        fireEvent.change(getByLabelText('이름'), {
          target: { name: 'name', value: form.name },
        });
        fireEvent.change(getByLabelText('휴대폰 번호'), {
          target: { name: 'phone', value: form.phone },
        });
        fireEvent.change(getByLabelText('인증번호'), {
          target: { name: 'verificationNumber', value: form.verificationNumber },
        });
        fireEvent.click(getByText('확인'));

        await waitFor(() => {
          const actions = store.getActions();

          expect(actions[0]).toEqual(showLoading());
          expect(actions[1]).toEqual(successFindIdByPhone(members));
          expect(actions[2]).toEqual(hideLoading());
        });
      });
    });
  });

  describe('Clicking resend', () => {
    given('status', () => 'SENT');

    it('calls sentVerificationNumber action', async () => {
      const { getByText } = renderFindByPhoneFormContainer();

      fireEvent.click(getByText('재발송'));

      await waitFor(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual(showLoading());
        expect(actions[1]).toEqual(sentVerificationNumber());
        expect(actions[2]).toEqual(hideLoading());
      });
    });
  });
});
