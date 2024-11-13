export const REVIEW_STATUS = {
  WRITABLE: 'WRITABLE',
  WRITTEN: 'WRITTEN',
  HIDDEN: 'HIDDEN',
} as const;

export type ReviewStatus = keyof typeof REVIEW_STATUS;
