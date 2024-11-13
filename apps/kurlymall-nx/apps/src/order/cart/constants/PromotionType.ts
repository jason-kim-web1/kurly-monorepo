/**
 * 프로모션 타입
 *
 * 럭키박스, 백원딜
 */
export const PROMOTION_TYPE = {
  LUCKY_BOX: 'LUCKY_BOX',
  NEWBIE: 'NEWBIE',
} as const;

export type PromotionType = typeof PROMOTION_TYPE[keyof typeof PROMOTION_TYPE];
