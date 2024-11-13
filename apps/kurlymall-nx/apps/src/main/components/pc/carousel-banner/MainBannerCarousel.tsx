import styled from '@emotion/styled';

import type { MainSectionBannerCarousel } from '../../../interfaces/MainSection.interface';
import { useAppSelector } from '../../../../shared/store';
import SectionHeader from '../shared/SectionHeader';
import SectionContents from '../shared/SectionContents';
import useSectionEvent from '../../../hooks/useSectionEvent';
import MainBannerList from './MainBannerList';
import { createMainSkeletonPC } from '../shared/skeleton/CreateMainSkeleton';

const MainBannerCarouselList = styled.div`
  padding: 7px 0 34px;
`;

interface Props {
  section: MainSectionBannerCarousel;
}

export default function MainBannerCarousel({ section }: Props) {
  const site = useAppSelector(({ main }) => main.site);
  const { payload, type } = section;

  const { onSelectProduct, onSelectMore } = useSectionEvent(section);

  const loadingLayer = createMainSkeletonPC(type);

  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }

  const { title, subtitle, banners } = payload;

  return (
    <SectionContents section={section} loadingLayer={loadingLayer}>
      <SectionHeader className="tit_carousel" title={title} subtitle={subtitle} />
      <MainBannerCarouselList>
        <MainBannerList site={site} banners={banners} selectProduct={onSelectProduct} selectMore={onSelectMore} />
      </MainBannerCarouselList>
    </SectionContents>
  );
}
