import { isEmpty, isUndefined } from 'lodash';

import styled from '@emotion/styled';

import { Ref, forwardRef, memo } from 'react';

import EmptyPickupPlaces from '../../../../shared/components/PickupDetails/ListviewContents/EmptyPickupPlaces';
import { PickupPlace, placeSearchType } from '../../../../shared/interfaces';
import PickupPlaceItem from './PickupPlaceItem';
import SkeletonPlaceList from './SkeletonPlaceList';
import { usePickupDetail } from '../../../../shared/context/PickupDetailContext';

const ListWrapper = styled.ul`
  padding: 16px 30px 0;
`;

const Target = styled.div`
  min-height: 1px;
`;

interface Props {
  places?: PickupPlace[];
  isLoading: boolean;
}

const PickupPlaceList = ({ places, isLoading }: Props, ref: Ref<HTMLDivElement>) => {
  const { placeState, actions } = usePickupDetail();
  const selected = placeState[placeSearchType.KEYWORD];

  if (isUndefined(places) || isLoading) {
    return <SkeletonPlaceList />;
  }

  if (isEmpty(places)) {
    return <EmptyPickupPlaces />;
  }

  return (
    <ListWrapper aria-label="pickup-list">
      {places.map((place) => (
        <PickupPlaceItem
          key={place.placeId}
          place={place}
          onClick={actions.openAndSelect}
          isSelected={selected?.placeId === place.placeId}
        />
      ))}
      <Target ref={ref} />
    </ListWrapper>
  );
};

export default memo(forwardRef(PickupPlaceList));
