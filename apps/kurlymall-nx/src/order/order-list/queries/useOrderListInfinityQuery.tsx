import { useInfiniteQuery } from '@tanstack/react-query';

import { useAppSelector } from '../../../shared/store';
import { fetchOrderList } from '../api/orderList';

export interface OrderListQueryParams {
  month: string;
  startDate: string;
  endDate: string;
  limit: number;
}

export const ORDER_LIST_QUERY_KEY = 'ORDER_LIST';

export default function useOrderListInfinityQuery({ month, startDate, endDate, limit }: OrderListQueryParams) {
  const { hasSession } = useAppSelector(({ auth }) => ({
    hasSession: auth.hasSession,
  }));

  return useInfiniteQuery(
    [ORDER_LIST_QUERY_KEY, month],
    ({ pageParam = 1 }) => fetchOrderList({ startDate, endDate, page: pageParam, limit }),
    {
      getNextPageParam: (lastPage) => {
        const { currentPage, totalPage } = lastPage.pagination;

        return currentPage + 1 <= totalPage ? currentPage + 1 : undefined;
      },
      enabled: hasSession,
      refetchOnMount: 'always',
    },
  );
}
