import { render, fireEvent } from '@testing-library/react';

import { EMAIL_PLACEHOLDER_TEXT, ID_PLACEHOLDER_TEXT } from '../../../../shared/constant';

import FindPasswordByEmailForm from './FindPasswordByEmailForm';

describe('FindPasswordByEmailForm', () => {
  const form = {
    id: '',
    email: '',
  };

  const handleChange = jest.fn();
  const handleBlur = jest.fn();
  const handleSubmit = jest.fn();

  given('errors', () => ({
    id: '',
    email: '',
  }));
  given('isValid', () => true);

  const renderFindPasswordByEmailForm = () =>
    render(
      <FindPasswordByEmailForm
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

  it('renders FindPasswordByEmailForm', () => {
    const { getByText, getByPlaceholderText } = renderFindPasswordByEmailForm();

    expect(getByPlaceholderText(ID_PLACEHOLDER_TEXT)).toBeInTheDocument();
    expect(getByPlaceholderText(EMAIL_PLACEHOLDER_TEXT)).toBeInTheDocument();
    expect(getByText('확인')).toBeInTheDocument();
  });

  context('when errors exist', () => {
    const errors = {
      id: ID_PLACEHOLDER_TEXT,
      email: EMAIL_PLACEHOLDER_TEXT,
    };

    given('errors', () => errors);

    it('shows error', () => {
      const { container } = renderFindPasswordByEmailForm();

      expect(container).toHaveTextContent(errors.id);
      expect(container).toHaveTextContent(errors.email);
    });
  });

  describe('Clicking submit button', () => {
    context('when form is valid', () => {
      given('isValid', () => true);

      it('calls onSubmit handler', () => {
        const { getByText } = renderFindPasswordByEmailForm();

        fireEvent.click(getByText('확인'));

        expect(handleSubmit).toBeCalled();
      });
    });

    context('when form is invalid', () => {
      given('isValid', () => false);

      it('calls nothing', () => {
        const { getByText } = renderFindPasswordByEmailForm();

        fireEvent.click(getByText('확인'));

        expect(handleSubmit).not.toBeCalled();
      });
    });
  });

  describe('Changing id', () => {
    context('with allowed character', () => {
      it('calls onChange handler', () => {
        const { getByLabelText } = renderFindPasswordByEmailForm();

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

  describe('Changing email', () => {
    it('calls onChange handler', () => {
      const { getByLabelText } = renderFindPasswordByEmailForm();

      fireEvent.change(getByLabelText('이메일'), {
        target: { name: 'email', value: 'test@email.com' },
      });

      expect(handleChange).toBeCalled();
    });
  });
});
