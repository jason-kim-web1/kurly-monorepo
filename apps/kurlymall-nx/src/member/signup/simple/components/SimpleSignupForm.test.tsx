import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import SimpleSignupForm from './SimpleSignupForm';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');

describe('SimpleSignupForm', () => {
  let store: MockStoreEnhanced<unknown>;

  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const handleBlur = jest.fn();
  const handleClick = jest.fn();

  given('form', () => ({
    id: '',
    name: '',
    addressInfomation: {
      addressDetail: 'asdf',
      lotNumberAddress: '',
      roadAddress: '한국타이어빌딩 15층',
      zipCode: '',
      zoneCode: '',
    },
    password: '',
    passwordConfirm: '',
    address: '',
    recommender: '',
    eventName: '',
  }));
  given('errors', () => ({
    id: '',
    password: '',
    passwordConfirm: '',
  }));
  given('touched', () => ({
    id: false,
    password: false,
    passwordConfirm: false,
  }));
  given('duplicate', () => true);

  const renderSimpleSignupForm = () =>
    render(
      <SimpleSignupForm
        form={given.form}
        errors={given.errors}
        duplicate={given.duplicate}
        touched={given.touched}
        onChange={handleChange}
        onClick={handleClick}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
      />,
    );

  beforeEach(() => {
    jest.clearAllMocks();

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
  });

  it('renders SimpleSignupForm', () => {
    const { getByText, getByLabelText, getByPlaceholderText } = renderSimpleSignupForm();

    expect(getByPlaceholderText('예 : marketkurly12')).toBeInTheDocument();
    expect(getByPlaceholderText('이름을 입력해주세요')).toBeInTheDocument();
    expect(getByPlaceholderText('비밀번호를 입력해주세요')).toBeInTheDocument();
    expect(getByPlaceholderText('비밀번호를 한번 더 입력해주세요')).toBeInTheDocument();

    expect(getByLabelText('추천인 아이디')).toBeInTheDocument();
    expect(getByLabelText('참여 이벤트명')).toBeInTheDocument();

    expect(getByText('중복확인')).toBeInTheDocument();
    expect(getByText('가입하기')).toBeInTheDocument();
  });

  context('when errors exist', () => {
    const errors = {
      id: {
        minAndPattern: '6자 이상의 영문 혹은 영문과 숫자를 조합',
      },
      password: {
        min: '10자 이상 입력',
        pattern: '',
        consecutive: '',
      },
      passwordConfirm: '동일한 비밀번호를 입력해 주세요.',
    };

    given('errors', () => errors);
    given('touched', () => ({
      id: true,
      password: true,
      passwordConfirm: true,
    }));

    it('show error', () => {
      const { container, getByLabelText } = renderSimpleSignupForm();

      fireEvent.focus(getByLabelText('아이디'));
      fireEvent.focus(getByLabelText('비밀번호'));
      fireEvent.focus(getByLabelText('비밀번호 확인'));

      expect(container).toHaveTextContent(errors.id.minAndPattern);
      expect(container).toHaveTextContent(errors.password.min);
      expect(container).toHaveTextContent(errors.passwordConfirm);
    });
  });

  describe('Clicking submit button', () => {
    it('calls onSubmit handler', () => {
      const { getByText } = renderSimpleSignupForm();

      fireEvent.click(getByText('가입하기'));

      expect(handleSubmit).toBeCalled();
    });
  });

  describe('Changing id', () => {
    it('calls onChange handler', () => {
      const { getByLabelText } = renderSimpleSignupForm();

      fireEvent.change(getByLabelText('아이디'), {
        target: { name: 'id', value: 'marketkurly12' },
      });

      expect(handleChange).toBeCalled();
    });
  });

  describe('Changing name', () => {
    it('calls onChange handler', () => {
      const { getByLabelText } = renderSimpleSignupForm();

      fireEvent.change(getByLabelText('이름'), {
        target: { name: 'name', value: '홍길동' },
      });

      expect(handleChange).toBeCalled();
    });
  });

  describe('Changing password', () => {
    it('calls onChange handler', () => {
      const { getByLabelText } = renderSimpleSignupForm();

      fireEvent.change(getByLabelText('비밀번호'), {
        target: { name: 'password', value: 'asdf1234' },
      });

      expect(handleChange).toBeCalled();
    });
  });

  describe('Changing confirm password', () => {
    it('calls onChange handler', () => {
      const { getByLabelText } = renderSimpleSignupForm();

      fireEvent.change(getByLabelText('비밀번호 확인'), {
        target: { name: 'confirm_password', value: 'asdf1234' },
      });

      expect(handleChange).toBeCalled();
    });
  });

  describe('Clicking "중복확인"', () => {
    it('calls onClick handler', () => {
      const { getByText } = renderSimpleSignupForm();

      fireEvent.click(getByText('중복확인'));

      expect(handleClick).toBeCalled();
    });
  });
});
