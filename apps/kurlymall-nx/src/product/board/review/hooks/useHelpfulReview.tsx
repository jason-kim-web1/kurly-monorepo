import type { QueryKey, UseMutationOptions } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { get, isUndefined, chain } from 'lodash';

import { amplitudeService } from '../../../../shared/amplitude';
import { RemoveReviewIsHelpful, SelectReviewIsHelpful } from '../../../../shared/amplitude/events/review';
import Alert from '../../../../shared/components/Alert/Alert';
import { toggleProductReviewLike, ProductReviewData } from '../ProductReview.service';
import { useAppSelector } from '../../../../shared/store';

import { useInfiniteProductReviewList } from './useInfiniteProductReviewList';

type MutationData = boolean;

type MutationError = AxiosError;

interface MutationVariables {
  reviewId: number;
  isChecked: boolean;
}

type InfiniteProductReviewListData = ReturnType<typeof useInfiniteProductReviewList>['data'];
interface MutationContext {
  prevInfiniteProductListData: InfiniteProductReviewListData;
}

type MutationOption = UseMutationOptions<MutationData, MutationError, MutationVariables, MutationContext>;

const updateProductReviewLiked = (review: ProductReviewData, reviewId: number) => {
  const { id, hasLiked, likeCount } = review;
  if (id !== reviewId) {
    return review;
  }
  const nextLikeCount = hasLiked ? Math.max(0, likeCount - 1) : likeCount + 1;
  return {
    ...review,
    hasLiked: !hasLiked,
    likeCount: nextLikeCount,
  };
};

const getNextInfiniteProductListData = (
  prevData: InfiniteProductReviewListData,
  reviewId: number,
): InfiniteProductReviewListData => {
  if (isUndefined(prevData)) {
    return;
  }
  const nextPages = chain(prevData)
    .get('pages')
    .map((page) => {
      const reviews = get(page, 'reviews');
      const nextReviews = reviews.map((review) => updateProductReviewLiked(review, reviewId));
      return {
        ...page,
        reviews: nextReviews,
      };
    })
    .value();
  return { ...prevData, pages: nextPages };
};

export default function useHelpfulReview(queryKey: QueryKey, mutationOption?: MutationOption) {
  const router = useRouter();
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const isGuest = useAppSelector(({ auth }) => auth.isGuest);
  const queryClient = useQueryClient();
  const mutationFn = ({ reviewId, isChecked }: MutationVariables) => toggleProductReviewLike(reviewId, isChecked);
  return useMutation(mutationFn, {
    onMutate: async ({ reviewId }: MutationVariables) => {
      const prevInfiniteProductListData = queryClient.getQueryData<InfiniteProductReviewListData>(queryKey, {
        type: 'active',
        exact: true,
      });
      if (isGuest || isUndefined(prevInfiniteProductListData) || !hasSession) {
        return;
      }
      queryClient.setQueriesData({ queryKey, exact: true, type: 'active' }, () =>
        getNextInfiniteProductListData(prevInfiniteProductListData, reviewId),
      );
      return { prevInfiniteProductListData };
    },
    onSuccess: async (data, { isChecked }) => {
      const { productCode: contentsProductNo } = router.query;
      const AmplitudeEvent = isChecked ? RemoveReviewIsHelpful : SelectReviewIsHelpful;
      if (!contentsProductNo) {
        return;
      }
      amplitudeService.logEvent(new AmplitudeEvent({ contentsProductNo: Number(contentsProductNo) }));
    },
    onError: async (error, { reviewId }) => {
      const prevInfiniteProductListData = queryClient.getQueryData<InfiniteProductReviewListData>(queryKey, {
        type: 'active',
        exact: true,
      });
      queryClient.setQueriesData({ queryKey, exact: true, type: 'active' }, () =>
        getNextInfiniteProductListData(prevInfiniteProductListData, reviewId),
      );
      const message = get(error, 'response.data.message', '네트워크 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.');
      await Alert({ text: message });
    },
    ...mutationOption,
  });
}
