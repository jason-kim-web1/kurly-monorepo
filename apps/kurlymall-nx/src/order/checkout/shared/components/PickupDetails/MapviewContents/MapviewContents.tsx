import { useCallback } from 'react';

import { isUndefined } from 'lodash';

import NaverMap from '../../../../../../shared/components/NaverMap/NaverMap';
import { useNaverMapContext } from '../../../../../../shared/context/NaverMapContext/NaverMapContext';
import useMapPickupPlaces from '../../../hooks/pickup/useMapPickupPlaces';
import Loading from '../../../../../../shared/components/Loading/Loading';

import { isPC, isWebview } from '../../../../../../../util/window/getDevice';
import { usePickupDetail } from '../../../context/PickupDetailContext';
import COLOR from '../../../../../../shared/constant/colorset';
import MarkerList from './MarkerList';
import { PickupPlace } from '../../../interfaces';
import { MarkerClickEvent } from '../../../../../../shared/interfaces/NaverMap/NaverMap.interface';
import { defaultMarkerIcon, selectedMarkerIcon } from '../../../utils/pickup/getMarkerIcon';

const mapStyle = (isPCPage: boolean, isWebviewPage: boolean) => ({
  width: '100%',
  height: 'calc(100vh - 108px)',
  borderTop: `1px solid ${COLOR.kurlyGray200}`,
  ...(isPCPage && {
    height: '506px',
    borderTop: '0',
  }),
  ...(isWebviewPage && {
    height: 'calc(100vh - 64px)',
  }),
});

export default function MapviewContents() {
  const { map } = useNaverMapContext();

  const { center, pickupPlaces, setPosition } = useMapPickupPlaces();
  const { marker: previousMarker, actions } = usePickupDetail();

  const handleOnDragEnd = useCallback(() => {
    if (!map) {
      return;
    }

    const latlng = map.getCenter() as naver.maps.LatLng;
    setPosition({ latitude: latlng.lat(), longitude: latlng.lng() });
  }, [map, setPosition]);

  const handleClickMarker = useCallback(
    (pickupPlace: PickupPlace, event: MarkerClickEvent) => {
      const clickedMarker = event.overlay;

      if (!previousMarker || previousMarker.current !== clickedMarker) {
        if (!!previousMarker.current) {
          previousMarker.current.setIcon(defaultMarkerIcon({ size: { width: 24, height: 28 } }));
          previousMarker.current.setZIndex(100);
        }

        clickedMarker.setIcon(selectedMarkerIcon({ size: { width: 42, height: 52 }, anchor: { x: 21, y: 39 } }));
        clickedMarker.setZIndex(9999);

        previousMarker.current = clickedMarker;
      }

      actions.openAndSelect(pickupPlace);
    },
    [previousMarker, actions],
  );

  if (isUndefined(center)) {
    return <Loading />;
  }

  return (
    <NaverMap
      style={mapStyle(isPC, isWebview())}
      center={center}
      onDragEnd={handleOnDragEnd}
      onMouseDown={actions.closeAndReset}
    >
      <MarkerList pickupPlaces={pickupPlaces} handleClickMarker={handleClickMarker} />
    </NaverMap>
  );
}
