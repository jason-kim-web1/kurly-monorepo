// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import COLOR from '../../../../../shared/constant/colorset';

import KurlypayCard from './KurlypayCard';
import useKurlypaySwiper from '../../../shared/hooks/useKurlypaySwiper';

const SwiperWrap = styled.div`
  position: relative;
  padding: 24px 0 26px;
  border: 1px solid ${COLOR.kurlyGray250};
  border-radius: 0 0 4px 4px;
  border-top: 0;
`;

const swiperSlideCSS = css`
  .swiper-slide {
    width: 57.2222vw;
  }
`;

export default function KurlypayCards() {
  const { kurlypayVendors, setSwiper, changeKurlypayCard, clickKurlypaySwiper } = useKurlypaySwiper();

  return (
    <SwiperWrap>
      <Swiper
        centeredSlides
        slideToClickedSlide
        spaceBetween={20}
        slidesPerView={'auto'}
        css={swiperSlideCSS}
        onSwiper={setSwiper}
        onClick={clickKurlypaySwiper}
        onSlideChange={changeKurlypayCard}
      >
        {kurlypayVendors.map((vendor) => (
          <SwiperSlide key={vendor.paymentMethodId}>
            {({ isActive }) => <KurlypayCard card={vendor} active={isActive} />}
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperWrap>
  );
}
