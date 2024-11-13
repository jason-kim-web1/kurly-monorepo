import styled from '@emotion/styled';

import type { MainSectionBannerCarouselHorizontal } from '../../../interfaces/MainSection.interface';
import { useAppSelector } from '../../../../shared/store';
import SectionHeader from '../shared/SectionHeader';
import SectionContents from '../shared/SectionContents';
import useSectionEvent from '../../../hooks/useSectionEvent';
import MainBannerList from './MainBannerList';
import { createMainSkeletonPC } from '../shared/skeleton/CreateMainSkeleton';
import { queryStringSiteConverter } from '../../../../shared/utils/queryStringSiteConverter';

const SectionWrapper = styled.div`
  padding-top: 27px;
`;

interface Props {
  section: MainSectionBannerCarouselHorizontal;
}

export default function MainBannerCarouselHorizontal({ section }: Props) {
  const site = useAppSelector(({ main }) => main.site);
  const { payload, type, id } = section;

  const { onSelectTitle, onSelectProduct, onSelectMore } = useSectionEvent(section);

  const loadingLayer = createMainSkeletonPC(type);

  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }

  const { title, subtitle, banners } = payload;

  const bannersData = banners.map((banner) => {
    const { link } = banner;
    const parsedLink = queryStringSiteConverter({ link, site });
    return { ...banner, link: parsedLink };
  });

  const moreLink = queryStringSiteConverter({ link: `/main/sections/carousel-horizontal/${id}`, site });

  return (
    <SectionContents section={section} loadingLayer={loadingLayer}>
      <SectionWrapper>
        <SectionHeader
          className="tit_carousel"
          title={title}
          subtitle={subtitle}
          landingUrl={moreLink}
          selectTitle={onSelectTitle}
        />
        <MainBannerList
          banners={bannersData}
          onSelectProduct={onSelectProduct}
          onSelectMore={onSelectMore}
          landingUrl={moreLink}
        />
      </SectionWrapper>
    </SectionContents>
  );
}
