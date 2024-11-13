import { useQuery } from '@tanstack/react-query';
import { isUndefined } from 'lodash';
import { useDispatch } from 'react-redux';

import useCheckoutError from '../useCheckoutError';
import { orderCheckoutKeys } from '../../../../../mypage/order/shared/util/queryKeys';
import { CheckoutProductsServiceResponse, GiftProductsServiceResponse } from '../../../../../shared/interfaces';

import { setValue } from '../../reducers/checkout.slice';
import { setCoupons } from '../../reducers/checkout-coupon.slice';
import { useAppSelector } from '../../../../../shared/store';
import { getCheckoutProducts } from '../../services/product.service';
import { OrderTypes } from '../../utils';

export default function useCheckoutProductQuery() {
  const dispatch = useDispatch();
  const pointBenefit = useAppSelector(({ member }) => member.pointBenefit);
  const orderType = useAppSelector(({ checkout }) => checkout.orderType);

  const { onError } = useCheckoutError();

  const queryResult = useQuery(
    orderCheckoutKeys.checkoutProduct(),
    () =>
      getCheckoutProducts({
        percent: pointBenefit?.percent ?? 0,
        orderType: orderType ?? OrderTypes.CHECKOUT,
      }),
    {
      cacheTime: 0,
      enabled: !isUndefined(pointBenefit) && !isUndefined(orderType),
      onSuccess: (response: CheckoutProductsServiceResponse | GiftProductsServiceResponse) => {
        const { coupons, ...checkoutState } = response;
        dispatch(setValue(checkoutState));
        dispatch(setCoupons(coupons));
      },
      onError: (err: Error) => onError(err),
    },
  );

  return { ...queryResult };
}
