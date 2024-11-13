import { fireEvent, render } from '@testing-library/react';

import { DeliveryCompleteMessage, ReceiverDetailTemplate } from '../../../../../../shared/enums';

import DeliveryCompleteField from './DeliveryCompleteField';

describe('DeliveryCompleteField 테스트', () => {
  const handleChange = jest.fn();

  given('deliveryCompleteMessage', () => DeliveryCompleteMessage.IMMEDIATELY);
  given('receiverDetailTemplate', () => ReceiverDetailTemplate.DEFAULT);

  const renderDeliveryCompleteField = () =>
    render(
      <DeliveryCompleteField
        onChange={handleChange}
        selectedValue={given.deliveryCompleteMessage}
        receiverDetailTemplate={given.receiverDetailTemplate}
      />,
    );

  context('샛별: 대구, 부산, 울산 지역이면', () => {
    given('receiverDetailTemplate', () => ReceiverDetailTemplate.AM8);

    it('배송완료 메세지가 오전 8시로 보여진다.', () => {
      const { getByLabelText } = renderDeliveryCompleteField();

      expect(getByLabelText('배송 직후')).toBeInTheDocument();
      expect(getByLabelText('오전 8시')).toBeInTheDocument();
    });
  });

  it('언제 배송 완료 메시지를 받을지 선택할 수 있는 버튼을 볼 수 있다', () => {
    const { getByLabelText } = renderDeliveryCompleteField();

    expect(getByLabelText('배송 직후')).toBeInTheDocument();
    expect(getByLabelText('오전 7시')).toBeInTheDocument();
  });

  it('버튼 선택 시 handleChange 핸들러 함수가 실행된다', () => {
    const { getByLabelText } = renderDeliveryCompleteField();

    fireEvent.click(getByLabelText('오전 7시'));

    expect(handleChange).toBeCalledWith(
      expect.objectContaining({
        name: 'deliveryCompleteMessage',
        value: DeliveryCompleteMessage.AM7,
      }),
    );
  });
});
