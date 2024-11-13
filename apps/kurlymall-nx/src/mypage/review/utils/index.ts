import type { RefObject } from 'react';
import { eq, filter, isEmpty, isUndefined, lt, lte, size } from 'lodash';

import { MAX_SELECTABLE_IMAGE_COUNT, MIN_REVIEW_CONTENT_LENGTH, PREV_UPLOAD_IMAGE_STATUS } from '../constants';
import type { PrevUploadImage, ReviewImageData, MutableReviewFormData } from '../types';
import { IMAGE_FETCH_STATUS } from '../hooks/useCreateReviewImage';
import { ignoreError } from '../../../shared/utils/general';

/* TODO: 더 일반적인 함수로 개선
const filterBy = <T,>(collection: T[], keyName: string, value: string);
*/
export const filterByStatus = <T extends { status: string }>(collection: T[], targetStatus: string): T[] =>
  filter(collection, ({ status }) => eq(status, targetStatus));

export const checkCanSelectImage = (currentImageCount: number) => lt(currentImageCount, MAX_SELECTABLE_IMAGE_COUNT);

export const checkValidReviewContent = (contents: string) => lte(MIN_REVIEW_CONTENT_LENGTH, size(contents));

export const parsePrevUploadedImages = (images?: ReviewImageData[]): PrevUploadImage[] => {
  if (isUndefined(images) || isEmpty(images)) {
    return [];
  }
  return images.map((image) => {
    return {
      ...image,
      status: PREV_UPLOAD_IMAGE_STATUS.SUCCESS,
    };
  });
};

export const checkReviewFormChanged = (original: MutableReviewFormData, next: MutableReviewFormData) => {
  if (original.contents !== next.contents) {
    return true;
  }
  if (
    size(filterByStatus(original.prevImages, PREV_UPLOAD_IMAGE_STATUS.SUCCESS)) !==
    size(filterByStatus(next.prevImages, PREV_UPLOAD_IMAGE_STATUS.SUCCESS))
  ) {
    return true;
  }
  if (size(original.newImages) !== size(next.newImages)) {
    return true;
  }
  if (original.visibility !== next.visibility) {
    return true;
  }
  return false;
};

export const checkCanSubmitReviewForm = (
  options: MutableReviewFormData & { isSaving: boolean; isFormChanged: boolean },
) => {
  const { isSaving, isFormChanged, contents, newImages } = options;
  if (isSaving || !isFormChanged) {
    return false;
  }
  if (!checkValidReviewContent(contents)) {
    return false;
  }
  if (
    !isEmpty(filterByStatus(newImages, IMAGE_FETCH_STATUS.PENDING)) ||
    !isEmpty(filterByStatus(newImages, IMAGE_FETCH_STATUS.ERROR))
  ) {
    return false;
  }
  return true;
};

// TODO: 요소와 행위가 종속되지 않도록 더 일반적인 함수로 개선 f(ref: RefObject<T>, pred: fn)
export const triggerTextInputFocus = (ref: RefObject<HTMLTextAreaElement>) =>
  ignoreError(() => {
    if (!ref || !ref.current) {
      return;
    }
    ref.current.focus();
  });

export const assertIsTabActive = (index: number, targetIndex: number) => index === targetIndex;
