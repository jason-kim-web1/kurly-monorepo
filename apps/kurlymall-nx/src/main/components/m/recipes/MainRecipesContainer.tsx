import { MainRecipesSection } from '../../../interfaces/MainSection.interface';
import SectionTitle from '../shared/SectionTitle';
import SectionContents from '../shared/SectionContents';
import RecipeList from './RecipeList';

import useSectionEvent from '../../../hooks/useSectionEvent';
import { createMainSkeleton } from '../shared/skeleton/CreateMainSkeleton';

interface Props {
  section: MainRecipesSection;
}

export default function MainRecipesContainer({ section }: Props) {
  const { payload, type } = section;

  const { onSelectTitle, onSelectProduct, onSelectMore } = useSectionEvent(section);

  const loadingLayer = createMainSkeleton(type);

  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }

  const { recipes, subtitle, title } = payload;
  const landingUrl = '/m2/board/list.php?&id=recipe';

  return (
    <SectionContents section={section} loadingLayer={loadingLayer}>
      <SectionTitle title={title} subtitle={subtitle} landingUrl={landingUrl} selectTitle={onSelectTitle} />
      <RecipeList recipes={recipes} landingUrl={landingUrl} selectProduct={onSelectProduct} selectMore={onSelectMore} />
    </SectionContents>
  );
}
