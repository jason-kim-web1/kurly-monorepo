import { DealDeliveryType, SupportDeliveryPolicy } from '../src/shared/constant';

export const allSupportDelivery: DealDeliveryType[] = [
  {
    deliveryType: SupportDeliveryPolicy.DAWN,
    isDeliveryProduct: true,
  },
  {
    deliveryType: SupportDeliveryPolicy.DAY_PARCEL,
    isDeliveryProduct: true,
  },
  {
    deliveryType: SupportDeliveryPolicy.MANUAL_DAY_PARCEL,
    isDeliveryProduct: true,
  },
  {
    deliveryType: SupportDeliveryPolicy.GOURMET_DELIVERY,
    isDeliveryProduct: false,
  },
  {
    deliveryType: SupportDeliveryPolicy.NORMAL_PARCEL,
    isDeliveryProduct: false,
  },
  {
    deliveryType: SupportDeliveryPolicy.INSTALLATION_DELIVERY,
    isDeliveryProduct: false,
  },
  {
    deliveryType: SupportDeliveryPolicy.ONLINE_TICKET,
    isDeliveryProduct: false,
  },

  {
    deliveryType: SupportDeliveryPolicy.AIRLINE_TICKET,
    isDeliveryProduct: false,
  },
  {
    deliveryType: SupportDeliveryPolicy.SELF_PICKUP_WINE,
    isDeliveryProduct: false,
  },
];
