import { useEffect, useState, useCallback, Dispatch, SetStateAction } from 'react';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';

import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { listSubMenuShadow, listSubMenuLine } from '../../../../shared/images';
import { ProductCollectionGroups } from '../../types';

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
  overflow: hidden;
  max-width: 120px;
  padding: 12px 0;
  font-size: 16px;
  color: ${COLOR.kurlyGray600};
  line-height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  '.swiper-slide': {
    width: 'auto',
  },
};

interface SwiperExtendProps extends SwiperClass {
  virtualSize?: number;
}

interface Props {
  code: string;
  groups: ProductCollectionGroups[];
  setCollectionCode: Dispatch<SetStateAction<string>>;
  onAmplitude: (groupCode: string) => void;
}

export default function MenuCollections({ code, groups, setCollectionCode, onAmplitude }: Props) {
  const [isMenuStartDim, setIsMenuStartDim] = useState(false);
  const [isMenuEndDim, setIsMenuEndDim] = useState(true);
  const [swiper, setSwiper] = useState<SwiperExtendProps>();
  const [isSwiperOption, setIsSwiperOption] = useState(true);

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
    [handleRemoveDim, isSwiperOption],
  );

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

    const initialSlideIndex = groups.findIndex((it, index) => {
      if (it.code === code) {
        return index;
      }
    });
    swiper.slideTo(initialSlideIndex);
  }, [code, groups, handleRemoveDim, swiper]);

  const handleClick = (groupCode: string) => {
    onAmplitude(groupCode);
    setCollectionCode(groupCode);
  };

  return (
    <MenuWrap>
      <MenuDim>
        {isMenuStartDim && <MenuStartDim />}
        {isMenuEndDim && <MenuEndDim />}
      </MenuDim>
      <Swiper
        slidesPerView={'auto'}
        watchOverflow={!isSwiperOption}
        spaceBetween={SWIPER_FILTER_GAP_SIZE}
        centeredSlides={isSwiperOption}
        slideToClickedSlide={isSwiperOption}
        centeredSlidesBounds={isSwiperOption}
        slidesOffsetBefore={SWIPER_FILTER_GAP_SIZE}
        slidesOffsetAfter={SWIPER_FILTER_GAP_SIZE}
        css={swiperStyles}
        onTransitionStart={changeSlide}
        onSwiper={(s) => {
          setSwiper(s);
        }}
      >
        {groups.map(({ code: groupCode, title: groupTitle }) => (
          <SwiperSlide key={groupCode}>
            <MenuLink isCurrent={groupCode === code} onClick={() => handleClick(groupCode)}>
              {groupTitle}
            </MenuLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </MenuWrap>
  );
}
