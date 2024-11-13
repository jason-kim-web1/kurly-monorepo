import styled from '@emotion/styled';

import { memo } from 'react';

import { PickupPlace } from '../../../../shared/interfaces';
import COLOR from '../../../../../../shared/constant/colorset';
import { multiMaxLineText } from '../../../../../../shared/utils';
import getPickupDistance from '../../../../shared/utils/getPickupDistance';

const ItemWrapper = styled.li`
  border-bottom: 1px solid ${COLOR.kurlyGray150};
  + li button {
    padding-top: 28px;
  }

  &:last-of-type {
    border-bottom: 0;
  }
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 28px;
  line-height: 19px;
`;

const Name = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${COLOR.kurlyGray800};
  margin-bottom: 6px;
  text-align: left;
  ${multiMaxLineText(1)}
`;

const AddressAndDistanceWrapper = styled.div`
  display: flex;
  color: ${COLOR.kurlyGray500};
`;

const Distance = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${COLOR.loversLavender};
  margin-right: 8px;
`;

const Address = styled.p`
  ${multiMaxLineText(1)}
`;

interface Props {
  place: PickupPlace;
  onClick(place: PickupPlace): void;
}

function PickupPlaceItem({ place, onClick }: Props) {
  const { placeId, partnerName, pickupShopName, pickupShopPlace, distance } = place;
  const name = `[${partnerName}] ${pickupShopName}`;

  return (
    <ItemWrapper key={placeId} aria-label={`pickup-place-${placeId}`}>
      <Button type="button" onClick={() => onClick(place)}>
        <Name>{name}</Name>
        <AddressAndDistanceWrapper>
          <Distance>{getPickupDistance(distance)}</Distance>
          <Address>{pickupShopPlace}</Address>
        </AddressAndDistanceWrapper>
      </Button>
    </ItemWrapper>
  );
}

export default memo(PickupPlaceItem);
