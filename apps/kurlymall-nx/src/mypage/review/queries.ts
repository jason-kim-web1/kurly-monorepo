export const ReviewTypes = {
  WRITABLE_REVIEW: 'WRITABLE_REVIEW',
  WRITTEN_REVIEW: 'WRITTEN_REVIEW',
} as const;

type ReviewType = keyof typeof ReviewTypes;

export const QueryKeys = {
  base: () => ['mypage', 'review'],
  count: (type: ReviewType) => [...QueryKeys.base(), type.toLowerCase(), 'count'],
  infiniteList: (type: ReviewType) => [...QueryKeys.base(), type.toLowerCase(), 'list'],
};
