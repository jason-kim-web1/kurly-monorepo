import { render, fireEvent, waitFor } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import SimpleSignupFormContainer from './SimpeSignupFormContainer';
import { updateDuplicate, updateSignupState } from '../../reducers/slice';

import { confirmDuplicateId, kakaoLogin } from '../../services';
import { hideLoading, showLoading } from '../../../../shared/reducers/page';
import { setAccessToken } from '../../../../shared/reducers/auth';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('../../services');

describe('SimpleSignupFormContainer', () => {
  const authMockData = {
    accessToken: 'abcde',
    uid: '12345',
    isGuest: false,
  };

  let store: MockStoreEnhanced<unknown>;

  given('form', () => ({
    id: 'marketkurly12',
    name: '마켓컬리',
    addressInfomation: {
      addressDetail: '',
      lotNumberAddress: '',
      roadAddress: '한국타이어빌딩 15층',
      zipCode: '',
      zoneCode: '',
    },
    password: 'asdqwe1234',
    passwordConfirm: 'asdqwe1234',
    address: '',
    recommender: '',
    eventName: '',
  }));

  given('duplicate', () => true);

  const renderSimpleSignupFormContainer = () => render(<SimpleSignupFormContainer />);

  beforeEach(() => {
    store = mockStore(() => ({
      social: {
        signup: {
          duplicate: given.duplicate,
          form: given.form,
        },
      },
    }));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (kakaoLogin as jest.Mock).mockResolvedValue(authMockData);
  });

  it('renders', async () => {
    await waitFor(() => renderSimpleSignupFormContainer());
  });

  context('when focus out', () => {
    it('shows error message', async () => {
      const { container, getByLabelText } = renderSimpleSignupFormContainer();

      fireEvent.focus(getByLabelText('아이디'));
      fireEvent.blur(getByLabelText('아이디'));

      await waitFor(() => {
        expect(container).toHaveTextContent('6자 이상의 영문 혹은 영문과 숫자를 조합');
        expect(container).toHaveTextContent('아이디 중복 확인');
      });
    });
  });

  describe('Clicking "중복확인"', () => {
    context('when ID is not duplicated', () => {
      it('calls actions', async () => {
        (confirmDuplicateId as jest.Mock).mockResolvedValue({ duplicate: false });

        const { getByText } = renderSimpleSignupFormContainer();

        fireEvent.click(getByText('중복확인'));

        const actions = store.getActions();

        await waitFor(() => {
          expect(actions[0]).toEqual(updateDuplicate(false));
        });
      });
    });
  });

  describe('Changing inputs', () => {
    context('when id field changing', () => {
      it('calls updateDuplicate actions', async () => {
        const { getByLabelText } = renderSimpleSignupFormContainer();

        fireEvent.change(getByLabelText('아이디'), {
          target: { name: 'id', value: 'rhkrgudwh' },
        });

        const actions = store.getActions();

        await waitFor(() => {
          expect(actions[0]).toEqual(updateDuplicate(true));
        });
      });
    });
  });

  describe('Clicking submit button', () => {
    given('duplicate', () => false);

    it('calls action', async () => {
      const { getByText } = renderSimpleSignupFormContainer();

      fireEvent.click(getByText('가입하기'));

      const actions = store.getActions();

      await waitFor(() => {
        expect(actions).calledActions([showLoading, setAccessToken, updateSignupState, hideLoading]);
      });
    });
  });
});
