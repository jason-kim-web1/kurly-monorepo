// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
// eslint-disable-next-line import/no-unresolved
import { Autoplay } from 'swiper';

import { ImageContent } from '../../interfaces';

import NextImage from '../../../shared/components/NextImage';

interface Props {
  thumbList: ImageContent[];
}

export default function SocialSwiper({ thumbList }: Props) {
  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={3}
      loop={true}
      centeredSlides={true}
      speed={400}
      autoplay={{ delay: 4000 }}
      modules={[Autoplay]}
    >
      {thumbList.map(({ id, imgUrl }) => (
        <SwiperSlide key={id}>{imgUrl && <NextImage src={imgUrl} width={500} height={333} alt="" />}</SwiperSlide>
      ))}
    </Swiper>
  );
}
