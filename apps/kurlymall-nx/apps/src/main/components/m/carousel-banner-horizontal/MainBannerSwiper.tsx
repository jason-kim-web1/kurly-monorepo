import { ReactNode, useEffect, useState } from 'react';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper/types';

const swiperStyles = {
  '.swiper-slide': {
    width: 'auto',
  },

  '&.banner-carousel-horizontal': {
    display: 'grid',
    paddingLeft: '16px',
    '.swiper-slide': {
      width: '82%',
      '&.is-more:last-of-type': {
        width: '107px !important',
        height: '100%',
        marginRight: '16px',
      },
    },
  },
};

interface Props {
  items: ReactNode[];
  slidesPerView: number | 'auto';
  buttonOffset?: number;
  className?: string;
  spaceBetween?: number;
  selectNumber?: number;
  isMore?: boolean;
}

export default function MainBannerSwiper({
  items,
  slidesPerView,
  spaceBetween,
  className,
  selectNumber = 0,
  isMore,
}: Props) {
  const [swiper, setSwiper] = useState<SwiperClass>();
  const isSwiperOption = false;

  useEffect(() => {
    if (!swiper) {
      return;
    }

    swiper.slideTo(selectNumber);
  }, [selectNumber, swiper]);

  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      centeredSlides={isSwiperOption}
      centeredSlidesBounds={isSwiperOption}
      className={className}
      css={swiperStyles}
      onSwiper={(s) => {
        setSwiper(s);
      }}
    >
      {items.map((item, index) => (
        <SwiperSlide key={`item-${index}`} className={isMore ? 'is-more' : ''}>
          {item}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
