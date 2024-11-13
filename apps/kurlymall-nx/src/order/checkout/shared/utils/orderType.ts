import { NextRouter } from 'next/router';

export enum OrderTypes {
  GIFT = 'GIFT',
  JOIN = 'JOIN',
  PICKUP = 'PICKUP',
  CHECKOUT = 'NORMAL',
}

export const getOrderType = (router: NextRouter): OrderTypes => {
  const { route } = router;

  const isJoinOrder = route.substring(route.lastIndexOf('/') + 1) === 'join';
  const isGiftOrder = Boolean(router.query.gift);

  if (isGiftOrder) {
    return OrderTypes.GIFT;
  }

  if (isJoinOrder) {
    return OrderTypes.JOIN;
  }

  return OrderTypes.CHECKOUT;
};
