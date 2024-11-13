import styled from '@emotion/styled';

import { isUndefined } from 'lodash';

import { NaverMapContextProvider } from '../../../../../../shared/context/NaverMapContext/NaverMapContext';
import NaverMap from '../../../../../../shared/components/NaverMap/NaverMap';
import Marker from '../../../../../../shared/components/NaverMap/Marker';
import { PickupPlace } from '../../../../shared/interfaces';
import COLOR from '../../../../../../shared/constant/colorset';
import { selectedMarkerIcon } from '../../../../shared/utils/pickup/getMarkerIcon';
import { LatLng } from '../../../../../../shared/interfaces/NaverMap/NaverMap.interface';
import { SHOW_MARKER_LATITUDE_CENTER } from '../../../../../../shared/components/NaverMap/constants/showMarkerLatitudeCenter';

const Wrapper = styled.section`
  width: 100%;
  padding: 0 8px 12px 8px;
`;

interface Props {
  pickupPlace?: PickupPlace;
}

export default function BottomSheetMap({ pickupPlace }: Props) {
  if (isUndefined(pickupPlace)) {
    return null;
  }

  const { latitude, longitude, partnerName, pickupShopName } = pickupPlace;

  const title = `[${partnerName}] ${pickupShopName}`;
  const position: { [key: string]: LatLng } = {
    map: { latitude: latitude + SHOW_MARKER_LATITUDE_CENTER, longitude },
    marker: { latitude, longitude },
  };

  return (
    <Wrapper>
      <NaverMapContextProvider>
        <NaverMap
          center={position.map}
          minZoom={14}
          maxZoom={18}
          style={{
            width: '100%',
            height: '240px',
            overflow: 'hidden',
          }}
          innerStyle={{
            border: `1px solid ${COLOR.kurlyGray200}`,
            borderRadius: '8px',
          }}
        >
          <Marker
            position={position.marker}
            title={title}
            icon={selectedMarkerIcon({ size: { width: 42, height: 52 } })}
          />
        </NaverMap>
      </NaverMapContextProvider>
    </Wrapper>
  );
}
