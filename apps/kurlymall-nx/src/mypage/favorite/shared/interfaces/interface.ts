export enum FavoriteFilterStatus {
  FREQUENTLY = 'FREQUENTLY',
  RECENTLY = 'RECENTLY',
}

export enum FavoriteFilterName {
  FREQUENTLY = '자주 구매순',
  RECENTLY = '최근 구매순',
}

export type FavoriteFilterType = keyof typeof FavoriteFilterStatus;

export interface FavoriteFilterProps {
  sortType: FavoriteFilterType;
  changeSortType: (type: FavoriteFilterType) => void;
}
