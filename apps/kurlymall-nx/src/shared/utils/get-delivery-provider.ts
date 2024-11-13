import { DeliveryProvider } from '../../mypage/order/shared/interfaces';
import { BusinessType } from '../enums';
import { Order } from '../interfaces/OrderDetail';

export const getDeliveryProvider = (orders: Order[]): DeliveryProvider => {
  const checkKurlyDelivery = (currentBusinessType: BusinessType) =>
    currentBusinessType === BusinessType.KURLY_FULFILLMENT ||
    currentBusinessType === BusinessType.KURLY_MANUAL_PROCESSING ||
    currentBusinessType === BusinessType.PARTNER_KURLY_CONSIGNMENT;

  const checkPartnerDelivery = (currentBusinessType: BusinessType) =>
    currentBusinessType === BusinessType.PARTNER_FULFILLMENT ||
    currentBusinessType === BusinessType.PARTNER_MANUAL_PROCESSING;

  if (orders.every((order) => checkKurlyDelivery(order.businessType))) {
    return 'kurly';
  }

  if (orders.every((order) => checkPartnerDelivery(order.businessType))) {
    return 'partner';
  }

  return 'none';
};
