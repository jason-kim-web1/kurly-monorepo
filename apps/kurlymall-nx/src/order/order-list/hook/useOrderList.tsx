import { isEmpty } from 'lodash';

import { format, sub } from 'date-fns';

import { InfiniteData } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';

import { useMemo } from 'react';

import { OrderList } from '../interface/OrderList';
import { MYPAGE_ORDER_LIST_LIMIT } from '../constants/order-list';
import useOrderListInfinityQuery from '../queries/useOrderListInfinityQuery';

import { redirectTo } from '../../../shared/reducers/page';
import { PRODUCT_PATH } from '../../../shared/constant';
import { useWebview } from '../../../shared/hooks';
import deepLinkUrl from '../../../shared/constant/deepLink';

interface UseOrderListParams {
  month: string;
  currentPage?: number;
  limit?: number;
}

const START_DATE_FORMAT = "yyyy-MM-dd'T'00:00:00";
const END_DATE_FORMAT = "yyyy-MM-dd'T'23:59:59";

function parseInfiniteDate(data?: InfiniteData<OrderList>) {
  if (!data || isEmpty(data.pages)) {
    return { orderList: [], pagination: { currentPage: 0, totalPage: 0, hasNext: false } };
  }

  const orderList = data.pages.flatMap((page) => page.items);

  const { pagination } = data.pages[0];

  return { orderList, pagination };
}

export default function useOrderList({ month, limit = MYPAGE_ORDER_LIST_LIMIT }: UseOrderListParams) {
  const endDate = new Date();
  const startDate = sub(endDate, { months: Number(month) });
  const dispatch = useDispatch();
  const webview = useWebview();

  const { data, isLoading, isError, isFetchingNextPage, fetchNextPage, refetch } = useOrderListInfinityQuery({
    month,
    startDate: format(startDate, START_DATE_FORMAT),
    endDate: format(endDate, END_DATE_FORMAT),
    limit,
  });

  const {
    orderList,
    pagination: { currentPage, totalPage, hasNext },
  } = useMemo(() => parseInfiniteDate(data), [data]);

  const isLastPage = useMemo(() => currentPage >= totalPage || !hasNext, [currentPage, hasNext, totalPage]);

  const moveToBestProducts = () => {
    const url = webview ? deepLinkUrl.MARKET_MAIN_BEST_TAB : PRODUCT_PATH.marketBest.uri;

    dispatch(redirectTo({ url }));
  };

  return {
    orderList,
    isError,
    isLoading,
    isLastPage,
    isFetchingNextPage,
    isEmptyOrderList: isEmpty(orderList),
    fetchNextPage,
    refetch,
    moveToBestProducts,
  };
}
