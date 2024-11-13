import { useQuery } from '@tanstack/react-query';

import { useContext, useState } from 'react';

import { PAGE_SIZE_LIMIT } from '../constants';
import { PagingContext } from '../context/PagingContext';
import { getFaqList } from '../board.service';

export default function useFaqListQuery() {
  const [type, setType] = useState('ALL');

  const {
    currentPage,
    actions: { setLastPage, setCurrentPage },
  } = useContext(PagingContext);

  const queryKey = ['faq-notice', currentPage, type];
  const queryResult = useQuery(queryKey, () => getFaqList({ page: currentPage, size: PAGE_SIZE_LIMIT, type }), {
    keepPreviousData: true,
    staleTime: 0, // 게시물의 완료지점을 알 수 없으므로 타입 변경이 대응되지 못하여 staleTime을 사용 할 수 없습니다.
    onSuccess: ({ isLastPage, prevPage }) => {
      if (isLastPage) {
        setLastPage(prevPage);
        setCurrentPage(prevPage);
      }
    },
  });

  return { ...queryResult, queryKey, setType, setCurrentPage, setLastPage };
}
