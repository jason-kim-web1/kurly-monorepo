import { render } from '@testing-library/react';

import { FrontDoorMethod, PickupDetailCategory, ReceivePlace } from '../../../../../../shared/enums';

import FrontDoorConfirmMessage from './ReceivePlaceMessage';
import {
  RECEIVE_PLACE_ETC_MESSAGES,
  RECEIVE_PLACE_FRONT_DOOR_MESSAGES,
} from '../../../../shared/constants/receiverDetails';

describe('ReceivePlaceMessage 테스트', () => {
  given('receivePlace', () => ReceivePlace.DOOR);
  given('frontDoorMethod', () => FrontDoorMethod.PASSWORD);
  given('pickupDetailCategory', () => PickupDetailCategory.ETC);

  const renderFrontDoorConfirmMessage = () =>
    render(
      <FrontDoorConfirmMessage
        receivePlace={given.receivePlace}
        frontDoorMethod={given.frontDoorMethod}
        pickupDetailCategory={given.pickupDetailCategory}
      />,
    );

  context('받으실 장소 가 문 앞 이고', () => {
    given('receivePlace', () => ReceivePlace.DOOR);

    context('공동현관 출입방법 이 공동현관 비밀번호 일 때', () => {
      given('frontDoorMethod', () => FrontDoorMethod.PASSWORD);

      it('공동현관 비밀번호 에 대한 안내 문구를 볼 수 있다.', () => {
        const { container } = renderFrontDoorConfirmMessage();

        RECEIVE_PLACE_FRONT_DOOR_MESSAGES.PASSWORD.forEach((message) => {
          expect(container).toHaveTextContent(message);
        });
      });
    });

    context('공동현관 출입방법 이 자유 출입 가능 일 때', () => {
      given('frontDoorMethod', () => FrontDoorMethod.FREE);

      it('자유 출입 가능 에 대한 안내 문구를 볼 수 있다.', () => {
        const { container } = renderFrontDoorConfirmMessage();

        RECEIVE_PLACE_FRONT_DOOR_MESSAGES.FREE.forEach((message) => {
          expect(container).toHaveTextContent(message);
        });
      });
    });

    context('공동현관 출입방법 이 경비실 호출 일 때', () => {
      given('frontDoorMethod', () => FrontDoorMethod.CALL_SECURITY_OFFICE);

      it('경비실 호출 에 대한 안내 문구를 볼 수 있다.', () => {
        const { container } = renderFrontDoorConfirmMessage();

        RECEIVE_PLACE_FRONT_DOOR_MESSAGES.CALL_SECURITY_OFFICE.forEach((message) => {
          expect(container).toHaveTextContent(message);
        });
      });
    });

    context('공동현관 출입방법 이 기타 일 때', () => {
      given('frontDoorMethod', () => FrontDoorMethod.ETC);

      it('기타 에 대한 안내 문구를 볼 수 있다.', () => {
        const { container } = renderFrontDoorConfirmMessage();

        RECEIVE_PLACE_FRONT_DOOR_MESSAGES.ETC.forEach((message) => {
          expect(container).toHaveTextContent(message);
        });
      });
    });
  });

  context('받으실 장소가 기타 장소 이고', () => {
    given('receivePlace', () => ReceivePlace.ETC);

    context('기타장소 세부사항 이 기타 일 때', () => {
      given('pickupDetailCategory', () => PickupDetailCategory.ETC);

      it('공동현관 비밀번호 에 대한 안내 문구를 볼 수 있다.', () => {
        const { container } = renderFrontDoorConfirmMessage();

        RECEIVE_PLACE_ETC_MESSAGES.ETC.forEach((message) => {
          expect(container).toHaveTextContent(message);
        });
      });
    });

    context('기타장소 세부사항 이 택배 수령실 일 때', () => {
      given('pickupDetailCategory', () => PickupDetailCategory.PICKUP_BOX);

      it('택배 수령실 에 대한 안내 문구를 볼 수 있다.', () => {
        const { container } = renderFrontDoorConfirmMessage();

        RECEIVE_PLACE_ETC_MESSAGES.PICKUP_BOX.forEach((message) => {
          expect(container).toHaveTextContent(message);
        });
      });
    });

    context('기타장소 세부사항 이 공동현관(대문) 앞 일 때', () => {
      given('pickupDetailCategory', () => PickupDetailCategory.FRONT_OF_ENTRANCE);

      it('공동현관(대문) 앞 에 대한 안내 문구를 볼 수 있다.', () => {
        const { container } = renderFrontDoorConfirmMessage();

        RECEIVE_PLACE_ETC_MESSAGES.FRONT_OF_ENTRANCE.forEach((message) => {
          expect(container).toHaveTextContent(message);
        });
      });
    });
  });
});
