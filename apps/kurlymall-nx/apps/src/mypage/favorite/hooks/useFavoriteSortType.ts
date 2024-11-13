import { useState } from 'react';

import { FavoriteFilterStatus, FavoriteFilterType } from '../shared/interfaces/interface';
import { logEventFavoriteSortType } from '../../../shared/amplitude/events/mypage/SelectFavoriteSortType';

export default function useFavoriteSortType() {
  const [sortType, setSortType] = useState<FavoriteFilterType>(FavoriteFilterStatus.FREQUENTLY);

  const changeSortType = (type: FavoriteFilterType) => {
    setSortType(type);
    logEventFavoriteSortType(type);
  };

  return {
    sortType,
    changeSortType,
  };
}
