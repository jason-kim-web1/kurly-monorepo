export const PRODUCT_SELECT_USER_ACTION_TYPE = {
  SET_QUANTITY: 'SET_QUANTITY',
  ADD_TO_CART: 'ADD_TO_CART',
  ONLY_MEMBERS_ERROR: 'ONLY_MEMBERS_ERROR',
} as const;

export const MEMBERSHIP_PURCHASE_ALERT_TYPE = {
  INFO: 'INFO',
  MEMBERS_JOIN: 'MEMBERS_JOIN',
} as const;

export const MEMBERSHIP_DIALOG_TITLE = {
  SET_QUANTITY: '컬리멤버스 전용상품',
  ADD_TO_CART: '컬리멤버스 전용상품 포함',
  ONLY_MEMBERS_ERROR: '컬리멤버스 전용상품 포함',
} as const;

export const MEMBERSHIP_DIALOG_GUIDE_TEXT = {
  SET_QUANTITY: '컬리멤버스 회원만을 위한 특별한 상품과 다양한 혜택을 놓치지마세요.',
  ADD_TO_CART: '컬리멤버스 회원만 구매 가능한 상품이 포함되어 있습니다. 지금 가입하고 함께 주문하시겠어요?',
  ONLY_MEMBERS_ERROR: '컬리멤버스 회원만 구매 가능한 상품이 포함되어 있습니다. 지금 가입하고 함께 주문하시겠어요?',
} as const;

export const MEMBERSHIP_DIALOG_REDIRECT_BUTTON_TEXT = '컬리멤버스 혜택받기';

export const LAST_VIEWING_CONTENT_NO = 'LAST_VIEWING_CONTENT_NO' as const;
