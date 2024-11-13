import type { MainRandomCollectionSection } from '../../../interfaces/MainSection.interface';
import MainProductList from '../shared/MainProductList';
import SectionTitle from '../shared/SectionTitle';
import SectionContents from '../shared/SectionContents';

import useSectionEvent from '../../../hooks/useSectionEvent';
import { createMainSkeleton } from '../shared/skeleton/CreateMainSkeleton';

interface Props {
  section: MainRandomCollectionSection;
}

export default function RandomCollectionSection({ section }: Props) {
  const { payload, type } = section;

  const { onSelectTitle, onSelectProduct, onSelectMore } = useSectionEvent(section);

  const loadingLayer = createMainSkeleton(type);

  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }

  const { products, title, subtitle, hasMore, landingUrl } = payload;

  return (
    <SectionContents section={section} loadingLayer={loadingLayer}>
      <SectionTitle title={title} landingUrl={landingUrl} subtitle={subtitle} selectTitle={onSelectTitle} />
      <MainProductList
        products={products}
        landingUrl={hasMore ? landingUrl : ''}
        selectProduct={onSelectProduct}
        selectMore={onSelectMore}
      />
    </SectionContents>
  );
}
