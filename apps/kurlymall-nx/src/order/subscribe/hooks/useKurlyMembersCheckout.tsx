import { useQuery } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';

import { getKurlyMembersCheckoutProduct } from '../services';
import { notifyAndRedirectTo } from '../../../shared/reducers/page';
import { MEMBERSHIP_PATH, getPageUrl } from '../../../shared/constant';
import { kurlyMembersQueryKeys } from '../constants';
import { useAppSelector } from '../../../shared/store';
import { isNotUndefined } from '../../../shared/utils/lodash-extends';

export default function useKurlyMembersCheckout() {
  const dispatch = useDispatch();
  const isChangePayment = useAppSelector(({ subscribeCheckout }) => subscribeCheckout.isChangePayment);

  const onError = (err: Error) => {
    dispatch(
      notifyAndRedirectTo({
        message: (err as Error).message,
        redirectUrl: getPageUrl(MEMBERSHIP_PATH.membership),
      }),
    );
  };

  const { data, ...queryResult } = useQuery(
    kurlyMembersQueryKeys.kurlyMembersCheckout(),
    () => getKurlyMembersCheckoutProduct(isChangePayment),
    {
      enabled: isNotUndefined(isChangePayment),
      cacheTime: 0,
      onError: (err: Error) => onError(err),
    },
  );

  return {
    order: data?.order,
    product: data?.product,
    kurlypayList: data?.kurlypayList,
    nextFreeTicket: data?.nextFreeTicket,
    couponPackList: data?.couponPackList ?? [],
    isKurlypayError: data?.isKurlypayError,
    ...queryResult,
  };
}
