/**
 * Pixel event title
 *
 * @description - VIEW_CONTENT: 콘텐츠뷰
 * @description - COMPLETE_REGISTRATION: 회원가입
 * @description - SEARCH: 검색
 * @description - ADD_TO_CART: 장바구니
 * @description - INITIATE_CHECKOUT: 결제시작
 * @description - PURCHASE: 구매
 * @description - SUBMIT_APPLICATION: 멤버십결제시작
 * @description - SUBSCRIBE: 멤버십구독완료
 */
export const PIXEL_EVENT_TITLE = {
  VIEW_CONTENT: 'ViewContent',
  COMPLETE_REGISTRATION: 'CompleteRegistration',
  SEARCH: 'Search',
  ADD_TO_CART: 'AddToCart',
  INITIATE_CHECKOUT: 'InitiateCheckout',
  PURCHASE: 'Purchase',
  SUBMIT_APPLICATION: 'SubmitApplication',
  SUBSCRIBE: 'Subscribe',
} as const;

export type pixelEventTitleType = typeof PIXEL_EVENT_TITLE[keyof typeof PIXEL_EVENT_TITLE];
