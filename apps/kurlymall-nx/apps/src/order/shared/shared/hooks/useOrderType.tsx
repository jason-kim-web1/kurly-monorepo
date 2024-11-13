import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { getOrderType, OrderTypes } from '../../../checkout/shared/utils';
import { setOrderType } from '../../../checkout/shared/reducers/checkout.slice';

export default function useOrderType() {
  const router = useRouter();
  const dispatch = useDispatch();

  const orderType = getOrderType(router);
  const isGiftOrder = orderType === OrderTypes.GIFT;

  useEffect(() => {
    dispatch(setOrderType(orderType));
  }, [dispatch, orderType]);

  return {
    orderType,
    isGiftOrder,
  };
}
