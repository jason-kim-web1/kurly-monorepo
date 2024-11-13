import { useQuery } from '@tanstack/react-query';

import { fetchProductReviewNotice } from '../../../../shared/api';

import { ReviewKeys } from '../queries';
import { createProductReviewNotice } from '../ProductReview.service';
import { useAppSelector } from '../../../../shared/store';

export default function useReviewNotice() {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const queryResult = useQuery(ReviewKeys.notice(), fetchProductReviewNotice, {
    select: createProductReviewNotice,
    enabled: hasSession,
  });
  const { data } = queryResult;
  return {
    ...queryResult,
    reviewNotices: data?.reviewNotices || [],
    reviewBenefitsNotice: data?.reviewBenefitsNotice || null,
  };
}
