import type { AxiosError } from 'axios';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { BaseResponse } from '../../../../shared/interfaces';
import httpClient from '../../../../shared/configs/http-client';

import type { ProductReview } from '../ProductReview.service';
import { createProductReview } from '../ProductReview.service';
import type { FetchReviewListResponseDataItem } from '../types';

type Option = Omit<UseQueryOptions<ProductReview, AxiosError>, 'initialData'>;

export default function useReview(contentsProductNo: number, reviewNo?: number, option?: Option) {
  const queryKey = ['product', contentsProductNo, 'review', reviewNo];
  const queryFn = async () => {
    // TODO: API 호출부 분리
    const url = `/product-review/v1/contents-products/${contentsProductNo}/reviews/${reviewNo}`;
    const { data } = await httpClient.get<BaseResponse<FetchReviewListResponseDataItem>>(url);
    return createProductReview(data.data);
  };

  return useQuery<ProductReview, AxiosError>(queryKey, queryFn, {
    ...option,
  });
}
