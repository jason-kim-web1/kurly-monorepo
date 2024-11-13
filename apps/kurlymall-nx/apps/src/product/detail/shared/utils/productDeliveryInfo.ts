import { head, isUndefined } from 'lodash';

import type { DeliveryInfoType } from '../../../types';
import { SupportDeliveryPolicy } from '../../../../shared/constant';

const DeliveryTypeDictionary = {
  [SupportDeliveryPolicy.DAWN]: true,
  [SupportDeliveryPolicy.DAY_PARCEL]: true,
  [SupportDeliveryPolicy.MANUAL_DAY_PARCEL]: true,
  [SupportDeliveryPolicy.GOURMET_DELIVERY]: true,
  [SupportDeliveryPolicy.NORMAL_PARCEL]: true,
  [SupportDeliveryPolicy.INSTALLATION_DELIVERY]: true,
  [SupportDeliveryPolicy.ONLINE_TICKET]: false,
  [SupportDeliveryPolicy.AIRLINE_TICKET]: false,
  [SupportDeliveryPolicy.SELF_PICKUP_WINE]: false,
  [SupportDeliveryPolicy.QUICK_DELIVERY]: true,
  [SupportDeliveryPolicy.INTERNATIONAL_DIRECT]: true,
} as const;

const productDeliveryInfo = (deliveryTypeInfos: DeliveryInfoType[]) => {
  const deliveryTypeInfo = head(deliveryTypeInfos);

  if (isUndefined(deliveryTypeInfo)) {
    return {
      deliveryName: '',
      deliveryGuide: '',
      isDelivery: true,
    };
  }

  return {
    deliveryName: deliveryTypeInfo.description,
    deliveryGuide: deliveryTypeInfo.guide,
    isDelivery: DeliveryTypeDictionary[deliveryTypeInfo.type],
  };
};

export { productDeliveryInfo };
