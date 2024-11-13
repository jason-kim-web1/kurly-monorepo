import { useState } from 'react';

import styled from '@emotion/styled';

import { Swiper } from 'swiper/types';

import type { MainSectionBanner } from '../../../interfaces/MainSection.interface';

import { amplitudeService } from '../../../../shared/amplitude';
import { SelectRecommendation } from '../../../../shared/amplitude/events';
import { useAppSelector } from '../../../../shared/store';

import MainBannerSwiper from '../../shared/MainBannerSwiper';
import MainBannerSwiperButtons from './MainBannerSwiperButtons';
import useMainBannerSwiper from '../../../hooks/useMainBannerSwiper';
import SwiperIndexIndicator from '../../shared/section/SwiperIndexIndicator';
import { createMainSkeletonPC } from '../shared/skeleton/CreateMainSkeleton';

const Container = styled.div`
  position: relative;
  max-width: 1900px;
  height: 370px;
  margin: 0 auto 40px;
`;

const IndexIndicatorWrapper = styled.div`
  position: relative;
  width: 1050px;
  margin: 0 auto;
`;

const IndexIndicator = styled(SwiperIndexIndicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 23px;
  right: 109px;
  bottom: 20px;
  line-height: 23px;
  font-size: 14px;
  font-weight: 400;
  border-radius: 12px;
`;

interface Props {
  section: MainSectionBanner;
}

export default function MainBanner({ section }: Props) {
  const sections = useAppSelector(({ main }) => main.sections);
  const site = useAppSelector(({ main }) => main.site);
  const { isError, isLoading, payload, type } = section;

  const [swiper, setSwiper] = useState<Swiper>();
  const [isSwiperButtonsVisible, setIsSwiperButtonsVisible] = useState(false);
  const { goPrev, goNext, currentIndex } = useMainBannerSwiper(swiper);

  if (isError) {
    return null;
  }

  if (isLoading || !payload) {
    return createMainSkeletonPC(type);
  }

  const { banners } = payload;

  const amplitudeSelectBanner = (index: number, bannerId: number) => {
    amplitudeService.logEvent(
      new SelectRecommendation({
        eventName: section.type,
        sectionType: 'content',
        target: bannerId,
        position: index,
        sections,
        section,
      }),
    );
  };

  return (
    <Container
      onMouseOver={() => setIsSwiperButtonsVisible(true)}
      onMouseLeave={() => setIsSwiperButtonsVisible(false)}
    >
      <MainBannerSwiper
        banners={banners}
        onSwiper={setSwiper}
        site={site}
        amplitudeSelectBanner={amplitudeSelectBanner}
      />
      <MainBannerSwiperButtons onClickPrev={goPrev} onClickNext={goNext} isVisible={isSwiperButtonsVisible} />
      <IndexIndicatorWrapper>
        <IndexIndicator currentIndex={currentIndex} totalLength={banners.length} />
      </IndexIndicatorWrapper>
    </Container>
  );
}
