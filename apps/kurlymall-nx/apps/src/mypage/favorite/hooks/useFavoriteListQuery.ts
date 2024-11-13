import { useMemo } from 'react';

import { isEmpty, size } from 'lodash';

import { useQuery } from '@tanstack/react-query';

import { getSecond } from '../../../shared/utils/time';

import { FavoriteProductExtend } from '../../../shared/interfaces';
import { FavoriteFilterType } from '../shared/interfaces/interface';

import { fetchFavoriteProducts } from '../../../shared/api/favorite/favorite';

const STALE_TIME = getSecond(60);

const getFavoriteList = (data?: FavoriteProductExtend[]): FavoriteProductExtend[] => {
  if (!data) {
    return [];
  }
  return data;
};

export default function useFavoriteListQuery(sortType: FavoriteFilterType) {
  const queryKey = ['favorite-list', sortType];
  const queryResult = useQuery(
    queryKey,
    () =>
      fetchFavoriteProducts({
        sortType,
      }),
    {
      staleTime: STALE_TIME,
      enabled: !!sortType,
    },
  );

  const { data } = queryResult;

  const favoriteList = useMemo(() => {
    return getFavoriteList(data);
  }, [data]);
  const favoriteListSize = useMemo(() => {
    return size(data);
  }, [data]);
  const isDataEmpty = isEmpty(data);

  return {
    ...queryResult,
    favoriteList,
    favoriteListSize,
    isDataEmpty,
  };
}
