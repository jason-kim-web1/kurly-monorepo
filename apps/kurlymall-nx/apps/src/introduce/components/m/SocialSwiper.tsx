// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
// eslint-disable-next-line import/no-unresolved
import { Autoplay } from 'swiper';

import styled from '@emotion/styled';

import { ImageContent } from '../../interfaces';

import NextImage from '../../../shared/components/NextImage';

const SwiperImage = styled.div`
  position: relative;
  height: 58vw;
`;

interface Props {
  thumbList: ImageContent[];
}

export default function SocialSwiper({ thumbList }: Props) {
  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={10}
      loop={true}
      centeredSlides={true}
      speed={400}
      autoplay={{ delay: 4000 }}
      modules={[Autoplay]}
    >
      {thumbList.map(({ id, imgUrl }) => (
        <SwiperSlide key={id}>
          {imgUrl && (
            <SwiperImage>
              <NextImage src={imgUrl} layout="fill" objectFit="cover" alt="" />
            </SwiperImage>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
