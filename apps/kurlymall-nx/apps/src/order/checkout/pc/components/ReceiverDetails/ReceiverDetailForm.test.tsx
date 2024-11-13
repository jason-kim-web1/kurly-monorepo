import { fireEvent, render } from '@testing-library/react';

import { DeliveryCompleteMessage, FrontDoorMethod, ReceivePlace } from '../../../../../shared/enums';

import ReceiverDetailForm from './ReceiverDetailForm';

describe('ReceiverDetailForm 테스트', () => {
  const handleSameWithOrderer = jest.fn();
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const handleCancel = jest.fn();

  given('receiverForm', () => ({
    receivePlace: ReceivePlace.DOOR,
    frontDoorMethod: FrontDoorMethod.PASSWORD,
  }));
  given('isSameOrderer', () => false);

  const renderReceiverDetailForm = () =>
    render(
      <ReceiverDetailForm
        isSameOrderer={given.isSameOrderer}
        receiverForm={given.receiverForm}
        onClickSameOrderer={handleSameWithOrderer}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClickCancel={handleCancel}
      />,
    );

  it('주문자 정보와 동일 체크박스를 볼 수 있다.', () => {
    const { getByLabelText } = renderReceiverDetailForm();

    expect(getByLabelText('주문자 정보와 동일')).toBeInTheDocument();
  });

  it('체크박스 클릭 시 handleSameWithOrderer 핸들러 함수가 호출된다', () => {
    const { getByLabelText } = renderReceiverDetailForm();

    fireEvent.click(getByLabelText('주문자 정보와 동일'));

    expect(handleSameWithOrderer).toBeCalledWith(true);
  });

  it('배송 요청사항 타이틀을 볼 수 있다', () => {
    const { container } = renderReceiverDetailForm();

    expect(container).toHaveTextContent('배송 요청사항');
  });

  it('취소 버튼을 볼 수 있다', () => {
    const { container } = renderReceiverDetailForm();

    expect(container).toHaveTextContent('취소');
  });

  context('입력된 값이 문자 정보와 동일하면', () => {
    given('isSameOrderer', () => true);

    it('주문자 정보와 동일 체크박스가 체크 됨을 볼 수 있다', () => {
      const { getByRole } = renderReceiverDetailForm();

      expect(getByRole('checkbox')).toBeChecked();
    });
  });

  context('현재 배송 정책이 샛별이면', () => {
    given('receiverForm', () => ({
      receivePlace: ReceivePlace.DOOR,
      frontDoorMethod: FrontDoorMethod.PASSWORD,
      frontDoorDetail: '',
      deliveryCompleteMessage: DeliveryCompleteMessage.IMMEDIATELY,
      deliveryType: 'direct',
    }));

    it('배송기사 요청사항을 볼 수 없다', () => {
      const { container } = renderReceiverDetailForm();

      expect(container).not.toHaveTextContent('배송기사 요청사항');
    });

    it('받으실 장소를 볼 수 있다', () => {
      const { container } = renderReceiverDetailForm();

      expect(container).toHaveTextContent('받으실 장소');
    });
  });

  context('저장 버튼을 클릭하면', () => {
    it('handleSubmit 을 호출한다', () => {
      const { getByText } = renderReceiverDetailForm();

      fireEvent.click(getByText('동의하고 저장'));

      expect(handleSubmit).toBeCalled();
    });
  });
});
