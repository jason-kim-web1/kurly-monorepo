import { fireEvent, render } from '@testing-library/react';

import ReceiverArea from './ReceiverArea';

describe('ReceiverArea', () => {
  const name = '홍길동';
  const phone = '010-1234-5678';
  const handleChange = jest.fn();

  given('receiver', () => ({
    name,
    phone,
    method: given.method,
  }));
  given('method', () => 'KAKAO_TALK');

  const renderReceiverArea = () => render(<ReceiverArea receiver={given.receiver} onChange={handleChange} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    const { container, queryByPlaceholderText } = renderReceiverArea();

    expect(container).toHaveTextContent('카카오톡');
    expect(container).toHaveTextContent('연락처');
    expect(container).toHaveTextContent('받으실 분 이름');
    expect(queryByPlaceholderText('이름을 입력해주세요')).toBeInTheDocument();
  });

  context('when selected method is KAKAO_TALK', () => {
    given('mehod', () => 'KAKAO_TALK');

    it('renders 카카오톡으로 보내기', () => {
      const { container, queryByPlaceholderText } = renderReceiverArea();

      expect(container).toHaveTextContent('카카오톡 친구에게 직접 메시지를 발송할 수 있습니다.');

      expect(container).not.toHaveTextContent('컬리 카톡 채널로 안내되며 미설치 시 문자 발송됩니다.');
      expect(container).not.toHaveTextContent('받으실 분 연락처');
      expect(queryByPlaceholderText('숫자만 입력해주세요')).not.toBeInTheDocument();
    });
  });

  context('when selected method is SMS', () => {
    given('method', () => 'SMS');

    it('renders 문자로 보내기', () => {
      const { container, queryByPlaceholderText } = renderReceiverArea();

      expect(container).toHaveTextContent('컬리 카톡 채널로 안내되며 미설치 시 문자 발송됩니다.');
      expect(container).toHaveTextContent('받으실 분 연락처');
      expect(queryByPlaceholderText('숫자만 입력해주세요')).toBeInTheDocument();

      expect(container).not.toHaveTextContent('카카오톡 친구에게 직접 메시지를 발송할 수 있습니다.');
    });
  });

  describe('Clicking radio', () => {
    it('calls onChange handler', () => {
      const { getByLabelText } = renderReceiverArea();

      fireEvent.click(getByLabelText('SMS'));

      expect(handleChange).toBeCalledWith(
        expect.objectContaining({
          method: 'SMS',
        }),
      );
    });
  });

  describe('Changing name', () => {
    it('calls onChange handler', () => {
      const { getByLabelText } = renderReceiverArea();

      fireEvent.change(getByLabelText('받으실 분 이름'), {
        target: { value: '영철이' },
      });

      expect(handleChange).toBeCalledWith(
        expect.objectContaining({
          name: '영철이',
        }),
      );
    });
  });
});
