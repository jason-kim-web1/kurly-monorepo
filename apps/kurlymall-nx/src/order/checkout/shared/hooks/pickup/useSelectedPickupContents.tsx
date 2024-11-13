import { useMemo } from 'react';

import { useAppSelector } from '../../../../../shared/store';

import getSelectedPickupPlaceText from '../../../../shared/shared/utils/getSelectedPickupPlaceText';
import getPickupDate from '../../utils/getPickupDate';

import { usePickupPeriodQuery } from '../queries';

export default function useSelectedPickupContents() {
  const selectedPickupPlace = useAppSelector(({ checkout }) => checkout.selectedPickupPlace);

  const { data: pickupPeriod } = usePickupPeriodQuery({ placeId: selectedPickupPlace?.placeId });

  const selectedPickupContents = useMemo(
    () => getSelectedPickupPlaceText({ place: selectedPickupPlace, pickupDate: getPickupDate(pickupPeriod) }),
    [selectedPickupPlace, pickupPeriod],
  );

  return {
    selectedPickupPlace,
    selectedPickupContents,
  };
}
