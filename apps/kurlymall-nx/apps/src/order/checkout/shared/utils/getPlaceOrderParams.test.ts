import { getReceiverDetailParams } from '.';
import { DeliveryCompleteMessage, FrontDoorMethod, PickupDetailCategory, ReceivePlace } from '../../../../shared/enums';

describe('getPlaceOrderParams 테스트', () => {
  describe('샛별 배송', () => {
    describe('받으실 장소: 문 앞', () => {
      context('공동현관 출입방법이 공동현관 비밀번호이면', () => {
        given('receiverForm', () => ({
          name: '이름',
          phone: '01012345678',
          roadAddress: '도로명 주소',
          addressDetail: '주소 상세',
          roadZoneCode: '12356',
          receivePlace: ReceivePlace.DOOR,
          pickupDetail: '',
          frontDoorMethod: FrontDoorMethod.PASSWORD,
          frontDoorDetail: '공동현관 비밀번호',
          deliveryType: 'direct',
          memo: '',
          deliveryCompleteMessage: DeliveryCompleteMessage.AM7,
        }));

        it('올바른 값을 반환한다.', () => {
          const { pickupType, pickupDetail, accessMethod, accessDetail } = getReceiverDetailParams(given.receiverForm);

          expect(pickupType).toBe(ReceivePlace.DOOR);
          expect(pickupDetail).toBe('');
          expect(accessMethod).toBe(FrontDoorMethod.PASSWORD);
          expect(accessDetail).toBe('공동현관 비밀번호');
        });
      });

      context('공동현관 출입방법이 자유 출입 가능이면', () => {
        given('receiverForm', () => ({
          name: '이름',
          phone: '01012345678',
          roadAddress: '도로명 주소',
          addressDetail: '주소 상세',
          roadZoneCode: '12356',
          receivePlace: ReceivePlace.DOOR,
          pickupDetail: '',
          frontDoorMethod: FrontDoorMethod.FREE,
          frontDoorDetail: '',
          deliveryType: 'direct',
          memo: '',
          deliveryCompleteMessage: DeliveryCompleteMessage.AM7,
        }));

        it('올바른 값을 반환한다.', () => {
          const { pickupType, pickupDetail, accessMethod, accessDetail } = getReceiverDetailParams(given.receiverForm);

          expect(pickupType).toBe(ReceivePlace.DOOR);
          expect(pickupDetail).toBe('');
          expect(accessMethod).toBe(FrontDoorMethod.FREE);
          expect(accessDetail).toBe('');
        });
      });

      context('공동현관 출입방법이 기타이면', () => {
        given('receiverForm', () => ({
          name: '이름',
          phone: '01012345678',
          roadAddress: '도로명 주소',
          addressDetail: '주소 상세',
          roadZoneCode: '12356',
          receivePlace: ReceivePlace.DOOR,
          pickupDetail: '',
          frontDoorMethod: FrontDoorMethod.ETC,
          frontDoorDetail: '',
          deliveryType: 'direct',
          memo: '',
          deliveryCompleteMessage: DeliveryCompleteMessage.AM7,
        }));

        it('올바른 값을 반환한다.', () => {
          const { pickupType, pickupDetail, accessMethod, accessDetail } = getReceiverDetailParams(given.receiverForm);

          expect(pickupType).toBe(ReceivePlace.DOOR);
          expect(pickupDetail).toBe('');
          expect(accessMethod).toBe(FrontDoorMethod.ETC);
          expect(accessDetail).toBe('');
        });
      });
    });

    context('받으실 장소: 기타 장소 이면', () => {
      given('receiverForm', () => ({
        name: '이름',
        phone: '01012345678',
        roadAddress: '도로명 주소',
        addressDetail: '주소 상세',
        roadZoneCode: '12356',
        receivePlace: ReceivePlace.ETC,
        pickupDetailCategory: PickupDetailCategory.ETC,
        pickupDetail: '기타 장소 세부 사항',
        frontDoorMethod: FrontDoorMethod.PASSWORD,
        frontDoorDetail: '',
        deliveryType: 'direct',
        memo: '',
        deliveryCompleteMessage: DeliveryCompleteMessage.AM7,
      }));

      it('pickupDetail 을 반환한다.', () => {
        const { pickupType, pickupDetail, accessMethod, accessDetail } = getReceiverDetailParams(given.receiverForm);

        expect(pickupType).toBe(ReceivePlace.ETC);
        expect(pickupDetail).toBe('기타 장소 세부 사항');
        expect(accessMethod).toBe(null);
        expect(accessDetail).toBe('');
      });
    });
  });
});
