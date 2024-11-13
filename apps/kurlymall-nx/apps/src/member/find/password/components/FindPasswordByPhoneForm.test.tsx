import { render, fireEvent } from '@testing-library/react';

import { ID_PLACEHOLDER_TEXT, PHONE_PLACEHOLDER_TEXT } from '../../../../shared/constant';

import FindPasswordByPhoneForm from './FindPasswordByPhoneForm';

describe('FindPasswordByPhoneForm', () => {
  const form = {
    id: '',
    phone: '',
    verificationNumber: '',
  };

  const handleChange = jest.fn();
  const handleBlur = jest.fn();
  const handleSubmit = jest.fn();
  const handleClickResend = jest.fn();

  given('errors', () => ({
    id: '',
    phone: '',
    verificationNumber: '',
  }));
  given('isValid', () => true);
  given('status', () => 'INITIAL');

  const renderFindPasswordByPhoneForm = () =>
    render(
      <FindPasswordByPhoneForm
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

  it('renders FindPasswordByPhoneForm', () => {
    const { getByText, getByPlaceholderText } = renderFindPasswordByPhoneForm();

    expect(getByPlaceholderText(ID_PLACEHOLDER_TEXT)).toBeInTheDocument();
    expect(getByPlaceholderText(PHONE_PLACEHOLDER_TEXT)).toBeInTheDocument();
    expect(getByText('인증번호 받기')).toBeInTheDocument();
  });

  context('when errors exist', () => {
    const errors = {
      id: ID_PLACEHOLDER_TEXT,
      phone: PHONE_PLACEHOLDER_TEXT,
      verificationNumber: '',
    };

    given('errors', () => errors);

    it('shows error', () => {
      const { container } = renderFindPasswordByPhoneForm();

      expect(container).toHaveTextContent(errors.id);
      expect(container).toHaveTextContent(errors.phone);
    });
  });

  context('when sent verification number', () => {
    given('status', () => 'SENT');

    it('show verification number form', () => {
      const { container } = renderFindPasswordByPhoneForm();

      expect(container).toHaveTextContent('인증번호');
      expect(container).toHaveTextContent('확인');
    });
  });

  describe('Clicking submit button', () => {
    context('when form is valid', () => {
      given('isValid', () => true);

      it('calls onSubmit handler', () => {
        const { getByText } = renderFindPasswordByPhoneForm();

        fireEvent.click(getByText('인증번호 받기'));

        expect(handleSubmit).toBeCalled();
      });
    });

    context('when form is invalid', () => {
      given('isValid', () => false);

      it('calls nothing', () => {
        const { getByText } = renderFindPasswordByPhoneForm();

        fireEvent.click(getByText('인증번호 받기'));

        expect(handleSubmit).not.toBeCalled();
      });
    });
  });

  describe('Changing id', () => {
    it('calls onChange handler', () => {
      const { getByLabelText } = renderFindPasswordByPhoneForm();

      fireEvent.change(getByLabelText('아이디'), {
        target: { name: 'id', value: 'gildong' },
      });

      expect(handleChange).toBeCalled();
    });
  });

  describe('Changing id', () => {
    context('with allowed character', () => {
      it('calls onChange handler', () => {
        const { getByLabelText } = renderFindPasswordByPhoneForm();

        const userId = getByLabelText('아이디');

        fireEvent.change(userId, {
          target: { name: 'id', value: 'gilldong_id-2' },
        });

        expect(handleChange).toBeCalledWith({
          target: { name: 'id', value: 'gilldong_id-2' },
        });
      });
    });
  });

  describe('Changing phone', () => {
    it('calls onChange handler', () => {
      const { getByLabelText } = renderFindPasswordByPhoneForm();

      fireEvent.change(getByLabelText('휴대폰 번호'), {
        target: { name: 'phone', value: '01011223344' },
      });

      expect(handleChange).toBeCalled();
    });
  });

  describe('Cicking resend button', () => {
    given('status', () => 'SENT');

    it('calls onClickResend handler', () => {
      const { getByText } = renderFindPasswordByPhoneForm();

      fireEvent.click(getByText('재발송'));

      expect(handleClickResend).toBeCalled();
    });
  });
});
