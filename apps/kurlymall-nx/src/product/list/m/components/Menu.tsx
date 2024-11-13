import { useEffect, useState, useCallback } from 'react';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';

import styled from '@emotion/styled';

import { cloneDeep } from 'lodash';

import COLOR from '../../../../shared/constant/colorset';
import { listSubMenuShadow, listSubMenuLine } from '../../../../shared/images';

import { useSiblingCategory } from '../../categories/hook/useSiblingCategory';
import { ProductSibling } from '../../types';
import { useCategoriesPageQueries } from '../../categories/Context/CategoriesDataProvider';

const SWIPER_FILTER_GAP_SIZE = 16;

const MenuWrap = styled.div`
  overflow: hidden;
  position: absolute;
  z-index: 2;
  left: 0;
  top: 44px;
  width: 100%;
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
  padding: 12px 0;
  font-size: 16px;
  color: ${COLOR.kurlyGray600};
  line-height: 20px;
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

const swiperStyles = {
  padding: `0 ${SWIPER_FILTER_GAP_SIZE}px`,
  '.swiper-slide': {
    width: 'auto',
  },
};

interface SwiperExtendProps extends SwiperClass {
  virtualSize?: number;
}

interface Props {
  rootCategoryCode: string;
  isShowAll: boolean;
  onMenuChange: (code: string, name: string) => void;
}

export default function Menu({ rootCategoryCode, isShowAll, onMenuChange }: Props) {
  const { categoryNo: code } = useCategoriesPageQueries();
  const { data: siblingCategoriesData } = useSiblingCategory({
    categoryNo: rootCategoryCode,
    options: { enabled: !!rootCategoryCode },
  });
  const [isMenuStartDim, setIsMenuStartDim] = useState(true);
  const [isMenuEndDim, setIsMenuEndDim] = useState(true);
  const [swiper, setSwiper] = useState<SwiperExtendProps>();
  const [isSwiperOption, setIsSwiperOption] = useState(true);
  const [siblingCategories, setSiblingCategories] = useState<ProductSibling[]>([]);

  const handleRemoveDim = useCallback(() => {
    setIsMenuStartDim(false);
    setIsMenuEndDim(false);
  }, []);

  const changeSlide = useCallback(
    (event: SwiperExtendProps) => {
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

  useEffect(() => {
    if (!!siblingCategoriesData) {
      setSiblingCategories(cloneDeep(siblingCategoriesData));
      if (isShowAll) {
        setSiblingCategories((prev) => [
          {
            code: rootCategoryCode,
            name: '전체보기',
          },
          ...prev,
        ]);
      }
    }
  }, [isShowAll, rootCategoryCode, siblingCategoriesData]);

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
      return;
    }

    if (!siblingCategories) {
      return;
    }

    const initialSlideIndex = siblingCategories.findIndex((it) => it.code === code);
    swiper.slideTo(initialSlideIndex);
  }, [code, handleRemoveDim, siblingCategories, swiper]);

  if (!siblingCategoriesData) {
    return null;
  }

  return (
    <MenuWrap>
      <MenuDim>
        {isMenuStartDim ? <MenuStartDim /> : null}
        {isMenuEndDim ? <MenuEndDim /> : null}
      </MenuDim>
      <Swiper
        slidesPerView={'auto'}
        watchOverflow={!isSwiperOption}
        spaceBetween={SWIPER_FILTER_GAP_SIZE}
        centeredSlides={isSwiperOption}
        slideToClickedSlide={isSwiperOption}
        centeredSlidesBounds={isSwiperOption}
        css={swiperStyles}
        onTransitionStart={changeSlide}
        onSwiper={(s) => {
          setSwiper(s);
        }}
      >
        {siblingCategories
          ? siblingCategories.map((it) => (
              <SwiperSlide key={it.code}>
                <MenuLink isCurrent={it.code === code} onClick={() => onMenuChange(it.code, it.name)}>
                  {it.name}
                </MenuLink>
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </MenuWrap>
  );
}
