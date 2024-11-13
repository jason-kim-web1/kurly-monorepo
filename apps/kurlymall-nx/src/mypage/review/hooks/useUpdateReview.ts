import { useMutation } from '@tanstack/react-query';

import type { ReviewVisibilityType } from '../types';
import httpClient from '../../../shared/configs/http-client';
import { ReviewPassStatusType } from '../types';

interface Variables {
  reviewId: number;
  contents: string;
  visibility: ReviewVisibilityType;
  uploadImages: string[];
  deleteImages: number[];
  passStatus: ReviewPassStatusType;
}

export const useUpdateReview = () => {
  const mutationFn = async ({ reviewId, contents, visibility, uploadImages, deleteImages, passStatus }: Variables) => {
    const url = `/product-review/v2/reviews/${reviewId}`;
    await httpClient.put<void>(url, {
      contents,
      visibility,
      uploadImages,
      deleteImages,
      passStatus,
    });
  };

  return useMutation(mutationFn);
};
