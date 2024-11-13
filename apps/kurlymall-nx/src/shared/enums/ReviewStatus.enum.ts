export const ReviewStatus = {
  WRITABLE: 'WRITABLE',
  WRITTEN: 'WRITTEN',
  HIDDEN: 'HIDDEN',
} as const;

export type ReviewStatusType = keyof typeof ReviewStatus;
