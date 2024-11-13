import type { AxiosError } from 'axios';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import httpClient from '../../../shared/configs/http-client';
import type { ReviewPassStatusType } from '../types';

type Variables = {
  contents: string;
  uploadImages: string[];
  passStatus: ReviewPassStatusType;
};

type Options = Omit<UseMutationOptions<void, AxiosError, Variables>, 'mutationFn'>;

export default function useCreateReview(orderNo: number, dealProductNo: number, options?: Options) {
  const mutationFn = async (variables: Variables) => {
    const url = `/product-review/v2/orders/${orderNo}/deal-products/${dealProductNo}`;
    await httpClient.post<void>(url, variables);
  };

  return useMutation(mutationFn, { ...options });
}
