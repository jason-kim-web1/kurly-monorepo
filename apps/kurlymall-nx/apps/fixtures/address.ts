import { ReceiverForm } from '../src/order/checkout/shared/interfaces';
import {
  DeliveryCompleteMessage,
  FrontDoorMethod,
  PickupDetailCategory,
  ReceivePlace,
  ReceiverDetailTemplate,
} from '../src/shared/enums';
import { BaseAddressType } from '../src/shared/interfaces/ShippingAddress';

export const receiverFormFixtures: ReceiverForm = {
  receiverTemplate: ReceiverDetailTemplate.DEFAULT,
  name: '이름',
  phone: '01012345678',
  addressNo: 3336439,
  address: '서울 강남구 지번 주소',
  addressDetail: '2cc',
  roadAddress: '서울 강남구 도로명 주소',
  baseAddressType: BaseAddressType.road,
  isDefaultAddress: false,
  receivePlace: ReceivePlace.DOOR,
  frontDoorMethod: FrontDoorMethod.PASSWORD,
  frontDoorDetail: '',
  deliveryCompleteMessage: DeliveryCompleteMessage.AM7,
  deliveryType: 'direct',
  pickupDetailCategory: PickupDetailCategory.PICKUP_BOX,
  pickupDetail: '',
  requiredFillReceiverDetail: false,
  requiredFillReceiverContact: false,
  latitude: 37.5666805,
  longitude: 126.9784147,
};
