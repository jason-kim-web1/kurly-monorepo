import { ReactNode, useCallback, useEffect, useState } from 'react';
import { isNumber } from 'lodash';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import styled from '@emotion/styled';

import { Mousewheel } from 'swiper';

import NavigationButton from '../pc/list/NavigationButton';

const SwiperWrapper = styled(Swiper)`
  overflow: hidden;
  width: 1050px;
`;

const Container = styled.div`
  position: relative;
  width: 1050px;
  margin: 0 auto;

  &.circleType {
    padding: 15px 0 0 43px;

    ${SwiperWrapper} {
      width: 964px;
      margin-left: 0;
      padding: 0 5px;
    }
  }

  &.banner-carousel-horizontal {
    padding-bottom: 39px;
    .swiper-slide {
      width: calc(50% - 10px);

      &:last-of-type {
        width: 250px !important;
      }

      > div {
        height: 376px !important;
      }
    }
  }
`;

const NavButton = styled(NavigationButton)<{ top?: number; offset?: number }>`
  top: calc(50% - ${({ offset }) => offset || 0}px);
  ${({ top }) => (top ? `top: ${top}px` : undefined)}
`;

const NavButtonLeft = styled(NavButton)`
  left: 0;
  transform: translate(-50%, -50%);
`;

const NavButtonRight = styled(NavButton)`
  right: 0;
  transform: translate(50%, -50%) rotate(180deg);
`;

const SPACE_BETWEEN = 18;

interface Props {
  items: ReactNode[];
  slidesPerView: number | 'auto';
  slidesPerGroup?: number;
  top?: number;
  buttonOffset?: number;
  className?: string;
  spaceBetween?: number;
}

// nextButtonAtLastClassNameList 에 className을 넣으면, 전체보기 버튼은 무조건 노출됩니다.
const nextButtonAtLastClassNameList = ['banner-carousel-horizontal'];
const shouldDisplayNextButtonAtLast = (className?: string) => {
  return className ? nextButtonAtLastClassNameList.includes(className) : false;
};

export default function MainSwiper({
  items,
  slidesPerView,
  slidesPerGroup,
  top,
  buttonOffset,
  className,
  spaceBetween,
}: Props) {
  const isNext = isNumber(slidesPerView) ? items.length > slidesPerView : shouldDisplayNextButtonAtLast(className);

  const [swiper, setSwiper] = useState<SwiperClass>();
  const [allowPrev, setAllowSlidePrev] = useState(false);
  const [allowNext, setAllowSlideNext] = useState(isNext);
  const [perGroup, setPerGroup] = useState(1);
  const innerSize = spaceBetween ? spaceBetween : SPACE_BETWEEN;

  useEffect(() => {
    setAllowSlideNext(isNext);
  }, [isNext]);

  useEffect(() => {
    if (!swiper || swiper.destroyed) {
      return;
    }

    swiper.on('transitionStart', ({ isBeginning, isEnd }) => {
      setAllowSlidePrev(!isBeginning);
      setAllowSlideNext(!isEnd);
    });

    return () => swiper.destroy();
  }, [swiper]);

  useEffect(() => {
    if (slidesPerGroup) {
      setPerGroup(slidesPerGroup);
      return;
    }

    if (isNumber(slidesPerView)) {
      setPerGroup(slidesPerView);
      return;
    }
  }, [slidesPerGroup, slidesPerView]);

  const slideNext = useCallback(() => {
    if (!swiper) {
      return;
    }

    swiper.slideNext();
  }, [swiper]);

  const slidePrev = useCallback(() => {
    if (!swiper) {
      return;
    }

    swiper.slidePrev();
  }, [swiper]);

  return (
    <Container className={className}>
      <SwiperWrapper
        slidesPerView={slidesPerView}
        slidesPerGroup={perGroup}
        onSwiper={setSwiper}
        spaceBetween={innerSize}
        modules={[Mousewheel]}
        mousewheel={{
          forceToAxis: true,
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={`item-${index}`}>{item}</SwiperSlide>
        ))}
      </SwiperWrapper>
      {allowPrev && <NavButtonLeft top={top} offset={buttonOffset} onClick={() => slidePrev()} />}
      {allowNext && <NavButtonRight top={top} offset={buttonOffset} onClick={() => slideNext()} />}
    </Container>
  );
}
