import type { ReferrerEventType } from '../types';
import { ProductCollectionDesignKind } from '../list/types';

const REFERRER_EVENT_TYPE: Record<ReferrerEventType, ReferrerEventType> = {
  DETAIL: 'DETAIL',
  REVIEW_DETAIL: 'REVIEW_DETAIL',
} as const;

const COLLECTION_DESIGN_KIND: Record<Uppercase<ProductCollectionDesignKind>, ProductCollectionDesignKind> = {
  DEFAULT: 'default',
  NUMBER: 'number',
};

export { REFERRER_EVENT_TYPE, COLLECTION_DESIGN_KIND };
