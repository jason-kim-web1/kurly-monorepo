import { DeliveryCompleteMessage, FrontDoorMethod, ReceivePlace } from '../../../enums';

export const readPickUpPlaceMock = {
  seq: 3336439,
  type: 'R',
  baseAddressType: 'R',
  name: '이름',
  zipCode: '03989',
  addr: '서울 강남구 지번 주소',
  addrSub: '2cc',
  roadZoneCode: '03989',
  roadAddr: '서울 강남구 도로명 주소',
  mobile: '010-1234-5678',
  meansType: FrontDoorMethod.PASSWORD,
  means: '1234',
  pickupType: ReceivePlace.DOOR,
  pickupDetail: '',
  deliveryMsgTime: DeliveryCompleteMessage.IMMEDIATELY,
  memo: '',
  deliveryOperationTime: 'DAWN',
  regionGroupCode: 'S',
  deliveryProvider: 'FRS',
  policies: [
    {
      order: null,
      deactivation: null,
      courierOperation: {
        operation: {
          zone: 'DIRECT',
          time: 'DAWN',
        },
        provider: {
          name: 'FRS',
        },
        region: {
          name: null,
          description: null,
          group: {
            name: 'S',
            description: 'S',
          },
        },
      },
    },
  ],
};

export const readPickUpPlace = jest.fn().mockResolvedValue(readPickUpPlaceMock);

export const updatePickUpPlace = jest.fn().mockResolvedValue({
  mobile: '010-1234-5678',
  meansType: 6,
  memo: '(택배일 때) 배송기사에게 전하는 메세지 입니다',
  means: '(샛별일 때) 공동현관 출입방법 비번 및 기타 사항입니다',
  deliveryMsgTime: 1,
  pickupType: 1,
  pickupDetail: '공동현관 비밀번호 입니다',
  name: '이름',
});
