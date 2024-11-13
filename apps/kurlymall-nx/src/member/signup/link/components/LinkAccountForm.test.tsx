import { fireEvent, render } from '@testing-library/react';

import LinkAccountForm from './LinkAccountForm';

describe('LinkAccountForm', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  given('form', () => ({
    memberNo: '',
    password: given.password,
  }));
  given('password', () => '');
  given('members', () => [
    {
      number: 1,
      id: 'marketkurl***',
    },
    {
      number: 2,
      id: 'kurly5***',
    },
    {
      number: 3,
      id: 'market5***',
    },
  ]);

  const renderLinkAccountForm = () =>
    render(
      <LinkAccountForm form={given.form} members={given.members} onChange={handleChange} onSubmit={handleSubmit} />,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    const { container, getByText, getByPlaceholderText } = renderLinkAccountForm();

    expect(container).toHaveTextContent('아이디');
    expect(container).toHaveTextContent('비밀번호');
    expect(getByPlaceholderText('비밀번호를 입력해주세요')).toBeInTheDocument();
    expect(getByText('카카오계정 연결하기')).toBeInTheDocument();
  });

  describe('Changing radio', () => {
    it('calls onChange handler', () => {
      const { getByText } = renderLinkAccountForm();

      fireEvent.click(getByText('marketkurl***'));

      expect(handleChange).toBeCalledWith(
        expect.objectContaining({
          name: 'memberNo',
          value: '1',
        }),
      );
    });
  });

  describe('Changing password', () => {
    it('calls onChange handler', () => {
      const { getByLabelText } = renderLinkAccountForm();

      fireEvent.change(getByLabelText('비밀번호'), {
        target: { name: 'password', value: 'asdqwe1234' },
      });

      expect(handleChange).toBeCalledWith(
        expect.objectContaining({
          name: 'password',
          value: 'asdqwe1234',
        }),
      );
    });
  });

  describe('submit', () => {
    context('when password is exists', () => {
      given('password', () => 'asdqwe1234');

      it('calls onSubmit handler', () => {
        const { getByText } = renderLinkAccountForm();

        fireEvent.click(getByText('카카오계정 연결하기'));

        expect(handleSubmit).toBeCalled();
      });
    });

    context('when password not exists', () => {
      given('password', () => '');

      it("doesn't calls onSubmit handler", () => {
        const { getByText } = renderLinkAccountForm();

        fireEvent.click(getByText('카카오계정 연결하기'));

        expect(handleSubmit).not.toBeCalled();
      });
    });
  });
});
