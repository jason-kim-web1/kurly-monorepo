import styled from '@emotion/styled';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import { Swiper as SwiperClass } from 'swiper/types';

// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination';
import { useInView } from 'react-intersection-observer';

import { useEffect, useState } from 'react';

import COLOR from '../../../../shared/constant/colorset';
import NextImage from '../../../../shared/components/NextImage';
import { bgColor02, cardTextColor, KURLY_CARD_NAMES, plccImageUrl } from '../../shared/constant';

const cardOriginSize = {
  width: 226,
  height: 358,
};
const cardZoomSize = {
  width: 251,
  height: 398,
};

const Wrapper = styled.div`
  background: ${bgColor02};
  padding-bottom: 80px;
  .swiper {
    padding: 20px 0 55px;
  }
  .swiper-slide {
    width: ${cardOriginSize.width}px;
    margin: 0 30px;
    padding-top: 10px;
    text-align: center;
  }
  .swiper-slide.swiper-slide-active {
    width: ${cardZoomSize.width}px;
  }
  .swiper-slide.swiper-slide-active div {
    height: ${cardZoomSize.height}px;
    margin-top: -${(cardZoomSize.height - cardOriginSize.height) / 2}px;
    margin-bottom: 30px;
  }
  .swiper-slide span {
    opacity: 0.7;
    font-size: 20px;
    color: ${cardTextColor};
  }
  .swiper-slide.swiper-slide-active span {
    opacity: 1;
  }
  .swiper-horizontal > .swiper-pagination-bullets {
    bottom: 0;
  }
  .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    margin: 0 5px;
    background-color: #cbcbcb;
  }
  .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet-active {
    background-color: ${COLOR.kurlyPurple};
  }
`;

const CardImage = styled.div`
  position: relative;
  width: 100%;
  height: ${cardOriginSize.height}px;
  margin-bottom: 50px;
  transition-duration: 0.5s;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
`;

export default function CardSlide() {
  const { inView, ref } = useInView();
  const [swiper, setSwiper] = useState<SwiperClass>();

  useEffect(() => {
    if (inView) {
      swiper?.autoplay.start();
    } else {
      swiper?.autoplay.stop();
    }
  }, [inView, swiper?.autoplay]);

  return (
    <Wrapper ref={ref}>
      <Swiper
        onSwiper={(s) => setSwiper(s)}
        slidesPerView={'auto'}
        centeredSlides={true}
        pagination
        autoplay={{ delay: 1500 }}
        modules={[Pagination, Autoplay]}
      >
        {KURLY_CARD_NAMES.map((name, idx) => {
          const imageUrl = `${plccImageUrl}card/card-0${idx + 1}.png`;
          return (
            <SwiperSlide key={idx}>
              <CardImage>
                <NextImage src={imageUrl} alt={name} layout="fill" objectFit="contain" />
              </CardImage>
              <span>{name}</span>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Wrapper>
  );
}
