import { render, fireEvent } from '@testing-library/react';

import { EMAIL_PLACEHOLDER_TEXT, NAME_PLACEHOLDER_TEXT } from '../../../../shared/constant';

import FindIdByEmailForm from './FindIdByEmailForm';

describe('FindIdByEmailForm', () => {
  const form = {
    name: '',
    email: '',
  };

  const handleChange = jest.fn();
  const handleBlur = jest.fn();
  const handleSubmit = jest.fn();

  given('errors', () => ({
    name: '',
    email: '',
  }));
  given('isValid', () => true);

  const renderFindIdByEmailForm = () =>
    render(
      <FindIdByEmailForm
        form={form}
        errors={given.errors}
        isValid={given.isValid}
        onChange={handleChange}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
      />,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders FindIdByEmailForm', () => {
    const { getByText, getByPlaceholderText } = renderFindIdByEmailForm();

    expect(getByPlaceholderText(NAME_PLACEHOLDER_TEXT)).toBeInTheDocument();
    expect(getByPlaceholderText(EMAIL_PLACEHOLDER_TEXT)).toBeInTheDocument();
    expect(getByText('확인')).toBeInTheDocument();
  });

  context('when errors exist', () => {
    const errors = {
      name: NAME_PLACEHOLDER_TEXT,
      email: EMAIL_PLACEHOLDER_TEXT,
    };

    given('errors', () => errors);

    it('shows error', () => {
      const { container } = renderFindIdByEmailForm();

      expect(container).toHaveTextContent(errors.name);
      expect(container).toHaveTextContent(errors.email);
    });
  });

  describe('Clicking submit button', () => {
    context('when form is valid', () => {
      given('isValid', () => true);

      it('calls onSubmit handler', () => {
        const { getByText } = renderFindIdByEmailForm();

        fireEvent.click(getByText('확인'));

        expect(handleSubmit).toBeCalled();
      });
    });

    context('when form is invalid', () => {
      given('isValid', () => false);

      it('calls nothing', () => {
        const { getByText } = renderFindIdByEmailForm();

        fireEvent.click(getByText('확인'));

        expect(handleSubmit).not.toBeCalled();
      });
    });
  });

  describe('Changing name', () => {
    it('calls onChange handler', () => {
      const { getByLabelText } = renderFindIdByEmailForm();

      fireEvent.change(getByLabelText('이름'), {
        target: { name: 'name', value: '홍길동' },
      });

      expect(handleChange).toBeCalled();
    });
  });

  describe('Changing email', () => {
    it('calls onChange handler', () => {
      const { getByLabelText } = renderFindIdByEmailForm();

      fireEvent.change(getByLabelText('이메일'), {
        target: { name: 'email', value: 'test@email.com' },
      });

      expect(handleChange).toBeCalled();
    });
  });
});
