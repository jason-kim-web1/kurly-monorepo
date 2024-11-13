import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { isUndefined, get, isEmpty, chain, head } from 'lodash';

import { useAppSelector } from '../../../shared/store';
import { QueryKeys, ReviewTypes } from '../queries';
import { getWritableReviewList } from '../ProductReview.service';
import type { WritableReviewListItemData, WritableReviewReserveNotice } from '../../../shared/api/mypage/review';
import type { WritableReviewListData } from '../types';

const getFlattenWritableReviewList = (data?: InfiniteData<WritableReviewListData>): WritableReviewListItemData[] => {
  if (isUndefined(data)) {
    return [];
  }
  const pages = get(data, 'pages', []);
  if (isEmpty(pages)) {
    return [];
  }
  return chain(pages)
    .map((page) => get(page, 'products', []))
    .flatten()
    .value();
};

const getReserveNotice = (data?: InfiniteData<WritableReviewListData>): WritableReviewReserveNotice | null => {
  if (isUndefined(data)) {
    return null;
  }
  const pages = get(data, 'pages', []);
  if (isEmpty(pages)) {
    return null;
  }
  const firstPage = head(pages);
  if (isUndefined(firstPage)) {
    return null;
  }
  return get(firstPage, 'reserveNotice', null);
};

export const useWritableReviewList = () => {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const queryResult = useInfiniteQuery<WritableReviewListData>(
    QueryKeys.infiniteList(ReviewTypes.WRITABLE_REVIEW),
    getWritableReviewList,
    {
      refetchOnMount: true,
      getNextPageParam: (lastPage) => lastPage.pagination.nextPageParam,
      getPreviousPageParam: (firstPage) => firstPage.pagination.previousPageParam,
      enabled: hasSession,
    },
  );
  const { data } = queryResult;
  const writableReviewList = getFlattenWritableReviewList(data);
  const isWritableReviewListEmpty = isEmpty(writableReviewList);
  const reserveNotice = getReserveNotice(data);
  return {
    ...queryResult,
    writableReviewList,
    isWritableReviewListEmpty,
    reserveNotice,
  };
};
