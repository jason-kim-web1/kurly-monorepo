import { FavoriteFilterName, FavoriteFilterType } from '../interfaces/interface';

export const getSortTypeName = (type: FavoriteFilterType): FavoriteFilterName => {
  return FavoriteFilterName[type];
};
