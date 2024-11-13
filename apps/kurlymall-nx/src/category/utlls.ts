import { PrimaryCategory } from '../shared/reducers/category';
import { RecommendCategoryDisplay } from './types';

export const checkIsRecommendCategory = (
  item: PrimaryCategory | RecommendCategoryDisplay,
): item is RecommendCategoryDisplay => {
  return Boolean((item as RecommendCategoryDisplay).isRecommend);
};
