import { ContentTypes } from '../../../marketing/shared/constants';

const VipContentTypes = {
  ...ContentTypes,
  Gift: 'gift',
  Association: 'association',
} as const;

const VipGiftDeliveryMethodType = {
  Delivery: 'delivery',
  Pickup: 'pickup',
} as const;

export { VipContentTypes, VipGiftDeliveryMethodType };
