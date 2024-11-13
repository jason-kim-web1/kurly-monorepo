import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { flatten, map, last, size, fromPairs } from 'lodash';

import { getInquiryProducts, InquiryProductsResponseData, InquiryProductItem } from '../services';

import { INFINITE_QUERY_KEY, STALE_TIME } from '../constants';

const fetchInquiryProducts = ({ pageParam = 1 }) => getInquiryProducts(pageParam);

const flattenPages = (pages: InquiryProductsResponseData[] | undefined): InquiryProductItem[] => {
  if (!pages) {
    return [];
  }
  return flatten(
    map(pages, (page) => {
      const { data } = page;
      return data;
    }),
  );
};

const normalizeListToObject = (list: InquiryProductItem[]) => {
  return fromPairs(
    map(list, (data) => {
      const { id } = data;
      return [id, data];
    }),
  );
};

const useInquiryProductsInfiniteQuery = () => {
  const queryResult = useInfiniteQuery(INFINITE_QUERY_KEY, fetchInquiryProducts, {
    staleTime: STALE_TIME,
    refetchOnMount: true,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.meta.pagination;
      if (currentPage === totalPages) {
        return undefined;
      }
      return totalPages;
    },
  });
  const { data } = queryResult;
  const { currentPage, totalPages } = last(queryResult.data?.pages)?.meta.pagination || {
    currentPage: 1,
    totalPages: 1,
  };
  const isLastPage = currentPage === totalPages;
  const pages = queryResult.data?.pages || [];
  const flatPages = useMemo(() => flattenPages(data?.pages), [data]);
  const normalizedInquiryProductList = useMemo(() => normalizeListToObject(flatPages), [flatPages]);
  const listLength = size(flatPages);
  return {
    ...queryResult,
    pages: pages || [],
    size: isLastPage ? listLength : totalPages * 10,
    isInquiryProductsEmpty: listLength === 0,
    isAllLoaded: isLastPage,
    flatPages,
    normalizedInquiryProductList,
  };
};

export default useInquiryProductsInfiniteQuery;
