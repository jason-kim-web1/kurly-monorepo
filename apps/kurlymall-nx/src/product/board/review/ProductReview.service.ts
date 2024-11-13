import { get, chain } from 'lodash';

import type { FetchReviewListResponseDataItem, ProductReviewNoticeData, ProductReviewSortType } from './types';

import {
  deleteProductReviewLike,
  fetchProductReviewCount,
  fetchProductReviewDetail,
  fetchProductReviewList,
  postProductReviewLike,
} from '../../../shared/api';
import { DEFAULT_PRODUCT_REVIEW_LIST_FETCH_SIZE, REVIEW_SORT_TYPE } from './constants';
import type { Awaited } from '../../../shared/types';
import { BadgeTypeValues } from './types';

export type ProductReview = ReturnType<typeof createProductReview>;

export interface ProductReviewData {
  id: number;
  type: BadgeTypeValues;
  contents: string;
  reviewer: string;
  reviewerGrade: string | null;
  profiles: ProductReviewProfiles;
  contentsProductNo: number;
  contentsProductName: string;
  dealProductNo: number;
  dealProductName: string;
  productImageUrl: string;
  likeCount: number;
  hasLiked: boolean;
  visibility: string;
  registrationDate: string;
  modificationDate?: string;
  images: ProductReviewImageItem[];
  comment: {
    no: number;
    commentator: string;
    contents: string;
    registrationDate: string;
  };
  isMembership: boolean;
}

export interface ProductReviewProfiles {
  beautyProfile: string;
  marketProfile: string;
}

export interface ProductReviewImageItem {
  id: number;
  url: string;
  reviewSquareSmallUrl: string;
}

export type ProductReviewList = ProductReviewData[];

export type ProductReviewListPagination = {
  previousPageParam: string | number | null;
  nextPageParam: string | number | null;
};

export interface ProductReviewListParseResult {
  reviews: ProductReviewList;
  pagination: ProductReviewListPagination;
}

export const createProductReview = (data: FetchReviewListResponseDataItem): ProductReviewData => {
  return {
    id: data.no,
    type: data.type,
    contents: data.contents,
    reviewer: data.ownerName,
    reviewerGrade: data.ownerGrade,
    profiles: data.ownerProfiles,
    contentsProductNo: data.contentsProductNo,
    contentsProductName: data.contentsProductName,
    dealProductNo: data.dealProductNo,
    dealProductName: data.dealProductName,
    productImageUrl: data.productImageUrl,
    likeCount: data.likeCount,
    hasLiked: data.isLike,
    visibility: data.visibility,
    registrationDate: data.registeredAt,
    modificationDate: data.modifiedAt,
    images: data.images.map(({ no, image, reviewSquareSmallUrl }) => ({ id: no, url: image, reviewSquareSmallUrl })),
    comment: chain(data)
      .get('comments')
      .map((comment) => ({
        no: comment.no,
        commentator: comment.ownerName,
        contents: comment.contents,
        registrationDate: comment.registeredAt,
      }))
      .head()
      .value(),
    isMembership: data.isMembership,
  };
};

const parseFetchProductReviewListResponse = (response: Awaited<ReturnType<typeof fetchProductReviewList>>) => ({
  reviews: chain(response).get('data').map(createProductReview).value(),
  pagination: {
    previousPageParam: get(response, 'meta.pagination.before'),
    nextPageParam: get(response, 'meta.pagination.after'),
  },
});

export function createProductReviewNotice(data: ProductReviewNoticeData) {
  return {
    reviewNotices: data.data.map((it) => ({
      id: it.no,
      registrationDate: it.registeredAt,
      title: it.subject,
      contents: it.contents,
    })),
    reviewBenefitsNotice: get(data.meta, 'reserveNotice') ? data?.meta?.reserveNotice : null,
  };
}

export async function getProductReviewData(contentsProductNo: number) {
  const reviewCountResult = await fetchProductReviewCount(contentsProductNo);
  return {
    count: reviewCountResult.count,
  };
}

interface GetProductReviewDetailParams {
  contentsProductNo: number;
  reviewId: number;
}

export const getProductReviewDetail = async ({ contentsProductNo, reviewId }: GetProductReviewDetailParams) => {
  const response = await fetchProductReviewDetail(contentsProductNo, reviewId);
  return createProductReview(response);
};

interface GetProductReviewListParams {
  contentsProductNo: number;
  sortType?: ProductReviewSortType;
  size?: number;
  after?: string | null;
  onlyImage?: boolean;
  filters?: string;
}

export const getProductReviewList = async ({
  contentsProductNo,
  sortType = REVIEW_SORT_TYPE.RECENTLY,
  size = DEFAULT_PRODUCT_REVIEW_LIST_FETCH_SIZE,
  after,
  onlyImage = false,
  filters,
}: GetProductReviewListParams) => {
  const response = await fetchProductReviewList({
    contentsProductNo,
    sortType,
    size,
    onlyImage,
    after,
    filters,
  });
  return parseFetchProductReviewListResponse(response);
};

export const toggleProductReviewLike = async (reviewId: number, isLiked: boolean) => {
  const targetFn = isLiked ? deleteProductReviewLike : postProductReviewLike;
  await targetFn(reviewId);
  return isLiked ? false : true;
};
