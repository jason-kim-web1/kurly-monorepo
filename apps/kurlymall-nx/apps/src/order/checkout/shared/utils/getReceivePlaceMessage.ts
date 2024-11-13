import { FrontDoorMethod, PickupDetailCategory, ReceivePlace } from '../../../../shared/enums';
import { RECEIVE_PLACE_ETC_MESSAGES, RECEIVE_PLACE_FRONT_DOOR_MESSAGES } from '../constants/receiverDetails';

export const getReceivePlaceMessage = (
  receivePlace: ReceivePlace,
  frontDoorMethod: FrontDoorMethod,
  pickupDetailCategory: PickupDetailCategory,
) => {
  if (receivePlace === ReceivePlace.DOOR) {
    return RECEIVE_PLACE_FRONT_DOOR_MESSAGES[frontDoorMethod];
  }

  // receivePlace가 ReceivePlace.ETC 일 때
  return RECEIVE_PLACE_ETC_MESSAGES[pickupDetailCategory];
};

export const getVisibleListStyle = (messages: string[]) => {
  return messages.length > 1;
};
