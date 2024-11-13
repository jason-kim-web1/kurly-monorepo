import styled from '@emotion/styled';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperTypes } from 'swiper/types';
import React from 'react';

import { css } from '@emotion/react';

import KurlypayPaymentMethod from './KurlypayPaymentMethod';
import COLOR from '../../../shared/constant/colorset';
import AddKurlypayCard from './AddKurlypayCard';
import { isPC } from '../../../../util/window/getDevice';
import SlideNavigationButton from './SlideNavigationButton';
import { SlideNavigationButtonProps } from '../interfaces';
import useKurlypaySlide from '../hooks/useKurlypaySlide';

const Wrapper = styled.div<{ isSelectedKurlypay: boolean }>`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid ${COLOR.kurlyGray250};
  border-top: 0;

  ${({ isSelectedKurlypay }) =>
    isSelectedKurlypay &&
    css`
      border-color: ${COLOR.kurlyPurple};
      border-top-color: ${COLOR.purple100};
    `};
`;

const SlideWrapper = styled.div<{ isSelectedKurlypay: boolean }>`
  overflow: hidden;
  padding: 25px 0 30px;
  box-sizing: content-box;
  border-top: 1px solid ${({ isSelectedKurlypay }) => (isSelectedKurlypay ? COLOR.purple100 : COLOR.kurlyGray250)};

  > div {
    overflow: visible;
  }

  .swiper-slide {
    width: ${isPC ? '206px' : '57.2222vw'};
  }
`;

interface KurlypaySlideProps {
  setPaymentSlide: (swiper: SwiperTypes) => void;
  handleClickPaymentSlide: () => void;
  slideNavigationButton: SlideNavigationButtonProps;
}

export default function KurlypaySlide({
  setPaymentSlide,
  handleClickPaymentSlide,
  slideNavigationButton,
}: KurlypaySlideProps) {
  const { isSelectedKurlypay, kurlypayList } = useKurlypaySlide();

  return (
    <Wrapper isSelectedKurlypay={isSelectedKurlypay}>
      <SlideWrapper isSelectedKurlypay={isSelectedKurlypay}>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={20}
          centeredSlides
          slideToClickedSlide
          onSlideChange={handleClickPaymentSlide}
          onClick={handleClickPaymentSlide}
          onSwiper={setPaymentSlide}
        >
          {kurlypayList?.map((paymentMethod) => (
            <SwiperSlide key={paymentMethod.id}>
              <KurlypayPaymentMethod {...paymentMethod} />
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <AddKurlypayCard />
          </SwiperSlide>
        </Swiper>
      </SlideWrapper>
      {isPC && <SlideNavigationButton {...slideNavigationButton} />}
    </Wrapper>
  );
}
