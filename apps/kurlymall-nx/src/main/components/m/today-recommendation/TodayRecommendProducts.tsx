import type { MainTodayRecommendationSection } from '../../../interfaces/MainSection.interface';
import MainProductList from '../shared/MainProductList';
import SectionTitle from '../shared/SectionTitle';
import SectionContents from '../shared/SectionContents';

import useSectionEvent from '../../../hooks/useSectionEvent';
import { createMainSkeleton } from '../shared/skeleton/CreateMainSkeleton';

interface Props {
  section: MainTodayRecommendationSection;
}

export default function TodayRecommendProducts({ section }: Props) {
  const { payload, type } = section;

  const { onSelectTitle, onSelectProduct, onSelectMore } = useSectionEvent(section);

  const loadingLayer = createMainSkeleton(type);

  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }

  const { products, title } = payload;

  return (
    <SectionContents section={section} loadingLayer={loadingLayer}>
      <SectionTitle title={title} selectTitle={onSelectTitle} />
      <MainProductList products={products} selectProduct={onSelectProduct} selectMore={onSelectMore} />
    </SectionContents>
  );
}
