import { useQuery } from '@tanstack/react-query';

import { getEMoneyList } from '../../emoney.service';

import { usePaging } from '../../context/pc/PagingContext';

import { QUERY_KEY_PREFIX, STALE_TIME } from '../../constants';

export default function useEMoneyListQuery() {
  const { currentPage } = usePaging();
  const queryKey = [QUERY_KEY_PREFIX, currentPage];
  const useQueryResult = useQuery(queryKey, () => getEMoneyList(currentPage), {
    keepPreviousData: true,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: true,
  });
  return { ...useQueryResult, queryKey };
}
