import { useInfiniteQuery } from '@tanstack/react-query';

import { getEMoneyList } from '../../emoney.service';
import { usePaging } from '../../context/m/PagingContext';

import { QUERY_KEY_PREFIX, STALE_TIME } from '../../constants';

const fetchEMoneyList = ({ pageParam = 1 }) => getEMoneyList(pageParam);

const useEMoneyInfiniteQuery = () => {
  const { maxPage } = usePaging();
  const queryResult = useInfiniteQuery([QUERY_KEY_PREFIX, 'infinite'], fetchEMoneyList, {
    staleTime: STALE_TIME,
    refetchOnWindowFocus: true,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.paging.nextPageNo;
      if (nextPage > maxPage) {
        return;
      }
      return nextPage;
    },
  });
  return queryResult;
};

export default useEMoneyInfiniteQuery;
