import { render, fireEvent, waitFor } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import IdFormContainer from './FindIdByEmailFormContainer';
import { successFindIdByEmail, updateIdByEmailForm } from '../../reducers/find.slice';
import { hideLoading, showLoading } from '../../../../shared/reducers/page';
import { findIdByEmail } from '../../services';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('../../services/forget.service');

describe('IdFormContainer', () => {
  const members = [
    {
      memberId: 'honggildong***',
      status: 'ACTIVE',
      joinedAt: '2021-09-11T07:04:21.964652',
    },
  ];

  let store: MockStoreEnhanced<unknown>;

  const renderIdFormContainer = () => render(<IdFormContainer />);

  beforeEach(() => {
    store = mockStore(() => ({
      find: {},
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);

    (findIdByEmail as jest.Mock).mockResolvedValue({ members });
  });

  it('renders', () => {
    renderIdFormContainer();
  });

  context('when focus out', () => {
    it('shows error message', async () => {
      const { container, getByLabelText } = renderIdFormContainer();

      fireEvent.focus(getByLabelText('이름'));
      fireEvent.blur(getByLabelText('이름'));

      await waitFor(() => {
        expect(container).toHaveTextContent('가입 시 등록한 이름을 입력해 주세요.');
      });
    });
  });

  describe('Submitting form', () => {
    const form = {
      name: '홍길동',
      email: 'test@email.com',
    };
    it('calls successFindIdByEmail', async () => {
      const { getByText, getByLabelText } = renderIdFormContainer();

      fireEvent.change(getByLabelText('이름'), {
        target: { name: 'name', value: form.name },
      });

      fireEvent.change(getByLabelText('이메일'), {
        target: { name: 'email', value: form.email },
      });

      fireEvent.click(getByText('확인'));

      const actions = store.getActions();

      await waitFor(() => {
        expect(actions[0]).toEqual(showLoading());
        expect(actions[1]).toEqual(updateIdByEmailForm(form));
        expect(actions[2]).toEqual(successFindIdByEmail(members));
        expect(actions[3]).toEqual(hideLoading());
      });
    });
  });
});
