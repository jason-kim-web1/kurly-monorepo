import { useQuery } from '@tanstack/react-query';
import { get, isUndefined } from 'lodash';

import { fetchWrittenReviewCount } from '../../../shared/api/mypage/review';
import { useAppSelector } from '../../../shared/store';
import { QueryKeys, ReviewTypes } from '../queries';

const getWrittenReviewCount = (data?: { count: number }) => {
  if (isUndefined(data)) {
    return 0;
  }
  return get(data, 'count');
};

export default function useWrittenReviewCount() {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const queryResult = useQuery(QueryKeys.count(ReviewTypes.WRITTEN_REVIEW), fetchWrittenReviewCount, {
    refetchOnMount: true,
    enabled: hasSession,
  });
  const { data } = queryResult;
  const writtenReviewCount = getWrittenReviewCount(data);
  return {
    ...queryResult,
    writtenReviewCount,
  };
}
