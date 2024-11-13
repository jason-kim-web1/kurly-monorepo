import { get, chain, size as listSize, isEqual, curry, head, map, keys, negate, isUndefined } from 'lodash';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { useMemo } from 'react';

import type { ProductReviewSortType } from '../types';

import { ReviewKeys } from '../queries';
import {
  getProductReviewList,
  ProductReviewList,
  ProductReviewData,
  ProductReviewListParseResult,
  ProductReviewImageItem,
} from '../ProductReview.service';
import { checkValidContentProductNo } from '../../../utils';
import { useAppSelector } from '../../../../shared/store';
import { everyTrue, isNotEmpty } from '../../../../shared/utils/lodash-extends';
import { getProductReviewFilterQueryString } from '../utils';
import { DEFAULT_PRODUCT_REVIEW_LIST_FETCH_SIZE } from '../constants';

const extractProductReviewList = (data?: InfiniteData<ProductReviewListParseResult>): ProductReviewList =>
  chain(data)
    .get('pages')
    .map((pageData) => get(pageData, 'reviews'))
    .flatten()
    .value();

const getNormalizedProductReviewList = (
  reviewList: ProductReviewList,
): Record<ProductReviewData['id'], ProductReviewData> =>
  chain(reviewList)
    .map((review) => {
      const reviewId = get(review, 'id');
      return [reviewId, review];
    })
    .fromPairs()
    .value();

const getPageProductReviewList = (data: InfiniteData<ProductReviewListParseResult> | undefined, page: number) => {
  const extractBaseFn = chain(data)
    .get('pages')
    .filter((_, index) => isEqual(page, index + 1));
  const pageProductReviewPagination = extractBaseFn
    .map((pageData) => get(pageData, 'pagination'))
    .head()
    .value();
  const pageProductReviewList = extractBaseFn
    .map((pageData) => get(pageData, 'reviews'))
    .flatten()
    .value();
  const pageProductReviewListSize = listSize(pageProductReviewList);
  const isPageProductReviewListEmpty = isEqual(pageProductReviewListSize, 0);
  return {
    pageProductReviewList,
    pageProductReviewListSize,
    pageProductReviewPagination,
    isPageProductReviewListEmpty,
  };
};

const getProductReviewGalleryImageList = (reviewList: ProductReviewList, amount: number) =>
  chain(reviewList)
    .filter((reviewData) => isNotEmpty(get(reviewData, 'images')))
    .map((reviewData) => {
      const firstImage = head(get(reviewData, 'images')) as NonNullable<ProductReviewImageItem>;
      return {
        reviewId: get(reviewData, 'id'),
        imageId: get(firstImage, 'id'),
        imageSrc: get(firstImage, 'url'),
        reviewSquareSmallUrl: get(firstImage, 'reviewSquareSmallUrl'),
      };
    })
    .filter((reviewImage) => everyTrue(map(keys(reviewImage), negate(isUndefined))))
    .take(amount)
    .value();

interface Props {
  contentsProductNo: number;
  sortType: ProductReviewSortType;
  onlyImage: boolean;
  dealProduct: string[];
  memberGroup: string[];
  size?: number;
}

export const useInfiniteProductReviewList = ({
  contentsProductNo,
  sortType,
  onlyImage,
  dealProduct,
  memberGroup,
  size,
}: Props) => {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const filters = getProductReviewFilterQueryString(dealProduct, memberGroup);
  const queryKey = ReviewKeys.infiniteList(
    contentsProductNo,
    size || DEFAULT_PRODUCT_REVIEW_LIST_FETCH_SIZE,
    sortType,
    onlyImage,
    filters,
  );
  const queryResult = useInfiniteQuery(
    queryKey,
    ({ pageParam }) =>
      getProductReviewList({
        contentsProductNo,
        after: pageParam,
        sortType,
        onlyImage,
        filters,
        size,
      }),
    {
      enabled: everyTrue([hasSession, checkValidContentProductNo(contentsProductNo)]),
      getPreviousPageParam: (firstPage) => get(firstPage, 'pagination.previousPageParam'),
      getNextPageParam: (lastPage) => get(lastPage, 'pagination.nextPageParam'),
      keepPreviousData: true,
      staleTime: 1000 * 60 * 3,
    },
  );
  const { data } = queryResult;
  const productReviewList = useMemo(() => extractProductReviewList(data), [data]);
  const productReviewListSize = listSize(productReviewList);
  const isProductReviewListEmpty = isEqual(productReviewListSize, 0);
  const normalizedProductReviewList = getNormalizedProductReviewList(productReviewList);
  const getProductReviewListByPage = curry(getPageProductReviewList, 2)(data);
  const getProductReviewGalleryImageListByAmount = curry(getProductReviewGalleryImageList, 2)(productReviewList);
  return {
    ...queryResult,
    productReviewList,
    productReviewListSize,
    isProductReviewListEmpty,
    normalizedProductReviewList,
    queryKey,
    getProductReviewListByPage,
    getProductReviewGalleryImageListByAmount,
  };
};
