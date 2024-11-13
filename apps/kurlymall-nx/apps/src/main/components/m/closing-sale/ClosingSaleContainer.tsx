import type { MainClosingSaleSection } from '../../../interfaces/MainSection.interface';
import SectionTitle from '../shared/SectionTitle';
import MainProductList from '../shared/MainProductList';
import SectionContents from '../shared/SectionContents';

import useSectionEvent from '../../../hooks/useSectionEvent';
import { createMainSkeleton } from '../shared/skeleton/CreateMainSkeleton';

interface Props {
  section: MainClosingSaleSection;
}

export default function ClosingSaleContainer({ section }: Props) {
  const { payload, type } = section;

  const { onSelectTitle, onSelectProduct, onSelectMore } = useSectionEvent(section);

  const loadingLayer = createMainSkeleton(type);

  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }

  const { products, title, subtitle, hasMore, landingUrl } = payload;

  return (
    <SectionContents section={section} loadingLayer={loadingLayer}>
      <SectionTitle title={title} subtitle={subtitle} landingUrl={landingUrl} selectTitle={onSelectTitle} />
      <MainProductList
        products={products}
        landingUrl={hasMore ? landingUrl : ''}
        selectProduct={onSelectProduct}
        selectMore={onSelectMore}
      />
    </SectionContents>
  );
}
