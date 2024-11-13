import axios from 'axios';
import { isEmpty, get, head } from 'lodash';

import httpClient from '../../configs/http-client';
import { BaseResponse } from '../../interfaces';
import { UnknownError } from '../../errors';
import type {
  ProductReviewNoticeData,
  DealPreviouslyReviewedStatusData,
  FetchReviewCountProps,
  FetchReviewCountResponse,
  FetchReviewFilterResponse,
  ProductReviewSortType,
  FetchReviewListResponse,
  FetchProductReviewDetailResponseData,
} from '../../../product/board/review/types';
import { FetchReviewFilterWithMembershipProps } from '../../../product/board/review/types';

interface FetchProductReviewListParams {
  contentsProductNo: number;
  sortType?: ProductReviewSortType;
  size?: number;
  before?: string | number | null;
  after?: string | number | null;
  onlyImage?: boolean;
  filters?: string;
}

export const fetchProductReviewList = async ({
  contentsProductNo,
  ...otherParams
}: FetchProductReviewListParams): Promise<FetchReviewListResponse> => {
  const url = `/product-review/v3/contents-products/${contentsProductNo}/reviews`;
  const response = await httpClient.get<FetchReviewListResponse>(url, {
    params: otherParams,
  });
  return get(response, 'data');
};

/** 상품 후기 상세 조회하기 */
export const fetchProductReviewDetail = async (
  contentsProductNo: number,
  reviewNo: number,
): Promise<FetchProductReviewDetailResponseData> => {
  const url = `/product-review/v2/contents-products/${contentsProductNo}/reviews/${reviewNo}`;
  const { data } = await httpClient.get<BaseResponse<FetchProductReviewDetailResponseData>>(url);
  return get(data, 'data');
};

/** 상품 후기 갯수 가져오기 */
export async function fetchProductReviewCount(contentsProductNo: number) {
  try {
    const url = `/product-review/v1/contents-products/${contentsProductNo}/count`;
    const result = await httpClient.get<BaseResponse<{ count: number }>>(url);
    return result.data.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new UnknownError(error as Error);
  }
}

/** 상품 후기 공지 목록 조회 */
export async function fetchProductReviewNotice() {
  try {
    const url = '/product-review/v1/review-notices';
    const { data } = await httpClient.get<ProductReviewNoticeData>(url);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new UnknownError(error as Error);
  }
}

/** 작성 가능한 후기 조회하기 */
export async function fetchEligibilityForReview(contentsProductNo: number) {
  try {
    const url = `/product-review/v1/contents-products/${contentsProductNo}/is-writable`;
    const { data } = await httpClient.get<BaseResponse<{ status: 'WRITABLE' | 'WRITTEN' | 'NOT_WRITABLE' }>>(url);
    return data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw error;
    }
    throw new UnknownError(error as Error);
  }
}

/* 한달 이내 작성 후기 조회 */
export async function fetchPreviousReviewStatus(dealProductNo: number) {
  try {
    const url = `/product-review/v1/deal-products/${dealProductNo}/previous-review-status`;
    const { data } = await httpClient.get<BaseResponse<DealPreviouslyReviewedStatusData>>(url);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error;
    }
    throw new UnknownError(error as Error);
  }
}

/** 이미지 업로드 */
type SuccessResult = {
  status: 'SUCCESS';
  remoteUrl?: string;
};

type ErrorResult = {
  status: 'ERROR';
  errorMessage: string;
};

type Result = SuccessResult | ErrorResult;

export async function postReviewImage(formData: FormData): Promise<Result> {
  const url = `/product-review/v2/reviews/images`;
  try {
    const { data } = await httpClient.post<BaseResponse<{ images: string[] }>>(url, formData);
    return {
      status: 'SUCCESS',
      remoteUrl: head(data.data.images),
    };
  } catch (error: unknown) {
    return {
      status: 'ERROR',
      errorMessage:
        axios.isAxiosError(error) && error.response?.data
          ? get(error.response.data, 'message')
          : '이미지를 업로드할 수 없습니다.',
    };
  }
}

/* 상품상세 후기 필터 옵션 조회 */
export const fetchReviewFilter = async ({ contentsProductNo, filterType }: FetchReviewFilterWithMembershipProps) => {
  const { data } = await httpClient.get<FetchReviewFilterResponse>(
    `/product-review/v1/contents-products/${contentsProductNo}/filters?filterType=${filterType}`,
  );
  return data;
};

/* 상품상세 후기 필터 개수 조회 */
export const fetchReviewCount = async ({ contentsProductNo, filters }: FetchReviewCountProps) => {
  const pathname = `/product-review/v1/contents-products/${contentsProductNo}/count`;
  const queryString = isEmpty(filters) ? '' : `?filters=${filters}`;
  const { data } = await httpClient.get<FetchReviewCountResponse>(`${pathname}${queryString}`);
  return data;
};

/* 상품상세 후기 좋아요 상태 변경 요청 - 좋아요 */
export const postProductReviewLike = async (reviewId: number) => {
  await httpClient.post(`/product-review/v1/reviews/${reviewId}/like`);
  return true;
};

/* 상품상세 후기 좋아요 상태 변경 요청 - 좋아요 해제 */
export const deleteProductReviewLike = async (reviewId: number) => {
  await httpClient.delete(`/product-review/v1/reviews/${reviewId}/like`);
  return true;
};
