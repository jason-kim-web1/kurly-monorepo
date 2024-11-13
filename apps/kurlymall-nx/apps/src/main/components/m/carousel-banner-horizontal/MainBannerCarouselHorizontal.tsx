import type { MainSectionBannerCarouselHorizontal } from '../../../interfaces/MainSection.interface';
import { useAppSelector } from '../../../../shared/store';
import useSectionEvent from '../../../hooks/useSectionEvent';
import SectionTitle from '../shared/SectionTitle';
import SectionContents from '../shared/SectionContents';
import MainBannerList from './MainBannerList';
import { createMainSkeleton } from '../shared/skeleton/CreateMainSkeleton';
import { queryStringSiteConverter } from '../../../../shared/utils/queryStringSiteConverter';

interface Props {
  section: MainSectionBannerCarouselHorizontal;
}

export default function MainBannerCarouselHorizontal({ section }: Props) {
  const site = useAppSelector(({ main }) => main.site);
  const { payload, type, id } = section;
  const { onSelectTitle, onSelectProduct, onSelectMore } = useSectionEvent(section);

  const loadingLayer = createMainSkeleton(type);

  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }

  const { banners, title, subtitle } = payload;
  const bannersData = banners.map((banner) => {
    const { link } = banner;
    const parsedLink = queryStringSiteConverter({ link, site });
    return { ...banner, link: parsedLink };
  });

  const moreLink = queryStringSiteConverter({ link: `/main/sections/carousel-horizontal/${id}`, site });

  return (
    <SectionContents section={section} loadingLayer={loadingLayer}>
      <SectionTitle title={title} subtitle={subtitle} landingUrl={moreLink} selectTitle={onSelectTitle} />
      <MainBannerList
        banners={bannersData}
        onSelectProduct={onSelectProduct}
        onSelectMore={onSelectMore}
        landingUrl={moreLink}
      />
    </SectionContents>
  );
}
