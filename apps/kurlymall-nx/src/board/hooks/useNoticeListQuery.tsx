import { useQuery } from '@tanstack/react-query';

import { useContext } from 'react';

import { getNoticeList } from '../board.service';
import { PAGE_SIZE_LIMIT, STALE_TIME } from '../constants';
import { PagingContext } from '../context/PagingContext';

export default function useNoticeListQuery() {
  const {
    currentPage,
    actions: { setLastPage, setCurrentPage },
  } = useContext(PagingContext);

  const queryKey = ['board-notice', currentPage];
  const queryResult = useQuery(queryKey, () => getNoticeList({ page: currentPage, size: PAGE_SIZE_LIMIT }), {
    refetchOnWindowFocus: true,
    keepPreviousData: true,
    staleTime: STALE_TIME,
    onSuccess: ({ isLastPage, prevPage }) => {
      if (isLastPage) {
        setLastPage(prevPage);
        setCurrentPage(prevPage);
      }
    },
  });

  return { ...queryResult, queryKey };
}
