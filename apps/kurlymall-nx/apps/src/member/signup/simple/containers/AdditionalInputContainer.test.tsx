import { fireEvent, render } from '@testing-library/react';

import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { useDispatch, useSelector } from 'react-redux';

import AdditionalInputContainer from './AdditionalInputContainer';
import { changeSignupForm } from '../../reducers/slice';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');

describe('AdditionalInputContainer', () => {
  let store: MockStoreEnhanced<unknown>;

  const renderAdditionalInputContainer = () => render(<AdditionalInputContainer />);

  beforeEach(() => {
    store = mockStore(() => ({
      social: {
        signup: {
          form: {
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
          },
        },
      },
    }));

    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
  });

  it('renders', () => {
    renderAdditionalInputContainer();
  });

  describe('Clicking radio', () => {
    context('when click "추천인 아이디"', () => {
      it('shows "추천인 아이디" input', () => {
        const { getByLabelText, getByPlaceholderText } = renderAdditionalInputContainer();

        fireEvent.click(getByLabelText('추천인 아이디'));

        expect(getByPlaceholderText('추천인 아이디를 입력해주세요')).toBeInTheDocument();
      });
    });

    context('when click "참여 이벤트명"', () => {
      it('shows "참여 이벤트명" input', () => {
        const { getByLabelText, getByPlaceholderText } = renderAdditionalInputContainer();

        fireEvent.click(getByLabelText('참여 이벤트명'));

        expect(getByPlaceholderText('참여 이벤트명을 입력해주세요')).toBeInTheDocument();
      });
    });
  });

  describe('Changing inputs', () => {
    it('calls changeSignupForm action', () => {
      const { getByLabelText, getByPlaceholderText } = renderAdditionalInputContainer();

      fireEvent.click(getByLabelText('참여 이벤트명'));

      fireEvent.change(getByPlaceholderText('참여 이벤트명을 입력해주세요'), {
        target: { name: 'eventName', value: 'blackweek' },
      });

      const actions = store.getActions();

      expect(actions[0]).toEqual(
        changeSignupForm({
          name: 'eventName',
          value: 'blackweek',
        }),
      );
    });
  });
});
