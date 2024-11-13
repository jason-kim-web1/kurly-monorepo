import { useInfiniteQuery } from '@tanstack/react-query';

import { get, head } from 'lodash';

import { useMemo } from 'react';

import { orderCheckoutKeys } from '../../../../../mypage/order/shared/util/queryKeys';
import { PlaceSearchType, placeSearchType } from '../../interfaces';
import useOrderType from '../../../../shared/shared/hooks/useOrderType';
import useCheckoutProductQuery from './useCheckoutProductQuery';

import { fetchPickupPlaces } from '../../../../../shared/api';
import { LatLng } from '../../../../../shared/interfaces/NaverMap/NaverMap.interface';
import { isDefined } from '../../../../../shared/utils/lodash-extends';

interface Params {
  size?: number;
  keyword?: string;
  searchType: PlaceSearchType;
  position?: LatLng;
}

export default function usePickupPlacesQuery({ size = 200, keyword = '', searchType, position }: Params) {
  useOrderType();

  const { data: checkoutProduct } = useCheckoutProductQuery();
  const dealProductNo = useMemo(() => head(get(checkoutProduct, 'products'))?.id, [checkoutProduct]);

  const enabled = isDefined(checkoutProduct) && isDefined(position) && keyword.length !== 1;

  return useInfiniteQuery(
    [...orderCheckoutKeys.pickupPlaces(), dealProductNo, searchType, keyword, position],
    ({ pageParam = null }) =>
      fetchPickupPlaces({
        size,
        dealProductNo: get(head(checkoutProduct?.products), 'dealProductNo'),
        latitude: position?.latitude,
        longitude: position?.longitude,
        searchKeyword: keyword,
        placeSearchType: searchType,
        cursor: pageParam,
      }),
    {
      retry: false,
      enabled,
      keepPreviousData: searchType === placeSearchType.MAP,
      getNextPageParam: ({ isLast, nextCursor }) => (isLast ? undefined : nextCursor),
    },
  );
}
