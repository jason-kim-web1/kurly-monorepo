import { useInView } from 'react-intersection-observer';

import { useEffect, useMemo } from 'react';

import { get, head } from 'lodash';

import { useCheckoutAddressQuery, usePickupPlacesQuery } from '../queries';
import { placeSearchType } from '../../interfaces';

export default function usePickupIntersect({ keyword }: { keyword: string }) {
  const { ref, inView } = useInView({
    rootMargin: '10px',
  });

  const { data: checkoutAddress } = useCheckoutAddressQuery();
  const center = useMemo(
    () => checkoutAddress && { latitude: checkoutAddress.latitude, longitude: checkoutAddress.longitude },
    [checkoutAddress],
  );

  const { data, hasNextPage, fetchNextPage, isInitialLoading } = usePickupPlacesQuery({
    size: 30,
    searchType: placeSearchType.KEYWORD,
    keyword,
    position: center,
  });

  const pickupPlaces = useMemo(() => {
    if (!data) {
      return keyword.length === 1 ? [] : undefined;
    }

    return data.pages.flatMap(({ content }) => content);
  }, [keyword, data]);

  const total = useMemo(() => (data ? get(head(data.pages), 'total', 0) : 0), [data]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return {
    ref,
    pickupPlaces,
    total,
    isLoading: isInitialLoading,
  };
}
