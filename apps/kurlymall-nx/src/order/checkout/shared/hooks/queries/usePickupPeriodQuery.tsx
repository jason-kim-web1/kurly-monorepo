import { useQuery } from '@tanstack/react-query';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { orderCheckoutKeys } from '../../../../../mypage/order/shared/util/queryKeys';
import { fetchPickupPeriod } from '../../../../../shared/api/pickupService';
import { isDefined } from '../../../../../shared/utils/lodash-extends';
import { setValue } from '../../reducers/checkout.slice';

export default function usePickupPeriodQuery({ placeId }: { placeId?: number }) {
  const dispatch = useDispatch();

  const queryResult = useQuery([...orderCheckoutKeys.pickupPeriod(), placeId], () => fetchPickupPeriod({ placeId }), {
    enabled: isDefined(placeId),
    keepPreviousData: true,
    retry: false,
  });

  useEffect(() => {
    if (!queryResult.data) {
      return;
    }

    dispatch(setValue({ pickupPeriod: queryResult.data }));
  }, [dispatch, queryResult.data]);

  return queryResult;
}
