import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import { useEffect, useState } from 'react';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';

import COLOR from '../../../../shared/constant/colorset';

import FilterNavigatorItem from './FilterNavigatorItem';

const SWIPER_FILTER_GAP_SIZE = 20;

const Container = styled.div<{ direction?: string }>`
  height: 55px;
  position: sticky;
  padding: 12px 0;
  top: ${({ direction }) => (direction === 'up' ? 48 : 0)}px;
  background-color: ${COLOR.kurlyWhite};
`;

interface SwiperExtendProps extends SwiperClass {
  virtualSize?: number;
}

interface Props {
  activeInitialCharacter: string;
  onActiveInitialCharacter: (char: string) => void;
  filterGroupedByInitialCharacter: string[];
  scrollDirection: 'up' | 'down';
}

const swiperStyles = {
  padding: `0 ${SWIPER_FILTER_GAP_SIZE}px`,
  '.swiper-slide': {
    width: 'auto',
  },
};

export default function FilterNavigator({
  activeInitialCharacter,
  onActiveInitialCharacter,
  filterGroupedByInitialCharacter,
  scrollDirection,
}: Props) {
  const [swiper, setSwiper] = useState<SwiperExtendProps>();
  const [isSwiperOption, setIsSwiperOption] = useState(true);
  const [selectedItem, setSelectedItem] = useState(activeInitialCharacter);

  const handleClickInitialCharacter = (char: string) => {
    onActiveInitialCharacter(char);
    setSelectedItem(char);
  };

  useEffect(() => {
    if (!swiper) {
      return;
    }

    const { width, virtualSize } = swiper;

    if (!virtualSize || !width) {
      return;
    }

    if (width >= virtualSize) {
      setIsSwiperOption(false);
    }

    const activeSlideIndex = filterGroupedByInitialCharacter.findIndex((activeInitialChar, index) => {
      if (activeInitialChar === selectedItem) {
        return index;
      }
    });
    swiper.slideTo(activeSlideIndex);
  }, [filterGroupedByInitialCharacter, activeInitialCharacter, selectedItem, swiper]);

  if (isEmpty(filterGroupedByInitialCharacter)) {
    return null;
  }

  return (
    <Container direction={scrollDirection}>
      <Swiper
        slidesPerView={'auto'}
        watchOverflow={!isSwiperOption}
        spaceBetween={12}
        centeredSlides={isSwiperOption}
        slideToClickedSlide={isSwiperOption}
        centeredSlidesBounds={isSwiperOption}
        css={swiperStyles}
        onSwiper={(s) => {
          setSwiper(s);
        }}
      >
        {filterGroupedByInitialCharacter.map((initialCharacter) => (
          <SwiperSlide key={`${initialCharacter}`} onClick={() => handleClickInitialCharacter(initialCharacter)}>
            <FilterNavigatorItem
              initialCharacter={initialCharacter}
              isSelected={activeInitialCharacter === initialCharacter}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
