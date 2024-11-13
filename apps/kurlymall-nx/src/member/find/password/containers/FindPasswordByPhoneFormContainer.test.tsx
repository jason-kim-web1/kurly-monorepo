import { render, fireEvent, waitFor } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import FindPasswordByPhoneFormContainer from './FindPasswordByPhoneFormContainer';

import { sentVerificationNumberWithId, successFindPasswordByPhone } from '../../reducers/find.slice';

import { hideLoading, showLoading } from '../../../../shared/reducers/page';
import { findPasswordByPhone, sendVerificationNumberWithId } from '../../services';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('../../services');

describe('FindPassowrdByPhoneFormContainer', () => {
  const form = {
    id: '홍길동컬리테스트',
    phone: '01012345678',
    verificationNumber: '1234567',
  };
  const token = 'abcde';

  let store: MockStoreEnhanced<unknown>;

  given('status', () => 'INITIAL');

  const renderFindPasswordByPhoneFormContainer = () => render(<FindPasswordByPhoneFormContainer />);

  beforeEach(() => {
    jest.clearAllMocks();

    store = mockStore(() => ({
      find: {
        passwordByPhone: {
          status: given.status,
        },
      },
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);

    (sendVerificationNumberWithId as jest.Mock).mockResolvedValue('');
    (findPasswordByPhone as jest.Mock).mockResolvedValue(token);
  });

  it('renders FindPasswordByPhoneFormContainer', () => {
    renderFindPasswordByPhoneFormContainer();
  });

  describe('Submitting form', () => {
    context('when form is valid', () => {
      it('calls sentVerificationNumber action', async () => {
        const { getByText, getByLabelText } = renderFindPasswordByPhoneFormContainer();

        fireEvent.change(getByLabelText('아이디'), {
          target: { name: 'id', value: form.id },
        });
        fireEvent.change(getByLabelText('휴대폰 번호'), {
          target: { name: 'phone', value: form.phone },
        });
        fireEvent.click(getByText('인증번호 받기'));

        await waitFor(() => {
          const actions = store.getActions();

          expect(actions[0]).toEqual(showLoading());
          expect(actions[1]).toEqual(sentVerificationNumberWithId());
          expect(actions[2]).toEqual(hideLoading());
        });
      });
    });

    context('when form is valid', () => {
      given('status', () => 'SENT');

      it('calls successFindIdByPhone action', async () => {
        const { getByText, getByLabelText } = renderFindPasswordByPhoneFormContainer();

        fireEvent.change(getByLabelText('아이디'), {
          target: { name: 'id', value: form.id },
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
          expect(actions[1]).toEqual(successFindPasswordByPhone(token));
          expect(actions[2]).toEqual(hideLoading());
        });
      });
    });
  });

  describe('Clicking resend', () => {
    given('status', () => 'SENT');

    it('calls sentVerificationNumber action', async () => {
      const { getByText } = renderFindPasswordByPhoneFormContainer();

      fireEvent.click(getByText('재발송'));

      await waitFor(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual(showLoading());
        expect(actions[1]).toEqual(sentVerificationNumberWithId());
        expect(actions[2]).toEqual(hideLoading());
      });
    });
  });
});
