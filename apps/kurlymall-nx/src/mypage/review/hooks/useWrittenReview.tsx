import type { AxiosError } from 'axios';
import { chain, get, isEmpty, isUndefined } from 'lodash';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import type { WrittenReviews } from '../types';
import { getWrittenReviews } from '../ProductReview.service';
import { QueryKeys, ReviewTypes } from '../queries';

type WrittenReviewProduct = WrittenReviews['writtenReviews'][0];
type WrittenReviewProductList = WrittenReviewProduct[];

const getWrittenReviewProductList = (data?: InfiniteData<WrittenReviews>): WrittenReviewProductList => {
  if (isUndefined(data)) {
    return [];
  }
  const pages = get(data, 'pages', []);
  return chain(pages)
    .map((page) => get(page, 'writtenReviews', []))
    .flatten()
    .value();
};

export default function useWrittenReview() {
  const queryResult = useInfiniteQuery<WrittenReviews, AxiosError>(
    QueryKeys.infiniteList(ReviewTypes.WRITTEN_REVIEW),
    getWrittenReviews,
    {
      refetchOnMount: true,
      getNextPageParam: (lastPage) => lastPage.pagination.nextPageParam,
      getPreviousPageParam: (firstPage) => firstPage.pagination.beforePageParam,
    },
  );
  const { data } = queryResult;
  const writtenReviewProductList = getWrittenReviewProductList(data);
  const isWrittenReviewProductListEmpty = isEmpty(writtenReviewProductList);
  return {
    ...queryResult,
    writtenReviewProductList,
    isWrittenReviewProductListEmpty,
  };
}
