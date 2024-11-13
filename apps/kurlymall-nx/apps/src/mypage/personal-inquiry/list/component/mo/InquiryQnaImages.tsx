import styled from '@emotion/styled';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';

import { Lazy, Scrollbar } from 'swiper';

import { useState } from 'react';

import { UserInquiryContentImageData } from '../../types';

const Container = styled.div`
  position: absolute;
  height: 18.75rem;
  width: 100%;
  left: 0;
`;

const SlideImage = styled.img`
  height: 100%;
  max-height: 18.75rem;
  max-width: 80vw;
  object-fit: contain;
  aspect-ratio: 1/1;
  border-radius: 6px;
`;

interface Props {
  images: UserInquiryContentImageData[];
}

export default function InquiryQnaImages({ images }: Props) {
  const [slideNumber, setSlideNumber] = useState(0);

  const swiperStyles = {
    height: '20rem',
    padding: '0 60px 0 0',
    '.swiper-scrollbar': {
      height: 3,
      width: '18.75rem',
      bottom: 0,
      left: '3.375rem',
    },
    '.swiper-slide': {
      width: '80vw',
      left: '3.375rem',
    },
    '.swiper-scrollbar-drag': {
      width: `${18.75 / images.length}rem !important`,
      transform: `translate3d(${slideNumber * (18.75 / images.length)}rem, 0px, 0px) !important`,
      background: 'rgba(0,0,0,0.9)',
    },
  };

  const handleSlideChange = (event: { activeIndex: number }) => {
    setSlideNumber(event.activeIndex);
  };

  return (
    <Container>
      <Swiper
        modules={[Scrollbar, Lazy]}
        scrollbar={{ draggable: true }}
        spaceBetween={10}
        slidesPerView="auto"
        onSlideChange={handleSlideChange}
        css={swiperStyles}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <SlideImage src={image.imageUrl} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
