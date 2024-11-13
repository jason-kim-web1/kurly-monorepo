import { ReviewStatusType } from '../enums/ReviewStatus.enum';

enum ReviewButtonText {
  Writable = '후기작성',
  Written = '후기완료',
}

export const reviewStatusMapper: Omit<Record<ReviewStatusType, string>, 'HIDDEN'> = {
  WRITABLE: ReviewButtonText.Writable,
  WRITTEN: ReviewButtonText.Written,
};

export const REVIEW_LIMIT_COUNT = 9999;
