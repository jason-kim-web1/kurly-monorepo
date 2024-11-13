import styled from '@emotion/styled';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import { Swiper as SwiperClass } from 'swiper/types';

// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination';
import { useInView } from 'react-intersection-observer';

import { useEffect, useState } from 'react';

import COLOR from '../../../../../src/shared/constant/colorset';
import NextImage from '../../../../../src/shared/components/NextImage';
import { bgColor02, cardTextColor, KURLY_CARD_NAMES, plccImageUrl } from '../../shared/constant';

const Wrapper = styled.div`
  position: relative;
  background: ${bgColor02};
  padding-bottom: 12vw;
  .swiper {
    padding-bottom: 8.6vw;
  }
  .swiper-slide {
    width: 49vw;
    margin: 0 4.6vw;
    padding-top: 10px;
    text-align: center;
  }
  .swiper-slide span {
    opacity: 0.7;
    color: ${cardTextColor};
  }
  .swiper-slide.swiper-slide-active span {
    opacity: 1;
  }
  .swiper-horizontal > .swiper-pagination-bullets {
    bottom: 0;
  }
  .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
    width: 2vw;
    height: 2vw;
    margin: 0 1vw;
    background-color: #cbcbcb;
  }
  .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet-active {
    background-color: ${COLOR.kurlyPurple};
  }
`;

const CardImage = styled.div`
  position: relative;
  width: 100%;
  height: 77vw;
  margin-bottom: 5vw;
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
