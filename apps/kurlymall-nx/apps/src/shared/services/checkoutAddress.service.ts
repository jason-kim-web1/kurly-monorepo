import { readCheckoutAddress, updateCheckoutAddress } from '../api';
import { ReceiverForm } from '../../order/checkout/shared/interfaces';
import { appendHyphenToPhoneNumber, removeHyphen } from '.';
import { FrontDoorMethod, PickupDetailCategory, ReceivePlace, ReceiverDetailTemplate } from '../enums';
import { OrderTypes } from '../../order/checkout/shared/utils';
import { BaseAddressType } from '../interfaces/ShippingAddress';
import { CheckoutAddressRequest } from '../interfaces/Address';

export const fetchCheckoutAddress = async (type?: OrderTypes): Promise<ReceiverForm> => {
  const data = await readCheckoutAddress({ type: type ?? OrderTypes.CHECKOUT });

  return {
    name: data.receiverName,
    phone: removeHyphen(data.receiverPhoneNumber ?? ''),
    isDefaultAddress: data.type === 'D',
    addressNo: data.addressbookId,
    address: data.baseAddressType === 'R' ? data.roadAddress : data.jibunAddress,
    addressDetail: data.addressDetail,
    roadAddress: data.roadAddress,
    baseAddressType: data.baseAddressType === 'R' ? BaseAddressType.road : BaseAddressType.jibun,
    receivePlace: data.pickupType ? data.pickupType : ReceivePlace.DOOR,
    frontDoorMethod: data.accessMethod ? data.accessMethod : FrontDoorMethod.PASSWORD,
    frontDoorDetail: data.accessDetail,
    pickupDetailCategory: data.pickupDetailCategory || PickupDetailCategory.ETC,
    pickupDetail: data.pickupDetail,
    deliveryCompleteMessage: data.deliveryMessageTimeType,
    requiredFillReceiverDetail: data.requiredFillReceiverDetail,
    requiredFillReceiverContact: data.requiredFillReceiverContact,
    latitude: data.latitude,
    longitude: data.longitude,
    receiverTemplate: data.receiverTemplate,
    deliveryType: data.receiverTemplate !== ReceiverDetailTemplate.NO_DELIVERY_MSG_TIME ? 'direct' : 'indirect',
  };
};

export const putCheckoutAddress = async (receiverForm: ReceiverForm) => {
  const {
    name,
    phone,
    pickupDetail,
    frontDoorMethod,
    deliveryCompleteMessage,
    receivePlace,
    pickupDetailCategory,
    frontDoorDetail,
  } = receiverForm;

  const hasPickupDetail =
    receivePlace === ReceivePlace.ETC &&
    [PickupDetailCategory.PICKUP_BOX, PickupDetailCategory.ETC].includes(pickupDetailCategory);
  const hasAccessDetail =
    receivePlace === ReceivePlace.DOOR &&
    [FrontDoorMethod.PASSWORD, FrontDoorMethod.CALL_SECURITY_OFFICE, FrontDoorMethod.ETC].includes(frontDoorMethod);

  const putParams: CheckoutAddressRequest = {
    accessDetail: hasAccessDetail ? frontDoorDetail : '',
    accessMethod: receivePlace === ReceivePlace.DOOR ? frontDoorMethod : '',
    deliveryMessageTimeType: deliveryCompleteMessage,
    pickupDetail: hasPickupDetail ? pickupDetail : '',
    pickupDetailCategory: receivePlace === ReceivePlace.ETC ? pickupDetailCategory : '',
    pickupType: receivePlace,
    receiverName: name,
    receiverPhoneNumber: appendHyphenToPhoneNumber(phone),
  };

  await updateCheckoutAddress(putParams);
};
