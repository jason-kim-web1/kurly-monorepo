import type { MainRandomCollectionSection } from '../../../interfaces/MainSection.interface';
import ProductListSection from '../shared/ProductListSection';
import SectionHeader from '../shared/SectionHeader';
import SectionContents from '../shared/SectionContents';
import useSectionEvent from '../../../hooks/useSectionEvent';
import { createMainSkeletonPC } from '../shared/skeleton/CreateMainSkeleton';

interface Props {
  section: MainRandomCollectionSection;
}

export default function RandomCollectionSection({ section }: Props) {
  const { payload, type } = section;

  const { onSelectTitle, onSelectProduct, onSelectMore } = useSectionEvent(section);

  const loadingLayer = createMainSkeletonPC(type);

  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }

  const { products, title, subtitle, hasMore, landingUrl } = payload;

  return (
    <SectionContents section={section} loadingLayer={loadingLayer}>
      <SectionHeader title={title} subtitle={subtitle} landingUrl={landingUrl} selectTitle={onSelectTitle} />
      <ProductListSection
        products={products}
        landingUrl={hasMore ? landingUrl : ''}
        selectProduct={onSelectProduct}
        selectMore={onSelectMore}
      />
    </SectionContents>
  );
}
