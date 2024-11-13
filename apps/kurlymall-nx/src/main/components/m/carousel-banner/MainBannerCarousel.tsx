import type { MainSectionBannerCarousel } from '../../../interfaces/MainSection.interface';
import { useAppSelector } from '../../../../shared/store';
import useSectionEvent from '../../../hooks/useSectionEvent';
import SectionTitle from '../shared/SectionTitle';
import SectionContents from '../shared/SectionContents';
import MainBannerList from './MainBannerList';
import { createMainSkeleton } from '../shared/skeleton/CreateMainSkeleton';

interface Props {
  section: MainSectionBannerCarousel;
}

export default function MainBannerCarousel({ section }: Props) {
  const site = useAppSelector(({ main }) => main.site);
  const { payload, type } = section;
  const { onSelectProduct } = useSectionEvent(section);

  const loadingLayer = createMainSkeleton(type);

  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }

  const { banners, title, subtitle } = payload;

  return (
    <SectionContents section={section} loadingLayer={loadingLayer}>
      <SectionTitle className="tit_carousel" title={title} subtitle={subtitle} />
      <MainBannerList site={site} banners={banners} selectProduct={onSelectProduct} />
    </SectionContents>
  );
}
