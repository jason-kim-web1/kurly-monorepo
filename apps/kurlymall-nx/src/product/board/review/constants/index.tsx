import type { ProductReviewSortType, ReviewFilterType } from '../types';

export const REVIEW_FILTER_TYPE: Record<ReviewFilterType, ReviewFilterType> = {
  DEAL_PRODUCT: 'DEAL_PRODUCT',
  MEMBER_GROUP: 'MEMBER_GROUP',
} as const;

export const REVIEW_MEMBERSHIP_TYPE = 'MEMBER_GROUP_WITH_MEMBERSHIP';

export const REVIEW_SORT_TYPE: Record<ProductReviewSortType, ProductReviewSortType> = {
  RECOMMEND: 'RECOMMEND',
  RECENTLY: 'RECENTLY',
} as const;

export const REVIEW_FILTER_TYPE_OPTION_LIST = [
  {
    label: '상품 옵션',
    value: REVIEW_FILTER_TYPE.DEAL_PRODUCT,
  },
] as const;

export const REVIEW_FILTER_TYPE_LIST = [REVIEW_FILTER_TYPE.DEAL_PRODUCT];

export const REVIEW_SORT_TYPE_OPTION_LIST = [
  {
    label: '추천순',
    value: REVIEW_SORT_TYPE.RECOMMEND,
  },
  {
    label: '최근등록순',
    value: REVIEW_SORT_TYPE.RECENTLY,
  },
] as const;

export const DEFAULT_PRODUCT_REVIEW_LIST_FETCH_SIZE = 10;

export const PRODUCT_REVIEW_COMMON_TRANSITION = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
} as const;

export const BADGE_TYPE = {
  NORMAL: '일반',
  BEST: '베스트',
  EXPERIENCE_GROUP: '체험단',
  MEMBERS: '멤버스',
} as const;
