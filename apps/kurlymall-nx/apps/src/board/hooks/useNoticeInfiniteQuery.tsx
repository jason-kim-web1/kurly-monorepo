import { useInfiniteQuery } from '@tanstack/react-query';

import { chain, isEmpty, size } from 'lodash';

import { BoardResponses, getNoticeList } from '../board.service';
import { PAGE_SIZE_LIMIT, STALE_TIME } from '../constants';
import { NoticeInterface } from '../../shared/api/board/notice';

const fetchNoticeList = ({ pageParam = 0 }) => getNoticeList({ page: pageParam, size: PAGE_SIZE_LIMIT });

const checkIsLastPage = (pages?: BoardResponses<NoticeInterface[]>[]): boolean => {
  if (!pages) {
    return false;
  }

  const lastPageArgs = chain(pages)
    .map(({ data }) => size(data))
    .filter((dataLength) => dataLength !== PAGE_SIZE_LIMIT)
    .size()
    .value();

  return lastPageArgs !== 0;
};

const getFlatPageList = (pages?: BoardResponses<NoticeInterface[]>[]): NoticeInterface[] => {
  if (!pages) {
    return [];
  }

  return chain(pages)
    .map(({ data }) => data)
    .flatten()
    .value();
};

export default function useNoticeInfiniteQuery() {
  const queryKey = ['board-notice', 'infinite'];
  const queryResult = useInfiniteQuery(queryKey, fetchNoticeList, {
    keepPreviousData: true,
    staleTime: STALE_TIME,
    getNextPageParam: ({ isLastPage, nextPage }) => {
      if (isLastPage) {
        return;
      }

      return nextPage;
    },
  });

  const { data } = queryResult;
  const isLastPage = checkIsLastPage(data?.pages);
  const flatList = getFlatPageList(data?.pages);
  const rowCount = size(flatList);
  const isListEmpty = isEmpty(flatList);

  return { ...queryResult, rowCount, queryKey, isLastPage, flatList, isListEmpty };
}
