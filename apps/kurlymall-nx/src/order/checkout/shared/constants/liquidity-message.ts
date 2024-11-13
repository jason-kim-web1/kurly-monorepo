const LIQUIDITY_MESSAGE = {
  kurlypayOnly: 'KURLY_PAY_ACCOUNT_ONLY',
  kurlypayAndSelectedCards: 'KURLY_PAY_ACCOUNT_AND_SELECTED_CARDS',
} as const;

type LiquidityMessageType = typeof LIQUIDITY_MESSAGE[keyof typeof LIQUIDITY_MESSAGE];

/**
 * 환금성 메세지 텍스트맵
 */
export const LiquidityMessageTextMap: Record<LiquidityMessageType, string> = {
  [LIQUIDITY_MESSAGE.kurlypayOnly]: '컬리페이 계좌결제전용',
  [LIQUIDITY_MESSAGE.kurlypayAndSelectedCards]: '컬리페이 계좌 · 일부카드 전용',
};
