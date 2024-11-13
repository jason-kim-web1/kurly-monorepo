import { fireEvent, render } from '@testing-library/react';

import { appendHyphenToPhoneNumber } from '../../../../shared/services';

import { DeliveryCompleteMessage, FrontDoorMethod, ReceivePlace } from '../../../../shared/enums';
import { OldReceivePlaceTextMap } from '../../../../shared/constant';
import ShippingDetails from './ShippingDetails';
import {
  REQUIRED_FILL_RECEIVER_CONTACT_MESSAGE,
  REQUIRED_FILL_RECEIVER_DETAIL_AND_CONTACT_MESSAGE,
  REQUIRED_FILL_RECEIVER_DETAIL_MESSAGE,
} from '../../shared/constants/delivery-request-validate-message';

describe('ShippingDetails 테스트', () => {
  const handleClick = jest.fn();

  given('receiverForm', () => undefined);

  const renderShippingDetails = () =>
    render(<ShippingDetails receiverForm={given.receiverForm} onClick={handleClick} />);

  context('requiredFillReceiverDetail, requiredFillReceiverContact 값이 true이면', () => {
    given('receiverForm', () => ({
      requiredFillReceiverDetail: true,
      requiredFillReceiverContact: true,
    }));

    it('REQUIRED_FILL_RECEIVER_DETAIL_AND_CONTACT_MESSAGE 문구를 볼 수 있다', () => {
      const { container } = renderShippingDetails();

      expect(container).toHaveTextContent(REQUIRED_FILL_RECEIVER_DETAIL_AND_CONTACT_MESSAGE);
    });

    it('REQUIRED_FILL_RECEIVER_DETAIL_AND_CONTACT_MESSAGE 문구를 클릭하면 handleClick handler를 호출한다', () => {
      const { getByText } = renderShippingDetails();

      fireEvent.click(getByText(REQUIRED_FILL_RECEIVER_DETAIL_AND_CONTACT_MESSAGE));

      expect(handleClick).toBeCalled();
    });
  });

  context('requiredFillReceiverDetail 값이 false이고 requiredFillReceiverContact 값이 true이면', () => {
    given('receiverForm', () => ({
      requiredFillReceiverDetail: false,
      requiredFillReceiverContact: true,
    }));

    it('REQUIRED_FILL_RECEIVER_CONTACT_MESSAGE 문구를 볼 수 있다', () => {
      const { container } = renderShippingDetails();

      expect(container).toHaveTextContent(REQUIRED_FILL_RECEIVER_CONTACT_MESSAGE);
    });

    it('수정 버튼을 볼 수 있다', () => {
      const { container } = renderShippingDetails();

      expect(container).toHaveTextContent('수정');
    });

    it('수정을 클릭하면 handleClick handler를 호출한다', () => {
      const { getByText } = renderShippingDetails();

      fireEvent.click(getByText('수정'));

      expect(handleClick).toBeCalled();
    });
  });

  context('requiredFillReceiverContact 값이 false이고 requiredFillReceiverDetail 값이 true이면', () => {
    given('receiverForm', () => ({
      name: '받을 사람',
      phone: '01012345678',
      requiredFillReceiverDetail: true,
      requiredFillReceiverContact: false,
    }));

    it('REQUIRED_FILL_RECEIVER_DETAIL_MESSAGE 문구를 볼 수 있다', () => {
      const { container } = renderShippingDetails();

      expect(container).toHaveTextContent(REQUIRED_FILL_RECEIVER_DETAIL_MESSAGE);
    });

    it('수정 버튼을 볼 수 있다', () => {
      const { container } = renderShippingDetails();

      expect(container).toHaveTextContent('수정');
    });

    it('수정을 클릭하면 handleClick handler를 호출한다', () => {
      const { getByText } = renderShippingDetails();

      fireEvent.click(getByText('수정'));

      expect(handleClick).toBeCalled();
    });
  });

  describe('샛별 배송', () => {
    context('받으실 분 정보도 있고, 받으실 장소도 입력 완료 시', () => {
      given('receiverForm', () => ({
        name: '이름',
        phone: '01012345668',
        receivePlace: ReceivePlace.DOOR,
        frontDoorMethod: FrontDoorMethod.PASSWORD,
        frontDoorDetail: '123123',
        deliveryCompleteMessage: DeliveryCompleteMessage.IMMEDIATELY,
        deliveryType: 'direct',
      }));

      it('이름, 핸드폰 번호를 같이 볼 수 있다', () => {
        const { container } = renderShippingDetails();
        const { name, phone } = given.receiverForm;

        expect(container).toHaveTextContent(`${name}, ${appendHyphenToPhoneNumber(phone)}`);
      });

      it('수정 버튼을 볼 수 있다', () => {
        const { container } = renderShippingDetails();

        expect(container).toHaveTextContent('수정');
      });

      it('배송 장소가 어디인지 볼 수 있다', () => {
        const { container } = renderShippingDetails();
        const { receivePlace } = given.receiverForm;

        expect(container).toHaveTextContent(OldReceivePlaceTextMap[receivePlace as ReceivePlace]);
      });

      it('수정을 클릭하면 handleClick handler를 호출한다', () => {
        const { getByText } = renderShippingDetails();

        fireEvent.click(getByText('수정'));

        expect(handleClick).toBeCalled();
      });
    });
  });

  describe('택배 배송', () => {
    context('받으실 분과 받으실 장소 모두 입력 완료 시', () => {
      given('receiverForm', () => ({
        name: '받을 사람',
        phone: '01012345678',
        memo: '배송기사 요청사항',
        deliveryType: 'indirect',
      }));

      it('이름, 핸드폰 번호를 같이 볼 수 있다', () => {
        const { container } = renderShippingDetails();
        const { name, phone } = given.receiverForm;

        expect(container).toHaveTextContent(`${name}, ${appendHyphenToPhoneNumber(phone)}`);
      });

      it('수정 버튼을 볼 수 있다', () => {
        const { container } = renderShippingDetails();

        expect(container).toHaveTextContent('수정');
      });
    });

    context('받으실분은 입력하고, 배송기사 요청사항은 미 입력 시', () => {
      given('receiverForm', () => ({
        name: '받으실 분',
        phone: '01011111111',
        memo: '',
        deliveryType: 'indirect',
      }));

      it('REQUIRED_FILL_RECEIVER_DETAIL_AND_CONTACT_MESSAGE 문구를 볼 수 없다', () => {
        const { container } = renderShippingDetails();

        expect(container).not.toHaveTextContent(REQUIRED_FILL_RECEIVER_DETAIL_AND_CONTACT_MESSAGE);
      });

      it('수정 버튼을 볼 수 있다', () => {
        const { container } = renderShippingDetails();

        expect(container).toHaveTextContent('수정');
      });

      it('수정을 클릭하면 handleClick handler를 호출한다', () => {
        const { getByText } = renderShippingDetails();

        fireEvent.click(getByText('수정'));

        expect(handleClick).toBeCalled();
      });
    });

    context('받으실분과 요청사항 둘 다 입력시 ', () => {
      given('receiverForm', () => ({
        name: '받으실 분',
        phone: '01011111111',
        memo: '경비실',
        deliveryType: 'indirect',
      }));

      it('REQUIRED_FILL_RECEIVER_DETAIL_AND_CONTACT_MESSAGE 문구를 볼 수 없다', () => {
        const { container } = renderShippingDetails();

        expect(container).not.toHaveTextContent(REQUIRED_FILL_RECEIVER_DETAIL_AND_CONTACT_MESSAGE);
      });

      it('이름, 핸드폰 번호를 같이 볼 수 있다', () => {
        const { container } = renderShippingDetails();
        const { name, phone } = given.receiverForm;

        expect(container).toHaveTextContent(`${name}, ${appendHyphenToPhoneNumber(phone)}`);
      });

      it('수정 버튼을 볼 수 있다', () => {
        const { container } = renderShippingDetails();

        expect(container).toHaveTextContent('수정');
      });

      it('수정을 클릭하면 handleClick handler를 호출한다', () => {
        const { getByText } = renderShippingDetails();

        fireEvent.click(getByText('수정'));

        expect(handleClick).toBeCalled();
      });
    });
  });
});
