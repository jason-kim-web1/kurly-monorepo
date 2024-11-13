import { isEmpty, size } from 'lodash';
import { useQuery } from '@tanstack/react-query';

import { fetchPickedProducts, PickProductExtend } from '../../../shared/api';
import { getSecond } from '../../../shared/utils/time';

const STALE_TIME = getSecond(60);

const getPickList = (data?: PickProductExtend[]): PickProductExtend[] => {
  if (!data) {
    return [];
  }
  return data;
};

export default function usePickListQuery() {
  const queryKey = ['mypage', 'pick-list'];
  const queryResult = useQuery(queryKey, () => fetchPickedProducts(), {
    keepPreviousData: true,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: true,
  });
  const { data } = queryResult;
  const pickList = getPickList(data);
  const pickListSize = size(data);
  const isPickListEmpty = isEmpty(data);

  return { ...queryResult, queryKey, pickList, pickListSize, isPickListEmpty };
}
