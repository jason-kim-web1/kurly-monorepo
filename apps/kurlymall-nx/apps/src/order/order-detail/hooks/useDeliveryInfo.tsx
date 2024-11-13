import { OrderDetail } from '../interface/OrderDetail';

import useToggle from '../../checkout/shared/hooks/useToggle';
import { OldReceivePlaceTextMap } from '../../../shared/constant';
import { RECEIVER_PACKING_TYPE_TEXT } from '../../common/constants/ReceiverPackingType';
import { ACCESS_METHOD_TEXT_MAP } from '../../common/constants/AccessMethod';
import { PICKUP_TYPE, PickupType } from '../../common/constants/PickupType';

const getAccessText = (
  pickupType: PickupType,
  pickupDetail: string,
  accessMethod: OrderDetail['receiver']['accessMethod'],
  accessDetail: string,
) => {
  if (pickupType === PICKUP_TYPE.DOOR) {
    return {
      accessMethodText: '공동현관 출입방법',
      accessDetailText: `${ACCESS_METHOD_TEXT_MAP[accessMethod]} ${accessDetail && `(${accessDetail})`}`,
    };
  }

  return { accessMethodText: OldReceivePlaceTextMap[pickupType], accessDetailText: pickupDetail };
};

const useDeliveryInfo = (receiver: OrderDetail['receiver']) => {
  const { toggleWithAmplitude, isOpen } = useToggle(true);

  const { name, phoneNumber, pickupType, address, packingType, pickupDetail, accessMethod, accessDetail } = receiver;
  const addressText = `${address.address} ${address.addressDetail}`;
  const pickupTypeText = OldReceivePlaceTextMap[pickupType];
  const packingTypeText = packingType ? RECEIVER_PACKING_TYPE_TEXT[packingType] : '';
  const { accessDetailText, accessMethodText } = getAccessText(pickupType, pickupDetail, accessMethod, accessDetail);

  return {
    isOpen,
    toggleWithAmplitude,
    name,
    phoneNumber,
    addressText,
    pickupTypeText,
    packingTypeText,
    accessDetailText,
    accessMethodText,
  };
};

export default useDeliveryInfo;
