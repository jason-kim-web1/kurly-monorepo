import styled from '@emotion/styled';

import { AnimatePresence, motion } from 'framer-motion';

import { memo } from 'react';

import { PickupPlace } from '../../../../shared/interfaces';
import COLOR from '../../../../../../shared/constant/colorset';
import { multiMaxLineText } from '../../../../../../shared/utils';
import getPickupDistance from '../../../../shared/utils/getPickupDistance';
import SpecialInformation from '../../../../m/components/PickupDetails/SpecialInfomation';
import Marker from '../../../../../../shared/components/NaverMap/Marker';
import CheckboxIcon from '../../../../../../shared/components/Input/CheckboxIcon';
import NaverMap from '../../../../../../shared/components/NaverMap/NaverMap';
import { fadeVariant, slideToggleVariant } from '../../../../../../shared/styles/motions/common/common';
import { NaverMapContextProvider } from '../../../../../../shared/context/NaverMapContext/NaverMapContext';
import { selectedMarkerIcon } from '../../../../shared/utils/pickup/getMarkerIcon';
import { SHOW_MARKER_LATITUDE_CENTER } from '../../../../../../shared/components/NaverMap/constants/showMarkerLatitudeCenter';

const ItemWrapper = styled.li`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${COLOR.kurlyGray150};
  padding-bottom: 28px;
  + li > button:first-of-type {
    padding-top: 28px;
  }

  :last-of-type {
    border-bottom: 0;
  }

  :hover {
    button > div > p:first-of-type {
      color: ${COLOR.loversLavender};
    }
  }
`;

const ContentWrapper = styled.button`
  position: relative;
  display: flex;
  width: 100%;
  line-height: 19px;
`;

const IconWrapper = styled(motion.div)`
  position: absolute;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-left: 36px;
`;

const Name = styled.p<{ isSelected: boolean }>`
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR.kurlyGray800};
  margin-bottom: 6px;
  line-height: 21px;
  ${({ isSelected }) => multiMaxLineText(isSelected ? 2 : 1)}
`;

const Distance = styled(motion.span)`
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR.loversLavender};
  margin-right: 8px;
`;

const SpecialInformationWrapper = styled(motion.div)`
  padding-left: 36px;
`;

const NaverMapWrapper = styled(motion.div)`
  margin-top: 16px;
  height: 240px;
`;

const Address = styled.p<{ isSelected: boolean }>`
  ${({ isSelected }) => multiMaxLineText(isSelected ? 2 : 1)}
`;

interface Props {
  place: PickupPlace;
  isSelected: boolean;
  onClick(place: PickupPlace): void;
}

function PickupPlaceItem({ place, isSelected, onClick }: Props) {
  const {
    placeId,
    partnerName,
    pickupShopName,
    pickupShopPlace,
    distance,
    closeWeekend,
    specialInformation,
    latitude,
    longitude,
  } = place;
  const name = `[${partnerName}] ${pickupShopName}`;

  return (
    <ItemWrapper key={placeId} aria-label={`pickup-place-${placeId}`}>
      <ContentWrapper onClick={() => onClick(place)}>
        <AnimatePresence initial={false}>
          <IconWrapper
            key={`icon-${isSelected}-${placeId}`}
            initial="initial"
            animate="animate"
            exit="initial"
            variants={fadeVariant}
          >
            <CheckboxIcon checked={isSelected} />
          </IconWrapper>
        </AnimatePresence>
        <Content>
          <Name isSelected={isSelected}>{name}</Name>
          <Address isSelected={isSelected}>
            <Distance>{getPickupDistance(distance)}</Distance>
            {pickupShopPlace}
          </Address>
        </Content>
      </ContentWrapper>
      <AnimatePresence>
        {isSelected && (
          <motion.div
            key={`expansd-${placeId}`}
            initial="hide"
            animate="view"
            exit="hide"
            variants={slideToggleVariant}
          >
            <SpecialInformationWrapper>
              <SpecialInformation closeWeekend={closeWeekend} specialInformation={specialInformation} />
            </SpecialInformationWrapper>
            <NaverMapWrapper>
              <NaverMapContextProvider>
                <NaverMap
                  scrollWheel={false}
                  center={{ latitude: latitude + SHOW_MARKER_LATITUDE_CENTER, longitude }}
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
                    title={name}
                    position={{ latitude, longitude }}
                    icon={selectedMarkerIcon({ size: { width: 42, height: 52 } })}
                  />
                </NaverMap>
              </NaverMapContextProvider>
            </NaverMapWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </ItemWrapper>
  );
}

export default memo(PickupPlaceItem);
