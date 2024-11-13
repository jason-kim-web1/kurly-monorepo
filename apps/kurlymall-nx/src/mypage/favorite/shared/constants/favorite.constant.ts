import { FavoriteFilterName, FavoriteFilterStatus } from '../interfaces/interface';

export const filterType = [
  {
    type: FavoriteFilterStatus.FREQUENTLY,
    name: FavoriteFilterName.FREQUENTLY,
  },
  {
    type: FavoriteFilterStatus.RECENTLY,
    name: FavoriteFilterName.RECENTLY,
  },
];

export const USER_MENU_HEIGHT = 45;
