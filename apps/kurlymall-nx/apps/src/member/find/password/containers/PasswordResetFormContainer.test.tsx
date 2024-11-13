import { render, fireEvent, waitFor } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import PasswordResetFormContainer from './PasswordResetFormContainer';

import { hideLoading, showLoading } from '../../../../shared/reducers/page';
import { successResetPassword } from '../../reducers/find.slice';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('../../services/forget.service');

describe('PasswordResetFormContainer', () => {
  let store: MockStoreEnhanced<unknown>;

  const renderPasswordResetFormContainer = () => render(<PasswordResetFormContainer />);

  beforeEach(() => {
    store = mockStore(() => ({
      find: {
        passwordResetForm: {
          status: 'INITIAL',
        },
      },
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
  });

  it('renders', () => {
    renderPasswordResetFormContainer();
  });

  context('when focus out', () => {
    it('shows error message', async () => {
      const { container, getByLabelText } = renderPasswordResetFormContainer();

      fireEvent.focus(getByLabelText('새 비밀번호 등록'));
      fireEvent.blur(getByLabelText('새 비밀번호 등록'));

      await waitFor(() => {
        expect(container).toHaveTextContent('10자 이상 입력');
      });
    });
  });

  describe('Submitting form', () => {
    const form = {
      password: 'password1234!',
      passwordConfirm: 'password1234!',
    };
    it('calls successFindIdByEmail', async () => {
      const { getByText, getByLabelText } = renderPasswordResetFormContainer();

      fireEvent.change(getByLabelText('새 비밀번호 등록'), {
        target: { name: 'password', value: form.password },
      });

      fireEvent.change(getByLabelText('새 비밀번호 확인'), {
        target: { name: 'passwordConfirm', value: form.passwordConfirm },
      });

      fireEvent.click(getByText('확인'));

      const actions = store.getActions();

      await waitFor(() => {
        expect(actions[0]).toEqual(showLoading());
        expect(actions[1]).toEqual(successResetPassword());
        expect(actions[2]).toEqual(hideLoading());
      });
    });
  });
});
