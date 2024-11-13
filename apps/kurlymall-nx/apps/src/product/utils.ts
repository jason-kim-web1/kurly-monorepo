import { eq, isEmpty, isUndefined } from 'lodash';
import router from 'next/router';

import type { ShortCutType } from '../shared/types';
import { isNotEqual } from '../shared/utils/lodash-extends';

const goodsDetailPageReferrerEvent = (tabName?: string) => {
  if (!tabName || !eq(tabName, 'review')) {
    return 'select_product';
  }
  return 'select_product_detail_review_subtab';
};

export const getReferrerEvent = (isReferrerReviewDetail?: boolean) => {
  if (isUndefined(isReferrerReviewDetail)) {
    return null;
  }

  const { query } = router;
  if (!isEmpty(query.productCode)) {
    return goodsDetailPageReferrerEvent(query.tab as string);
  }

  if (eq(isReferrerReviewDetail, false)) {
    return 'select_product_detail_review_subtab';
  }

  return 'view_review_detail';
};

export const createReferrerEvent = (
  referrerEventName?: string | null,
  selectionType?: ShortCutType,
  isReferrerReviewDetail?: boolean,
) => {
  if (referrerEventName?.startsWith('ad_product') || referrerEventName?.startsWith('clicked_together')) {
    return referrerEventName;
  }

  // 컬리 추천 탭에서 발생한 이벤트일 경우 referrer_event를 갱신하지 않고 그대로 가져감
  if (referrerEventName && referrerEventName.startsWith('select_recommendation_')) {
    return referrerEventName;
  }

  // 상품상세 추천/광고 섹션 > 추천된 항목 클릭하여 이동한 경우
  if (eq(referrerEventName, 'select_section_item')) {
    return referrerEventName;
  }

  // 상품상세 추천/광고 섹션 숏컷 클릭 이벤트인 경우
  if (referrerEventName?.startsWith('select_section_item_shortcut.selection_type.')) {
    return referrerEventName;
  }

  // 컬리 추천 탭 이외에서 장바구니 담기/바로구매 숏컷 버튼을 클릭 했을 때 referrer_event 갱신
  if (selectionType) {
    return `select_product_shortcut.selection_type.${selectionType}`;
  }

  return getReferrerEvent(isReferrerReviewDetail);
};

export const checkValidContentProductNo = (no: number) => isNotEqual(no, 0);
