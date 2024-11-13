import { useQuery } from '@tanstack/react-query';
import { isUndefined, get } from 'lodash';

import { fetchWritableReviewCount, FetchWritableReviewCountResponse } from '../../../shared/api/mypage/review';
import { useAppSelector } from '../../../shared/store';
import { QueryKeys, ReviewTypes } from '../queries';

const getWritableReviewCount = (data?: FetchWritableReviewCountResponse) => {
  if (isUndefined(data)) {
    return 0;
  }
  return get(data, 'count', 0);
};

export const useWritableReviewCount = () => {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const queryResult = useQuery(QueryKeys.count(ReviewTypes.WRITABLE_REVIEW), fetchWritableReviewCount, {
    refetchOnMount: true,
    enabled: hasSession,
  });
  const { data } = queryResult;
  const writableReviewCount = getWritableReviewCount(data);
  return {
    ...queryResult,
    writableReviewCount,
  };
};
