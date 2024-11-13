import styled from '@emotion/styled';

import { MainRecipeData } from '../../../interfaces/MainSection.interface';
import RecipeItem from './RecipeItem';
import LandingUrlItem from '../shared/LandingUrlItem';
import { ProductMainSelectData } from '../../../../shared/interfaces/Product';

const Container = styled.div`
  position: relative;
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ShowMoreItem = styled(LandingUrlItem)`
  height: 166px;
`;

interface Props {
  recipes: MainRecipeData[];
  landingUrl: string;
  selectProduct(selectProduct: ProductMainSelectData): void;
  selectMore(): void;
}

export default function RecipeList({ recipes, landingUrl, selectProduct, selectMore }: Props) {
  return (
    <Container>
      {recipes.map((recipe, index) => (
        <RecipeItem key={recipe.no} recipe={recipe} index={index} no={recipe.no} onSelectProduct={selectProduct} />
      ))}
      <ShowMoreItem landingUrl={landingUrl} handleSelectMore={selectMore} />
      <div></div>
    </Container>
  );
}
