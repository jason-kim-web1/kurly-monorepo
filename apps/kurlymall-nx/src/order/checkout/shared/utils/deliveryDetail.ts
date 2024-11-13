import { DeliveryCompleteMessage, FrontDoorMethod, PickupDetailCategory, ReceivePlace } from '../../../../shared/enums';
import { FrontDoorMethodTextMap, PickupDetailCategoryTextMap, ReceivePlaceTextMap } from '../../../../shared/constant';
import { alertTime } from '../constants';
import { ReceiverForm } from '../interfaces';

const getPlaceDetail = ({
  receivePlace,
  frontDoorMethod,
  pickupDetailCategory,
}: Pick<ReceiverForm, 'receivePlace' | 'frontDoorMethod' | 'pickupDetailCategory'>) => {
  if (receivePlace === ReceivePlace.ETC) {
    return PickupDetailCategoryTextMap[pickupDetailCategory ?? PickupDetailCategory.ETC];
  }

  return FrontDoorMethodTextMap[frontDoorMethod ?? FrontDoorMethod.PASSWORD];
};

export const getReceiverDetail = (receiverForm: ReceiverForm) => {
  const { receivePlace, pickupDetailCategory, frontDoorMethod, deliveryCompleteMessage } = receiverForm;

  return {
    place: ReceivePlaceTextMap[receivePlace ?? ReceivePlace.DOOR],
    detail: getPlaceDetail({
      receivePlace,
      frontDoorMethod,
      pickupDetailCategory,
    }),
    alert: alertTime[deliveryCompleteMessage || DeliveryCompleteMessage.AM7],
  };
};

export const getPlaceDetailText = ({
  name,
  value,
  pickupDetail,
}: {
  name: string;
  value: string;
  pickupDetail: string;
}) => {
  if (name === 'receivePlace' || name === 'pickupDetailCategory') {
    return '';
  }

  return name === 'pickupDetail' ? value : pickupDetail;
};

export const getMethodDetailText = ({
  name,
  value,
  frontDoorDetail,
}: {
  name: string;
  value: string;
  frontDoorDetail: string;
}) => {
  if (name === 'receivePlace' || name === 'frontDoorMethod') {
    return '';
  }

  return name === 'frontDoorDetail' ? value : frontDoorDetail;
};
