import { useQuery } from '@tanstack/react-query';

import { getProductReviewData } from '../ProductReview.service';

export default function useReviewInitData(contentsProductNo: number) {
  const queryKey = ['product', 'review', contentsProductNo];
  const queryResult = useQuery(queryKey, () => getProductReviewData(contentsProductNo), {
    staleTime: 1000 * 60 * 3,
  });
  const { data } = queryResult;
  return {
    ...queryResult,
    reviewCount: data?.count || 0,
  };
}
