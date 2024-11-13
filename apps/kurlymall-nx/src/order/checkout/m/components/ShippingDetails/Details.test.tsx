import { render } from '@testing-library/react';

import { FrontDoorMethod, PickupDetailCategory, ReceivePlace } from '../../../../../shared/enums';

import Details from './Details';
import { FrontDoorMethodTextMap, PickupDetailCategoryTextMap } from '../../../../../shared/constant';
import { REQUIRED_FILL_RECEIVER_DETAIL_MESSAGE } from '../../../shared/constants/delivery-request-validate-message';

describe('Details 테스트', () => {
  given('receiverForm', () => undefined);
  given('isEmptyDirectReceiver', () => false);

  const renderDetails = () => render(<Details receiverForm={given.receiverForm} />);

  context('requiredFillReceiverDetail 값이 true이면', () => {
    given('receiverForm', () => ({
      requiredFillReceiverDetail: true,
    }));

    it('REQUIRED_FILL_RECEIVER_DETAIL_MESSAGE 문구를 볼 수 있다', () => {
      const { container } = renderDetails();

      expect(container).toHaveTextContent(REQUIRED_FILL_RECEIVER_DETAIL_MESSAGE);
    });
  });

  describe('샛별배송', () => {
    context('배송 장소가 문 앞이고 출입 방법이 공동현관 비밀번호이면', () => {
      given('receiverForm', () => ({
        receivePlace: ReceivePlace.DOOR,
        frontDoorMethod: FrontDoorMethod.PASSWORD,
        frontDoorDetail: '11',
        deliveryType: 'direct',
      }));

      it('출입방법 공동현관 비밀번호를 볼 수 있다', () => {
        const { container } = renderDetails();
        const { frontDoorDetail } = given.receiverForm;

        expect(container).toHaveTextContent(`${FrontDoorMethodTextMap.PASSWORD} (${frontDoorDetail})`);
      });
    });

    context('배송 장소가 문 앞이고 출입 방법이 자유출입가능이면', () => {
      given('receiverForm', () => ({
        receivePlace: ReceivePlace.DOOR,
        frontDoorMethod: FrontDoorMethod.FREE,
        frontDoorDetail: '',
        deliveryType: 'direct',
      }));

      it('출입방법 자유 출입 가능을 볼 수 있다', () => {
        const { container } = renderDetails();

        expect(container).toHaveTextContent(`${FrontDoorMethodTextMap.FREE}`);
      });
    });

    context('배송 장소가 문 앞이고 출입 방법이 경비실 호출이면', () => {
      given('receiverForm', () => ({
        receivePlace: ReceivePlace.DOOR,
        frontDoorMethod: FrontDoorMethod.CALL_SECURITY_OFFICE,
        frontDoorDetail: '배송장소 여기',
        deliveryType: 'direct',
      }));

      it('출입방법 경비실 호출을 볼 수 있다', () => {
        const { container } = renderDetails();
        const { frontDoorDetail } = given.receiverForm;

        expect(container).toHaveTextContent(`${FrontDoorMethodTextMap.CALL_SECURITY_OFFICE} (${frontDoorDetail})`);
      });
    });

    context('배송 장소가 기타 장소이고 세부 사항이 기타이면', () => {
      given('receiverForm', () => ({
        receivePlace: ReceivePlace.ETC,
        pickupDetailCategory: PickupDetailCategory.ETC,
        pickupDetail: '기타 장소 여기에요',
        deliveryType: 'direct',
      }));

      it('기타 장소 세부사항을 볼 수 있다', () => {
        const { container } = renderDetails();
        const { pickupDetail } = given.receiverForm;

        expect(container).toHaveTextContent(`${PickupDetailCategoryTextMap.ETC} (${pickupDetail})`);
      });
    });

    context('배송 장소가 기타 장소이고 세부 사항이 택배 수령실이면', () => {
      given('receiverForm', () => ({
        receivePlace: ReceivePlace.ETC,
        pickupDetailCategory: PickupDetailCategory.FRONT_OF_ENTRANCE,
        pickupDetail: '기타 장소 여기에요',
        deliveryType: 'direct',
      }));

      it('택배 수령실 세부사항을 볼 수 있다', () => {
        const { container } = renderDetails();
        const { pickupDetail } = given.receiverForm;

        expect(container).toHaveTextContent(`${PickupDetailCategoryTextMap.FRONT_OF_ENTRANCE} (${pickupDetail})`);
      });
    });

    context('배송 장소가 기타 장소이고 세부 사항이 공동현관(대문) 앞이면', () => {
      given('receiverForm', () => ({
        receivePlace: ReceivePlace.ETC,
        pickupDetailCategory: PickupDetailCategory.PICKUP_BOX,
        pickupDetail: '기타 장소 여기에요',
        deliveryType: 'direct',
      }));

      it('공동현관(대문) 앞을 볼 수 있다', () => {
        const { container } = renderDetails();

        expect(container).toHaveTextContent(`${PickupDetailCategoryTextMap.PICKUP_BOX}`);
      });
    });
  });
});
