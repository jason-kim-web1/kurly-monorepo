import { render, fireEvent, waitFor } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import FindPasswordByEmailFormContainer from './FindPasswordByEmailFormContainer';

import { successFindPasswordByEmail, updateEmail } from '../../reducers/find.slice';
import { hideLoading, showLoading } from '../../../../shared/reducers/page';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('../../services/forget.service');

describe('FindPasswordByEmailFormContainer', () => {
  let store: MockStoreEnhanced<unknown>;

  const renderFindPasswordByEmailFormContainer = () => render(<FindPasswordByEmailFormContainer />);

  beforeEach(() => {
    store = mockStore(() => ({
      find: {},
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
  });

  it('renders', () => {
    renderFindPasswordByEmailFormContainer();
  });

  context('when focus out', () => {
    it('shows error message', async () => {
      const { container, getByLabelText } = renderFindPasswordByEmailFormContainer();

      fireEvent.focus(getByLabelText('아이디'));
      fireEvent.blur(getByLabelText('아이디'));

      await waitFor(() => {
        expect(container).toHaveTextContent('가입 시 등록한 아이디를 입력해 주세요.');
      });
    });
  });

  describe('Submitting form', () => {
    const form = {
      id: '홍길동컬리테스트',
      email: 'test@email.com',
    };
    it('calls successFindIdByEmail', async () => {
      const { getByText, getByLabelText } = renderFindPasswordByEmailFormContainer();

      fireEvent.change(getByLabelText('아이디'), {
        target: { name: 'id', value: form.id },
      });

      fireEvent.change(getByLabelText('이메일'), {
        target: { name: 'email', value: form.email },
      });

      fireEvent.click(getByText('확인'));

      const actions = store.getActions();

      await waitFor(() => {
        expect(actions[0]).toEqual(showLoading());
        expect(actions[1]).toEqual(updateEmail(form.email));
        expect(actions[2]).toEqual(successFindPasswordByEmail());
        expect(actions[3]).toEqual(hideLoading());
      });
    });
  });
});
