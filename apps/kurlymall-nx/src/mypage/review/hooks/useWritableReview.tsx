import type { AxiosError } from 'axios';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { chain, get, isEmpty, isUndefined } from 'lodash';

import type { WritableReviews } from '../types';
import { getWritableReviews } from '../ProductReview.service';
import { useAppSelector } from '../../../shared/store';
import { QueryKeys, ReviewTypes } from '../queries';

type WritableReviewProduct = WritableReviews['orderedProducts'][0];
type WritableReviewProductList = WritableReviewProduct[];

const getWritableReviewList = (data?: InfiniteData<WritableReviews>): WritableReviewProductList => {
  if (isUndefined(data)) {
    return [];
  }
  const pages = get(data, 'pages', []);
  if (isEmpty(pages)) {
    return [];
  }
  return chain(pages)
    .map((page) => get(page, 'orderedProducts', []))
    .flatten()
    .value();
};

export default function useWritableReview() {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const queryResult = useInfiniteQuery<WritableReviews, AxiosError>(
    QueryKeys.infiniteList(ReviewTypes.WRITABLE_REVIEW),
    getWritableReviews,
    {
      refetchOnMount: true,
      getNextPageParam: (lastPage) => lastPage.pagination.nextPageParam,
      getPreviousPageParam: (firstPage) => firstPage.pagination.previousPageParam,
      enabled: hasSession,
    },
  );
  const { data } = queryResult;
  const writableReviewList = getWritableReviewList(data);
  const isWritableReviewListEmpty = isEmpty(writableReviewList);
  return {
    ...queryResult,
    writableReviewList,
    isWritableReviewListEmpty,
  };
}
