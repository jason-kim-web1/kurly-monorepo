import { OrderStatus, OrderStatusType } from '../enum/GiftOrderStatus.enum';

export const checkBeforeDelivery = (orderDetailStatus: OrderStatusType) => {
  return orderDetailStatus === OrderStatus.COMPLETED || orderDetailStatus === OrderStatus.PRODUCING;
};
