import type { QueryFunctionContext } from '@tanstack/query-core';
import { parseISO } from 'date-fns';
import { get, map, some } from 'lodash';

import type { WritableReviewsData, WrittenReviewsData } from './types';
import {
  fetchWritableReviewList,
  FetchWritableReviewListResponse,
  fetchWritableReviews,
  fetchWrittenReviews,
} from '../../shared/api/mypage/review';
import { amplitudeService, ScreenName } from '../../shared/amplitude';
import { SubmitReview } from '../../shared/amplitude/events/review';
import Alert from '../../shared/components/Alert/Alert';
import { branchService } from '../../shared/branch';
import { AddReviewSuccess } from '../../shared/branch/events/AddReviewSuccess';
import { WritableReviewListData } from './types';
import { ignoreError } from '../../shared/utils/general';
import { ImpressionSubmitReviewNotification } from '../../shared/amplitude/events/review/ImpressionSubmitReviewNotification';
import { SelectSubmitReviewNotification } from '../../shared/amplitude/events/review/SelectSubmitReviewNotification';
import { SubmitReviewSuccess } from '../../shared/amplitude/events/review/SubmitReviewSuccess';
import { isPC } from '../../../util/window/getDevice';

const REVIEW_LIST_BULK_SIZE = 10;

export const parseWritableReviewListData = (
  fetchWritableReviewListResponse: FetchWritableReviewListResponse,
): WritableReviewListData => {
  const { data, meta } = fetchWritableReviewListResponse;
  const reserveNotice = get(meta, 'reserveNotice');
  const shouldPassReserveNotice = some(map(['title', 'contents'], (key) => get(reserveNotice, key)));
  return {
    products: data,
    pagination: {
      previousPageParam: get(meta, 'pagination.previousPage'),
      nextPageParam: get(meta, 'pagination.nextPage'),
    },
    reserveNotice: shouldPassReserveNotice ? reserveNotice : null,
  };
};

export const createWritableReviews = (writableReviewsData: WritableReviewsData) => {
  const { data, meta } = writableReviewsData;
  const reserveNotice = get(meta, 'reserveNotice');
  return {
    orderedProducts: data.map((it) => ({
      orderNo: it.orderNo,
      orderType: it.orderType,
      quantity: it.ea,
      contentsProductNo: it.contentsProductNo,
      contentsProductName: it.contentsProductName,
      dealProductNo: it.dealProductNo,
      dealProductName: it.dealProductName,
      thumbnailImage: it.productThumbnailImageUrl,
      productVerticalSmallUrl: it.productVerticalSmallUrl,
      shippedDate: parseISO(it.shippedDate),
      expirationDate: parseISO(it.writeExpirationDate),
    })),
    pagination: {
      previousPageParam: meta.pagination?.previousPage,
      ...(meta.pagination.nextPage && { nextPageParam: meta.pagination.nextPage }),
    },
    reserveNotice: some(map(['title', 'contents'], (key) => get(reserveNotice, key))) ? reserveNotice : null,
  };
};

export const createWrittenReviews = (writtenReviewsData: WrittenReviewsData) => {
  const { data, meta } = writtenReviewsData;

  return {
    writtenReviews: data.map((it) => ({
      reviewId: it.no,
      type: it.type,
      reviewer: it.ownerName,
      reviewerGrade: it.ownerGrade,
      profiles: it.ownerProfiles,
      content: it.contents,
      contentsProductNo: it.contentsProductNo,
      contentsProductName: it.contentsProductName,
      dealProductNo: it.dealProductNo,
      dealProductName: it.dealProductName,
      images: it.images.map(({ no, image, reviewSquareSmallUrl }) => ({
        imageId: no,
        url: image,
        reviewSquareSmallUrl,
      })),
      likeCount: it.likeCount,
      registrationDate: it.registeredAt ? parseISO(it.registeredAt) : null,
      modificationDate: it.modifiedAt && it.registeredAt !== it.modifiedAt ? parseISO(it.modifiedAt) : null,
      visibility: it.visibility,
      comments: it.comments,
      orderType: it.orderType,
    })),
    pagination: {
      nextPageParam: meta.pagination.after,
      beforePageParam: meta.pagination.before,
    },
  };
};

export const getWritableReviewList = async (context: QueryFunctionContext) => {
  const data = await fetchWritableReviewList({
    pageNo: context?.pageParam,
    size: REVIEW_LIST_BULK_SIZE,
  });
  return parseWritableReviewListData(data);
};

export const getWritableReviews = async (context: QueryFunctionContext) => {
  const data = await fetchWritableReviews({
    pageNo: context?.pageParam,
    size: REVIEW_LIST_BULK_SIZE,
  });
  return createWritableReviews(data);
};

export const getWrittenReviews = async (context: QueryFunctionContext) => {
  const data = await fetchWrittenReviews({
    after: context?.pageParam,
    size: REVIEW_LIST_BULK_SIZE,
    sortType: 'RECENTLY',
  });
  return createWrittenReviews(data);
};

// TODO: Deprecate
const amplitudeSubmitReviewWriting = () =>
  ignoreError(() => {
    amplitudeService.setScreenName(ScreenName.PRODUCT_REVIEW_WRITING);
    amplitudeService.logEvent(new SubmitReview({ isFirst: false }));
  });

// TODO: Deprecate
export const onSuccessUpdateReview = async () => {
  branchService.logEvent(new AddReviewSuccess());
  amplitudeSubmitReviewWriting();
  await Alert({ text: '도움이 되는 후기를 작성해주셔서 감사합니다.', allowOutsideClick: false });
};

export const logOnlyDesktopPlatform = (f: () => void) => {
  if (!isPC) {
    return;
  }
  ignoreError(() => f());
};

export const logReviewRegister = (isFirstTry: boolean) => {
  ignoreError(async () => {
    await branchService.logEvent(new AddReviewSuccess());
  });
  logOnlyDesktopPlatform(() => {
    amplitudeService.setScreenName(ScreenName.PRODUCT_REVIEW_WRITING);
    amplitudeService.logEvent(new SubmitReview({ isFirst: isFirstTry }));
  });
};

export const logReviewRegisterNotification = (notificationType: string) => {
  logOnlyDesktopPlatform(() => {
    amplitudeService.setScreenName(ScreenName.PRODUCT_REVIEW_WRITING);
    amplitudeService.logEvent(new ImpressionSubmitReviewNotification({ notificationType }));
  });
};

export const logReviewRegisterNotificationSelect = (notificationType: string, selectionType: string) => {
  logOnlyDesktopPlatform(() => {
    amplitudeService.setScreenName(ScreenName.PRODUCT_REVIEW_WRITING);
    amplitudeService.logEvent(new SelectSubmitReviewNotification({ notificationType, selectionType }));
  });
};

export const logReviewRegisterSuccess = () => {
  logOnlyDesktopPlatform(() => {
    amplitudeService.setScreenName(ScreenName.PRODUCT_REVIEW_WRITING);
    amplitudeService.logEvent(new SubmitReviewSuccess());
  });
};
