import { render, fireEvent } from '@testing-library/react';

import { NAME_PLACEHOLDER_TEXT, PHONE_PLACEHOLDER_TEXT } from '../../../../shared/constant';

import FindIdByPhoneForm from './FindIdByPhoneForm';

describe('FindIdByPhoneForm', () => {
  const form = {
    name: '',
    phone: '',
    verificationNumber: '',
  };

  const handleChange = jest.fn();
  const handleBlur = jest.fn();
  const handleSubmit = jest.fn();
  const handleClickResend = jest.fn();

  given('errors', () => ({
    name: '',
    phone: '',
    verificationNumber: '',
  }));
  given('isValid', () => true);
  given('status', () => 'INITIAL');

  const renderFindIdByPhoneForm = () =>
    render(
      <FindIdByPhoneForm
        form={form}
        errors={given.errors}
        isValid={given.isValid}
        status={given.status}
        remainTime="03:00"
        onChange={handleChange}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
        onClickResend={handleClickResend}
      />,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders FindIdByPhoneForm', () => {
    const { getByText, getByPlaceholderText } = renderFindIdByPhoneForm();

    expect(getByPlaceholderText(NAME_PLACEHOLDER_TEXT)).toBeInTheDocument();
    expect(getByPlaceholderText(PHONE_PLACEHOLDER_TEXT)).toBeInTheDocument();
    expect(getByText('인증번호 받기')).toBeInTheDocument();
  });

  context('when errors exist', () => {
    const errors = {
      name: NAME_PLACEHOLDER_TEXT,
      phone: PHONE_PLACEHOLDER_TEXT,
      verificationNumber: '',
    };

    given('errors', () => errors);

    it('shows error', () => {
      const { container } = renderFindIdByPhoneForm();

      expect(container).toHaveTextContent(errors.name);
      expect(container).toHaveTextContent(errors.phone);
    });
  });

  context('when sent verification number', () => {
    given('status', () => 'SENT');

    it('show verification number form', () => {
      const { container } = renderFindIdByPhoneForm();

      expect(container).toHaveTextContent('인증번호');
      expect(container).toHaveTextContent('확인');
    });
  });

  describe('Clicking submit button', () => {
    context('when form is valid', () => {
      given('isValid', () => true);

      it('calls onSubmit handler', () => {
        const { getByText } = renderFindIdByPhoneForm();

        fireEvent.click(getByText('인증번호 받기'));

        expect(handleSubmit).toBeCalled();
      });
    });

    context('when form is invalid', () => {
      given('isValid', () => false);

      it('calls nothing', () => {
        const { getByText } = renderFindIdByPhoneForm();

        fireEvent.click(getByText('인증번호 받기'));

        expect(handleSubmit).not.toBeCalled();
      });
    });
  });

  describe('Changing name', () => {
    it('calls onChange handler', () => {
      const { getByLabelText } = renderFindIdByPhoneForm();

      fireEvent.change(getByLabelText('이름'), {
        target: { name: 'name', value: '홍길동' },
      });

      expect(handleChange).toBeCalled();
    });
  });

  describe('Changing phone', () => {
    it('calls onChange handler', () => {
      const { getByLabelText } = renderFindIdByPhoneForm();

      fireEvent.change(getByLabelText('휴대폰 번호'), {
        target: { name: 'phone', value: '01011223344' },
      });

      expect(handleChange).toBeCalled();
    });
  });

  describe('Cicking resend button', () => {
    given('status', () => 'SENT');

    it('calls onClickResend handler', () => {
      const { getByText } = renderFindIdByPhoneForm();

      fireEvent.click(getByText('재발송'));

      expect(handleClickResend).toBeCalled();
    });
  });
});
