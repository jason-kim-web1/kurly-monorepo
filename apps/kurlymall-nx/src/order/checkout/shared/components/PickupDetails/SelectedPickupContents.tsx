import styled from '@emotion/styled';

import { isUndefined } from 'lodash';

import { css } from '@emotion/react';

import COLOR from '../../../../../shared/constant/colorset';
import { multiMaxLineText } from '../../../../../shared/utils';
import { PickupPlace } from '../../interfaces';
import getPickupDistance from '../../utils/getPickupDistance';
import SpecialInformation from '../../../m/components/PickupDetails/SpecialInfomation';
import { isPC } from '../../../../../../util/window/getDevice';

const Contents = styled.article`
  ${isPC
    ? css`
        padding: 24px 30px 8px;
      `
    : css`
        padding: 0 8px 16px 8px;
      `}
`;

const Title = styled.p`
  font-size: 18px;
  line-height: 23px;
  ${isPC
    ? css`
        font-weight: 500;
        margin-bottom: 6.5px;
      `
    : css`
        font-weight: 600;
        margin-bottom: 4px;
      `}
`;

const AddressAndDistanceWrapper = styled.div`
  color: ${COLOR.kurlyGray800};
`;

const Distance = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${COLOR.loversLavender};
  margin-right: 8px;
`;

const Address = styled.p`
  line-height: 20px;
  ${multiMaxLineText(2)}
`;

interface Props {
  pickupPlace?: PickupPlace;
  isKeywordType: boolean;
}

export default function SelectedPickupContents({ pickupPlace, isKeywordType }: Props) {
  if (isUndefined(pickupPlace)) {
    return null;
  }

  const { partnerName, pickupShopName, pickupShopPlace, distance, closeWeekend, specialInformation } = pickupPlace;
  const name = `[${partnerName}] ${pickupShopName}`;

  return (
    <Contents>
      <Title>{name}</Title>
      <AddressAndDistanceWrapper>
        <Address>
          {isKeywordType && <Distance>{getPickupDistance(distance)}</Distance>}
          {pickupShopPlace}
        </Address>
      </AddressAndDistanceWrapper>
      <SpecialInformation closeWeekend={closeWeekend} specialInformation={specialInformation} />
    </Contents>
  );
}
