import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { fetchPreviousReviewStatus } from '../../../../shared/api';
import type { DealPreviouslyReviewedStatusData } from '../types';

type Option = UseQueryOptions<DealPreviouslyReviewedStatusData, AxiosError>;

export default function useDealPreviouslyReviewed(dealProductNo: number, option?: Option) {
  const queryKey = ['deal', dealProductNo, 'reviewed'];

  const queryResult = useQuery<DealPreviouslyReviewedStatusData, AxiosError>(
    queryKey,
    () => fetchPreviousReviewStatus(dealProductNo),
    {
      ...option,
    },
  );

  const { data } = queryResult;

  return {
    ...queryResult,
    data: {
      status: data?.status || 'NOTHING',
      message: data?.message || '',
    },
  };
}
