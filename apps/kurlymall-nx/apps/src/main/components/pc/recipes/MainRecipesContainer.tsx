import type { MainRecipesSection } from '../../../interfaces/MainSection.interface';
import SectionHeader from '../shared/SectionHeader';
import SectionContents from '../shared/SectionContents';
import RecipesSwiperContainer from './RecipesSwiperContainer';
import useSectionEvent from '../../../hooks/useSectionEvent';
import { createMainSkeletonPC } from '../shared/skeleton/CreateMainSkeleton';

const RECIPES_SLIDE_PER_VIEW = 3;

interface Props {
  section: MainRecipesSection;
}

export default function MainRecipesContainer({ section }: Props) {
  const { payload, type } = section;

  const { onSelectTitle, onSelectProduct, onSelectMore } = useSectionEvent(section);

  const loadingLayer = createMainSkeletonPC(type);

  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }

  const { title, subtitle, recipes } = payload;
  const landingUrl = '/shop/board/list.php?&id=recipe';

  return (
    <SectionContents section={section} loadingLayer={loadingLayer}>
      <SectionHeader title={title} subtitle={subtitle} landingUrl={landingUrl} selectTitle={onSelectTitle} />
      <RecipesSwiperContainer
        recipes={recipes}
        slidesPerView={RECIPES_SLIDE_PER_VIEW}
        landingUrl={landingUrl}
        selectProduct={onSelectProduct}
        selectMore={onSelectMore}
      />
    </SectionContents>
  );
}
