import styled from '@emotion/styled';

import { MainRecipeData } from '../../../interfaces/MainSection.interface';
import MainRecipeItem from './MainRecipeItem';
import MainSwiper from '../../shared/MainSwiper';
import ShowMoreSlideItem from '../list/ShowMoreSlideItem';
import { ProductMainSelectData } from '../../../../shared/interfaces/Product';

const Swiper = styled(MainSwiper)`
  .swiper-slide {
    :not(:first-of-type) {
      margin-left: 9px;
    }
  }
`;

const ShowMoreItem = styled(ShowMoreSlideItem)`
  width: 338px;
  height: 225px;
`;

interface Props {
  recipes: MainRecipeData[];
  slidesPerView: number;
  landingUrl: string;
  selectProduct(selectProduct: ProductMainSelectData): void;
  selectMore(): void;
}

export default function RecipesSwiperContainer({
  recipes,
  slidesPerView,
  landingUrl,
  selectProduct,
  selectMore,
}: Props) {
  const swiperItems = recipes.map((recipe, index) => (
    <MainRecipeItem key={recipe.no} recipe={recipe} index={index} no={recipe.no} onSelectProduct={selectProduct} />
  ));

  swiperItems.push(<ShowMoreItem landingUrl={landingUrl} onSelectMore={selectMore} />);

  return <Swiper slidesPerView={slidesPerView} items={swiperItems} buttonOffset={25} />;
}
