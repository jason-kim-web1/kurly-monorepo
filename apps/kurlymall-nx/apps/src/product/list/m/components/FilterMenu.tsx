import { useCallback, useEffect, useMemo, useState } from 'react';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';

import styled from '@emotion/styled';

import { eq, partition } from 'lodash';

import COLOR from '../../../../shared/constant/colorset';

import { UrlBasedFilter } from '../../shared/util/parseFilterData';
import { useCollectionListPageQueryParams } from '../../collections/hook/useCollectionsPageQueryParams';

import { FilterGroup } from '../../types';

import { listSubMenuShadow, listSubMenuLine } from '../../../../shared/images';
import { ne } from '../../../../shared/utils/lodash-extends';

const SWIPER_FILTER_GAP_SIZE = 16;

const MenuWrap = styled.div`
  overflow: hidden;
  width: 100%;
  left: 0;
  top: 64px;
  background: ${COLOR.kurlyWhite} url(${listSubMenuLine}) repeat-x 0 100%;
`;

const MenuDim = styled.div`
  position: relative;
`;

const MenuStartDim = styled.div`
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  width: 50px;
  height: 44px;
  background: url(${listSubMenuShadow}) repeat-y 0 0;
  background-size: 50px 1px;
  pointer-events: none;
`;

const MenuEndDim = styled(MenuStartDim)`
  left: auto;
  right: 0;
  transform: rotate(180deg);
`;

const MenuLink = styled.a<{ isCurrent: boolean }>`
  display: block;
  padding: 13px 0 13px;
  font-size: 15px;
  font-weight: 400;
  color: ${COLOR.kurlyGray600};
  line-height: 18px;
  white-space: nowrap;
  ${({ isCurrent }) =>
    isCurrent
      ? `
      position: relative;
      font-weight: 600;
      color: ${COLOR.kurlyPurple};
      &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: ${COLOR.kurlyPurple};
      };
    `
      : ''}
`;

const MenuCount = styled.span<{ isCurrent: boolean }>`
  font-size: 12px;
  color: ${COLOR.kurlyGray350};
  font-weight: 400;
  line-height: 18px;
  margin: 2px;
  ${({ isCurrent }) =>
    isCurrent
      ? `
      position: relative;
      font-weight: 600;
      color: ${COLOR.kurlyPurple};
    `
      : ''}
`;

const swiperStyles = {
  padding: `0 ${SWIPER_FILTER_GAP_SIZE}px !important`,
  '.swiper-slide': {
    width: 'auto',
  },
};

interface SwiperExtendProps extends SwiperClass {
  virtualSize?: number;
}

interface Props {
  filterData?: FilterGroup[];
  activeFilter: UrlBasedFilter;
  selectedFilterKey: string;
  hasPromotion?: boolean;
  setSelectedFilterKey: React.Dispatch<React.SetStateAction<string>>;
}

export default function FilterMenu({
  filterData,
  activeFilter,
  selectedFilterKey,
  hasPromotion = false,
  setSelectedFilterKey,
}: Props) {
  const [isMenuStartDim, setIsMenuStartDim] = useState(true);
  const [isMenuEndDim, setIsMenuEndDim] = useState(true);
  const [swiper, setSwiper] = useState<SwiperExtendProps>();
  const [isSwiperOption, setIsSwiperOption] = useState(true);

  const { filters } = useCollectionListPageQueryParams();

  const filteredAndSortedData = useMemo(() => {
    const [rest, promotionItems] = partition(filterData, (item) => ne(item.key, 'promotion'));
    return [...rest, ...promotionItems] || [];
  }, [filterData]);

  const handleRemoveDim = useCallback(() => {
    setIsMenuStartDim(false);
    setIsMenuEndDim(false);
  }, []);

  const changeSlide = useCallback(
    (event: SwiperClass) => {
      if (!isSwiperOption) {
        handleRemoveDim();
        return;
      }

      const { isBeginning, isEnd } = event;
      setIsMenuStartDim(!isBeginning);
      setIsMenuEndDim(!isEnd);
    },
    [isSwiperOption, handleRemoveDim],
  );

  const isFilterMatchedOrPromotion = (filterGroup: FilterGroup) => {
    return eq(filterGroup.key, selectedFilterKey) || (hasPromotion && eq(filterGroup.template, 'promotion'));
  };

  const handleClickFilterMenu = (clickedKey: string) => {
    setSelectedFilterKey(clickedKey);
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
      handleRemoveDim();
    }

    if (filteredAndSortedData) {
      const defaultIndex = filteredAndSortedData.findIndex((it) => it.key === selectedFilterKey);
      swiper.slideTo(defaultIndex);

      for (const [key, value] of Object.entries(filters)) {
        const selectedFilterGroup = filteredAndSortedData.find((filterGroup) => filterGroup.key === key);
        if (selectedFilterGroup) {
          if (
            !value.every((urlFilterValue) => {
              return selectedFilterGroup.values.some((filterValue) => filterValue.key === urlFilterValue);
            })
          ) {
            return;
          }
        }
      }
    }
  }, [swiper, filters, filteredAndSortedData, selectedFilterKey, handleRemoveDim]);

  useEffect(() => {
    if (!swiper) {
      return;
    }
    swiper.updateSlides();
  }, [swiper, activeFilter]);

  return (
    <MenuWrap>
      {!!filteredAndSortedData && (
        <>
          <MenuDim>
            {isMenuStartDim && <MenuStartDim />}
            {isMenuEndDim && <MenuEndDim />}
          </MenuDim>
          <Swiper
            slidesPerView={'auto'}
            watchOverflow={!isSwiperOption}
            spaceBetween={SWIPER_FILTER_GAP_SIZE}
            slideToClickedSlide={isSwiperOption}
            centeredSlides={isSwiperOption}
            centeredSlidesBounds={isSwiperOption}
            css={swiperStyles}
            onTransitionStart={changeSlide}
            onSwiper={(s) => {
              setSwiper(s);
            }}
          >
            {filteredAndSortedData.map((filterGroup) => (
              <SwiperSlide key={filterGroup.key}>
                <MenuLink
                  isCurrent={isFilterMatchedOrPromotion(filterGroup)}
                  onClick={() => handleClickFilterMenu(filterGroup.key)}
                >
                  {filterGroup.name}
                  <MenuCount isCurrent={isFilterMatchedOrPromotion(filterGroup)}>
                    {activeFilter[filterGroup.key] && activeFilter[filterGroup.key].length > 0
                      ? activeFilter[filterGroup.key].length
                      : ''}
                  </MenuCount>
                </MenuLink>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </MenuWrap>
  );
}
