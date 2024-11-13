import { useEffect, useState } from 'react';

import { isEmpty } from 'lodash';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';

import styled from '@emotion/styled';

import { useRouter } from 'next/router';

import Link from 'next/link';

import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';
import { x10x11xccc } from '../../../../shared/images';

import type { UrlBasedFilter } from '../../shared/util/parseFilterData';
import type { ActiveFilter } from './ProductList';
import type { FilterGroup, MobileActiveFilterNameWithHref } from '../../types';
import { getActiveFilterList } from '../../shared/util/getActiveFilterList';

const FilterSelectWrap = styled.div<{ isBottomSheet: boolean }>`
  overflow: hidden;
  width: 100%;
  padding: ${({ isBottomSheet }) => (isBottomSheet ? '14px 0 13px' : '0 0 16px')};
  border-top: ${({ isBottomSheet }) => (isBottomSheet ? `1px solid ${COLOR.kurlyGray200}` : '')};
`;

const ActiveItemStyle = css`
  display: block;
  position: relative;
  margin-right: 25px;
  padding-right: 10px;
  font-size: 14px;
  color: ${COLOR.loversLavender};
  line-height: 20px;
  white-space: nowrap;
`;

const ActiveItemLink = styled.a`
  ${ActiveItemStyle};
`;

const BottomSheetActiveButton = styled.button`
  ${ActiveItemStyle};
`;

const QuickFilterActiveButton = styled.button``;

const DeleteIcon = styled.img`
  position: absolute;
  top: 5px;
  right: -6px;
`;

const swiperStyles = {
  '.swiper-slide': {
    width: 'auto',
    '&:first-of-type': {
      marginLeft: '20px',
    },
  },
};

interface SwiperExtendProps extends SwiperClass {
  virtualSize?: number;
}

interface Props {
  filterData?: FilterGroup[];
  activeFilter: UrlBasedFilter;
  onActiveFilter: ({ filterGroupKey, template, filterKey, isActive }: ActiveFilter) => void;
  isBottomSheet: boolean;
}

export default function ActiveFilterValueContainer({ filterData, activeFilter, onActiveFilter, isBottomSheet }: Props) {
  const router = useRouter();
  const { query, pathname } = router;
  const [activeFilterList, setActiveFilterList] = useState<MobileActiveFilterNameWithHref[]>();

  const [swiper, setSwiper] = useState<SwiperExtendProps>();
  const [isSwiperOption, setIsSwiperOption] = useState(true);

  useEffect(() => {
    if (isEmpty(activeFilter) || !activeFilter) {
      return;
    }

    if (!filterData) {
      return;
    }

    if (!swiper || swiper.destroyed) {
      return;
    }

    const { width, virtualSize } = swiper;

    if (!virtualSize || !width) {
      return;
    }

    if (width >= virtualSize) {
      setIsSwiperOption(false);
    }

    const activeList = getActiveFilterList({
      activeFilter,
      filterData,
      query,
      pathname,
      isMobile: true,
    });

    setActiveFilterList(activeList);

    if (virtualSize >= width) {
      const swiperLength = swiper.slides?.length;
      const slideToLastActiveFilterItem = setTimeout(() => {
        swiper.slideTo(swiperLength, 100);
      }, 0);

      return () => clearTimeout(slideToLastActiveFilterItem);
    }
  }, [activeFilter, filterData, swiper, query, pathname]);

  if (isEmpty(activeFilter)) {
    return null;
  }

  return (
    <FilterSelectWrap isBottomSheet={isBottomSheet}>
      <Swiper
        slidesPerView={'auto'}
        slideToClickedSlide={isSwiperOption}
        centeredSlides={false}
        centeredSlidesBounds={isSwiperOption}
        spaceBetween={0}
        css={swiperStyles}
        onSwiper={(s) => {
          setSwiper(s);
        }}
      >
        {activeFilterList?.map(({ name, href, groupKey, template, filterKey }, index) => {
          return (
            <SwiperSlide key={`${name}-${index}`}>
              {isBottomSheet ? (
                <BottomSheetActiveButton
                  onClick={() =>
                    onActiveFilter({
                      filterGroupKey: groupKey,
                      template,
                      filterKey,
                      isActive: true,
                    })
                  }
                >
                  {name}
                  <DeleteIcon src={x10x11xccc} />
                </BottomSheetActiveButton>
              ) : (
                <QuickFilterActiveButton>
                  <Link href={href} passHref replace>
                    <ActiveItemLink>
                      {name}
                      <DeleteIcon src={x10x11xccc} />
                    </ActiveItemLink>
                  </Link>
                </QuickFilterActiveButton>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </FilterSelectWrap>
  );
}
