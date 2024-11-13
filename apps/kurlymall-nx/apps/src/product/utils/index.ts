import { isUndefined, eq } from 'lodash';
export const getReferrerEvent = (isReferrerReviewDetail?: boolean) => {
  if (isUndefined(isReferrerReviewDetail)) {
    return null;
  }
  if (eq(isReferrerReviewDetail, false)) {
    return 'select_product_detail_review_subtab';
  }
  return 'view_review_detail';
};
