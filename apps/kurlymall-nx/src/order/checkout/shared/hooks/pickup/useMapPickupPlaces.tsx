import { useEffect, useMemo, useState } from 'react';

import { isUndefined } from 'lodash';

import { useCheckoutAddressQuery, usePickupPlacesQuery } from '../queries';
import { LatLng } from '../../../../../shared/interfaces/NaverMap/NaverMap.interface';
import { placeSearchType } from '../../interfaces';

export default function useMapPickupPlaces() {
  const [position, setPosition] = useState<LatLng | undefined>();

  const { data: checkoutAddress } = useCheckoutAddressQuery();

  const center = useMemo(
    () => checkoutAddress && { latitude: checkoutAddress.latitude, longitude: checkoutAddress.longitude },
    [checkoutAddress],
  );

  useEffect(() => {
    if (isUndefined(checkoutAddress)) {
      return;
    }

    const userPosition = {
      latitude: checkoutAddress.latitude,
      longitude: checkoutAddress.longitude,
    };
    setPosition(userPosition);
  }, [checkoutAddress]);

  const { data } = usePickupPlacesQuery({
    size: 100,
    searchType: placeSearchType.MAP,
    position,
  });

  const pickupPlaces = useMemo(() => (data ? data.pages[0].content : []), [data]);

  return {
    center,
    pickupPlaces,
    setPosition,
  };
}
