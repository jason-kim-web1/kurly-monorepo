import { render, fireEvent } from '@testing-library/react';

import PasswordResetForm from './PasswordResetForm';

describe('PasswordResetForm', () => {
  const form = {
    password: '',
    passwordConfirm: '',
  };

  const handleChange = jest.fn();
  const handleBlur = jest.fn();
  const handleSubmit = jest.fn();

  given('errors', () => ({
    password: '',
    passwordConfirm: '',
  }));
  given('touched', () => ({
    password: false,
    passwordConfirm: false,
  }));
  given('isValid', () => true);

  const renderPasswordResetForm = () =>
    render(
      <PasswordResetForm
        form={form}
        errors={given.errors}
        touched={given.touched}
        isValid={given.isValid}
        onChange={handleChange}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
      />,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders PasswordResetForm', () => {
    const { getByText, getByPlaceholderText } = renderPasswordResetForm();

    expect(getByPlaceholderText('새 비밀번호를 입력해 주세요')).toBeInTheDocument();
    expect(getByPlaceholderText('새 비밀번호를 한 번 더 입력해 주세요')).toBeInTheDocument();
    expect(getByText('확인')).toBeInTheDocument();
  });

  context('when errors exist', () => {
    const errors = {
      password: {
        min: '10자 이상 입력',
        pattern: '',
        consecutive: '',
      },
      passwordConfirm: '동일한 비밀번호를 입력해 주세요.',
    };

    given('errors', () => errors);
    given('tocuhed', () => ({
      password: true,
      passwordConfirm: true,
    }));

    it('shows error', () => {
      const { container, getByLabelText } = renderPasswordResetForm();

      fireEvent.focus(getByLabelText('새 비밀번호 등록'));
      fireEvent.focus(getByLabelText('새 비밀번호 확인'));

      expect(container).toHaveTextContent(errors.password.min);
      expect(container).toHaveTextContent(errors.passwordConfirm);
    });
  });

  describe('Clicking submit button', () => {
    context('when form is valid', () => {
      given('isValid', () => true);

      it('calls onSubmit handler', () => {
        const { getByText } = renderPasswordResetForm();

        fireEvent.click(getByText('확인'));

        expect(handleSubmit).toBeCalled();
      });
    });

    context('when form is invalid', () => {
      given('isValid', () => false);

      it('calls nothing', () => {
        const { getByText } = renderPasswordResetForm();

        fireEvent.click(getByText('확인'));

        expect(handleSubmit).not.toBeCalled();
      });
    });
  });

  describe('Changing password', () => {
    it('calls onChange handler', () => {
      const { getByLabelText } = renderPasswordResetForm();

      fireEvent.change(getByLabelText('새 비밀번호 등록'), {
        target: { name: 'password', value: 'asdfg12345' },
      });

      expect(handleChange).toBeCalled();
    });
  });

  describe('Changing passwordConfirm', () => {
    it('calls onChange handler', () => {
      const { getByLabelText } = renderPasswordResetForm();

      fireEvent.change(getByLabelText('새 비밀번호 확인'), {
        target: { name: 'passwordConfirm', value: 'asdfg12345' },
      });

      expect(handleChange).toBeCalled();
    });
  });
});
