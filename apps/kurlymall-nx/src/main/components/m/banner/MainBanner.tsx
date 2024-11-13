import { useState } from 'react';

import styled from '@emotion/styled';

import { Swiper } from 'swiper/types';

import { isEmpty } from 'lodash';

import type { MainSectionBanner } from '../../../interfaces/MainSection.interface';

import { amplitudeService } from '../../../../shared/amplitude';
import { SelectRecommendation } from '../../../../shared/amplitude/events';
import { useAppSelector } from '../../../../shared/store';

import MainBannerSwiper from './MainBannerSwiper';
import useMainBannerSwiper from '../../../hooks/useMainBannerSwiper';
import SwiperIndexIndicator from '../../shared/section/SwiperIndexIndicator';
import SectionContents from '../shared/SectionContents';

import { createMainSkeleton } from '../shared/skeleton/CreateMainSkeleton';

const Container = styled.div`
  position: relative;

  .swiper-slide {
    overflow: hidden;
  }
  .slide-inner > div {
    clip-path: inset(30px 0 30px 0);
  }
`;

const IndexIndicator = styled(SwiperIndexIndicator)`
  width: 48px;
  height: 20px;
  right: 16px;
  bottom: 16px;
  font-size: 12px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
`;

interface Props {
  section: MainSectionBanner;
}

export default function MainBanner({ section }: Props) {
  const sections = useAppSelector(({ main }) => main.sections);
  const site = useAppSelector(({ main }) => main.site);
  const { payload, type } = section;

  const [swiper, setSwiper] = useState<Swiper>();
  const { currentIndex } = useMainBannerSwiper(swiper);

  const loadingLayer = createMainSkeleton(type);

  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }

  const { banners } = payload;

  if (isEmpty(banners)) {
    return null;
  }

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
    <Container>
      <MainBannerSwiper
        banners={banners}
        site={site}
        onSwiper={setSwiper}
        amplitudeSelectBanner={amplitudeSelectBanner}
      />
      <IndexIndicator currentIndex={currentIndex} totalLength={banners.length} />
    </Container>
  );
}
