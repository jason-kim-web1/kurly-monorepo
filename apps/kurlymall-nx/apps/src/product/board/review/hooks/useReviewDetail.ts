import { useQuery } from '@tanstack/react-query';

import { ReviewKeys } from '../queries';
import { useAppSelector } from '../../../../shared/store';
import { everyTrue } from '../../../../shared/utils/lodash-extends';
import { checkValidContentProductNo } from '../../../utils';
import { getProductReviewDetail } from '../ProductReview.service';

export const useProductReviewDetail = (contentsProductNo: number, reviewId: number) => {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const queryKey = ReviewKeys.detail(contentsProductNo, reviewId);
  const queryResult = useQuery(queryKey, () => getProductReviewDetail({ contentsProductNo, reviewId }), {
    enabled: everyTrue([hasSession, checkValidContentProductNo(contentsProductNo)]),
    refetchOnMount: 'always',
  });
  return {
    ...queryResult,
    queryKey,
  };
};
