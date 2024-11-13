import { fireEvent, render } from '@testing-library/react';

import { NAME_PLACEHOLDER_TEXT } from '../../../../../../shared/constant';

import ReceiverField from './ReceiverField';

describe('ReceiverField 테스트', () => {
  const handleChange = jest.fn();

  given('receiverName', () => '');
  given('phone', () => '');

  const renderReceiverField = () =>
    render(<ReceiverField name={given.receiverName} phone={given.phone} onChange={handleChange} />);

  it('받으실 분의 정보를 입력할 수 있는 요소를 볼 수 있다', () => {
    const { getByPlaceholderText } = renderReceiverField();

    expect(getByPlaceholderText(NAME_PLACEHOLDER_TEXT)).toBeInTheDocument();
    expect(getByPlaceholderText('숫자만 입력해 주세요')).toBeInTheDocument();
  });

  context('받으실 분, 휴대폰 번호를 입력하면', () => {
    it('handleChange 핸들러 함수가 호출된다', () => {
      const { getByLabelText } = renderReceiverField();

      fireEvent.change(getByLabelText('받으실 분'), {
        target: { value: '철수' },
      });

      expect(handleChange).toBeCalledWith(
        expect.objectContaining({
          name: 'name',
          value: '철수',
        }),
      );
    });
  });

  context('name과 phone 값이 있다면', () => {
    given('receiverName', () => '홍길동');
    given('phone', () => '01011111111');

    it('해당 값이 입력되어 있다', () => {
      const { getByLabelText } = renderReceiverField();

      expect(getByLabelText('받으실 분')).toHaveValue('홍길동');
      expect(getByLabelText('휴대폰')).toHaveValue('01011111111');
    });
  });
});
