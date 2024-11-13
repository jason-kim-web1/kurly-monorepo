export const CONTENT_PRODUCT_MAX_QUANTITY = 9999;
export const DEAL_PRODUCT_MAX_QUANTITY = 9999;

// NOTE: 함께구매 팝업 관련 문구
export const APP_ONLY_TITLE = '앱 전용 상품입니다.';

export const JOIN_ORDER_DESCRIPTIONS = {
  DESKTOP: {
    APP_ONLY: '함께구매 상품은 앱에서만 구매할 수 있어요.\n앱에서 구매하고 혜택 받아가세요!',
    JOIN_LINK: '함께구매 상품은 앱에서만 구매할 수 있어요.\n앱 다운로드후 공유 받은 링크를 통해 함께구매해주세요!',
  },
  MOBILE: {
    APP_ONLY: '함께구매 상품은 앱에서만 구매할 수 있어요.',
    JOIN_LINK: '함께구매 상품은 앱에서만 구매할 수 있어요. 앱 다운로드후 공유 받은 링크를 통해 함께구매해주세요!',
  },
} as const;
