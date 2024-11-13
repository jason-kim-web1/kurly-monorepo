import type { MainTodayRecommendationSection } from '../../../interfaces/MainSection.interface';

import ProductListSection from '../shared/ProductListSection';
import SectionHeader from '../shared/SectionHeader';
import SectionContents from '../shared/SectionContents';
import useSectionEvent from '../../../hooks/useSectionEvent';
import { createMainSkeletonPC } from '../shared/skeleton/CreateMainSkeleton';

interface Props {
  section: MainTodayRecommendationSection;
}

export default function TodayRecommendProducts({ section }: Props) {
  const { payload, type } = section;

  const { onSelectTitle, onSelectProduct, onSelectMore } = useSectionEvent(section);

  const loadingLayer = createMainSkeletonPC(type);

  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }

  const { title, products } = payload;

  return (
    <SectionContents section={section} loadingLayer={loadingLayer}>
      <SectionHeader title={title} selectTitle={onSelectTitle} />
      <ProductListSection products={products} selectProduct={onSelectProduct} selectMore={onSelectMore} />
    </SectionContents>
  );
}
