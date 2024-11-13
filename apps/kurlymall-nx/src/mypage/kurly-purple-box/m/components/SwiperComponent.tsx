import { ReactNode, useCallback, useEffect, useState } from 'react';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import styled from '@emotion/styled';

import { Autoplay } from 'swiper';

import { SWIPER_ARROW } from '../../shared/constants/imageUrl';
import SwiperIndicator from './SwiperIndicator';
import { SWIPER_AUTOPLAY } from '../../shared/utils/swiperSlide';

const Wrapper = styled.div`
  position: relative;
`;

const Button = styled.button`
  position: absolute;
  z-index: 100;
  background: none;
  border: 0;
  outline: 0;
  width: 60px;
  height: 60px;
`;

const NavigationButton = styled(Button)`
  top: 50%;
  transform: translateY(-50%);
  background: url(${SWIPER_ARROW}) no-repeat 50% 50%;
  transition: background 0.5s ease;
`;

const PreviousButton = styled(NavigationButton)`
  left: 0;
`;

const NextButton = styled(NavigationButton)`
  right: 0;
  transform: translateY(-50%) rotate(180deg);
`;

interface Props {
  items: ReactNode[];
  slidesPerView: number;
  isLoop?: boolean;
  isNavigation?: boolean;
  isIndicator?: boolean;
  className?: string;
  slidesPerGroup?: number;
  slidesOffsetAfter?: number;
  slidesOffsetBefore?: number;
  spaceBetween?: number;
  autoplay?: boolean;
}

export default function SwiperComponent({
  items,
  slidesPerView,
  isLoop = false,
  isNavigation = false,
  isIndicator = false,
  className,
  slidesPerGroup,
  slidesOffsetAfter = 0,
  slidesOffsetBefore = 0,
  spaceBetween = 0,
  autoplay = false,
}: Props) {
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!swiper) {
      return;
    }
    swiper.on('realIndexChange', ({ realIndex }) => {
      setCurrentIndex(realIndex);
    });
  }, [swiper]);

  const handleClickSlideNext = useCallback(() => {
    if (!swiper) {
      return;
    }
    swiper.slideNext();
  }, [swiper]);

  const handleClickSlidePrev = useCallback(() => {
    if (!swiper) {
      return;
    }
    swiper.slidePrev();
  }, [swiper]);

  return (
    <Wrapper className={className}>
      <Swiper
        onSwiper={setSwiper}
        loop={isLoop}
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerGroup ? slidesPerGroup : slidesPerView}
        slidesOffsetAfter={slidesOffsetAfter}
        slidesOffsetBefore={slidesOffsetBefore}
        spaceBetween={spaceBetween}
        autoplay={autoplay ? SWIPER_AUTOPLAY : autoplay}
        modules={[Autoplay]}
      >
        {items.map((item, index) => (
          <SwiperSlide key={`item-${index}`}>{item}</SwiperSlide>
        ))}
      </Swiper>
      {isNavigation && (
        <div className="navigation">
          <PreviousButton onClick={handleClickSlidePrev} className="previousButton" />
          <NextButton onClick={handleClickSlideNext} className="nextButton" />
        </div>
      )}
      {isIndicator && <SwiperIndicator currentIndex={currentIndex} totalLength={items.length} />}
    </Wrapper>
  );
}
