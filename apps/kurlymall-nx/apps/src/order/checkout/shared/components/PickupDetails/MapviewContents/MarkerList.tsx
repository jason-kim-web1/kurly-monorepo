import { memo } from 'react';

import { MarkerClickEvent } from '../../../../../../shared/interfaces/NaverMap/NaverMap.interface';
import { PickupPlace } from '../../../interfaces';
import { defaultMarkerIcon } from '../../../utils/pickup/getMarkerIcon';

import Marker from '../../../../../../shared/components/NaverMap/Marker';

interface Props {
  pickupPlaces: PickupPlace[];
  handleClickMarker: (pickupPlace: PickupPlace, event: MarkerClickEvent) => void;
}

function MarkerList({ pickupPlaces, handleClickMarker }: Props) {
  return (
    <>
      {pickupPlaces.map((pickupPlace) => {
        const { placeId, latitude, longitude, partnerName, pickupShopName } = pickupPlace;
        const title = `[${partnerName}] ${pickupShopName}`;

        return (
          <Marker
            key={placeId}
            title={title}
            onClick={(event) => handleClickMarker(pickupPlace, event)}
            position={{
              latitude,
              longitude,
            }}
            icon={defaultMarkerIcon({ size: { width: 24, height: 28 } })}
          />
        );
      })}
    </>
  );
}

export default memo(MarkerList);
