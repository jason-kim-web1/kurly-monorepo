import type { WritableReviewsData, WrittenReviewsData } from '../../../mypage/review/types';
import httpClient from '../../configs/http-client';
import { UnknownError } from '../../errors';
import type { BaseResponse } from '../../interfaces';

interface Params {
  after?: number | null;
  size: 10;
  sortType: 'LIKE' | 'RECENTLY';
}

export interface FetchWritableReviewCountResponse {
  count: number;
}

export const fetchWritableReviewCount = async (): Promise<FetchWritableReviewCountResponse> => {
  const url = '/product-review/v1/writable-reviews/count';
  const { data } = await httpClient.get<BaseResponse<FetchWritableReviewCountResponse>>(url);
  return data.data;
};

interface FetchWritableReviewListParams {
  pageNo: number;
  size: number;
}

export interface FetchWritableReviewListResponse {
  data: WritableReviewListItemData[];
  meta: WritableReviewListMeta;
}

export interface WritableReviewListItemData {
  ea: number;
  writeExpirationDate: string;
  dealProductNo: number;
  dealProductName: string;
  contentsProductNo: number;
  contentsProductName: string;
  productThumbnailImageUrl: string;
  shippedDate: string;
  orderNo: number;
}

export interface WritableReviewListMeta {
  pagination: WritableReviewPagination;
  reserveNotice: WritableReviewReserveNotice;
}

export interface WritableReviewPagination {
  nextPage: number;
}

export interface WritableReviewReserveNotice {
  title: string;
  contents: string[];
}

export const fetchWritableReviewList = async (
  params: FetchWritableReviewListParams,
): Promise<FetchWritableReviewListResponse> => {
  const url = '/product-review/v1/writable-reviews';
  const { data } = await httpClient.get<FetchWritableReviewListResponse>(url, { params });
  return data;
};

export async function fetchWritableReviews(params: { pageNo: number } & Omit<Params, 'sortType'>) {
  try {
    const url = '/product-review/v1/writable-reviews';
    const response = await httpClient.get<WritableReviewsData>(url, { params });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new UnknownError(error as Error);
  }
}

export async function fetchWrittenReviewCount() {
  try {
    const url = '/product-review/v1/written-reviews/count';
    const response = await httpClient.get<BaseResponse<{ count: number }>>(url);
    return response.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new UnknownError(error as Error);
  }
}

export async function fetchWrittenReviews(params: Params) {
  try {
    const url = '/product-review/v1/written-reviews';
    const response = await httpClient.get<WrittenReviewsData>(url, { params });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new UnknownError(error as Error);
  }
}
