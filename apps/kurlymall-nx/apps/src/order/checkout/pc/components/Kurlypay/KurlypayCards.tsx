// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import COLOR from '../../../../../shared/constant/colorset';
import KurlypayCard from './KurlypayCard';
import KurlypayInstallmentSeletBox from './KurlypayInstallmentSelectBox';
import KurlypayNaviationArrow from './KurlypayNavigationArrow';
import KurlycardAccruedPointText from './KurlycardAccruedPointText';
import useKurlypaySwiper from '../../../shared/hooks/useKurlypaySwiper';
import HyundaiCardPoint from '../../../shared/components/HyundaiCardPoint';

const Wrapper = styled.div`
  border: 1px solid ${COLOR.kurlyGray250};
  border-radius: 0 0 4px 4px;
  border-top: 0;
`;

const SwiperWrap = styled.div<{ visibleSupportWrap: boolean }>`
  position: relative;
  padding: 24px 0;
  ${({ visibleSupportWrap }) => visibleSupportWrap && `padding-bottom: 16px`}
`;

const SupportWrap = styled.div<{ visibleHyundaiPoint: boolean }>`
  display: flex;
  flex-direction: column;
  padding-bottom: ${({ visibleHyundaiPoint }) => (visibleHyundaiPoint ? '20' : '26')}px;
`;

const swiperSlideCSS = css`
  .swiper-slide {
    width: 206px;
  }
`;

export default function KurlypayCards({ kurlycardAccruedPoint }: { kurlycardAccruedPoint: number }) {
  const {
    swiper,
    kurlypayVendors,
    visibleSelectBox,
    visibleKurlyCardAccruedPoint,
    visibleHyundaiPoint,
    installmentOptions,
    setSwiper,
    changeKurlypayCard,
  } = useKurlypaySwiper();

  const visibleSupportWrap = visibleSelectBox || visibleKurlyCardAccruedPoint || visibleHyundaiPoint;

  return (
    <Wrapper>
      <SwiperWrap visibleSupportWrap={visibleSupportWrap}>
        <Swiper
          spaceBetween={20}
          slidesPerView={'auto'}
          centeredSlides={true}
          css={swiperSlideCSS}
          onSwiper={setSwiper}
          onSlideChange={changeKurlypayCard}
        >
          {kurlypayVendors.map((vendor) => (
            <SwiperSlide key={vendor.paymentMethodId}>
              {({ isActive }) => <KurlypayCard card={vendor} active={isActive} />}
            </SwiperSlide>
          ))}
        </Swiper>
        <KurlypayNaviationArrow swiper={swiper} />
      </SwiperWrap>
      {visibleSupportWrap && (
        <SupportWrap visibleHyundaiPoint={visibleHyundaiPoint}>
          {visibleSelectBox && <KurlypayInstallmentSeletBox installments={installmentOptions} />}
          {visibleKurlyCardAccruedPoint && <KurlycardAccruedPointText accruedPoint={kurlycardAccruedPoint} />}
          {visibleHyundaiPoint && <HyundaiCardPoint />}
        </SupportWrap>
      )}
    </Wrapper>
  );
}
