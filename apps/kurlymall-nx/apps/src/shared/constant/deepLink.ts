import { GIFT_CATEGORY } from '../configs/config';

export const KURLY_APP_SCHEME = 'kurly://';

type Link =
  | 'MAINTAIN'
  | 'LOGIN'
  | 'PERSONAL_INQUIRY'
  | 'PRODUCT'
  | 'PRODUCT_DETAIL'
  | 'HOME'
  | 'REVIEW'
  | 'GIFT_CATEGORY'
  | 'GIFT_HISTORY'
  | 'CART'
  | 'GIFT_DETAIL'
  | 'GAME_MY_KURLY_FARM'
  | 'COUPON'
  | 'ORDER'
  | 'ORDER_DETAIL'
  | 'MYKURLY'
  | 'MARKET_MAIN_BEST_TAB';

// TODO: deprecated `$scheme://$path?$args` 형태로 조합할 수 있도록 상수를 더 세분화 해야함
const deepLinkUrl: Record<Link, string> = {
  MAINTAIN: 'kurly://',
  LOGIN: 'kurly://login',
  PERSONAL_INQUIRY: 'kurly://compose/inquiry',
  // TODO: deprecated PRODUCT_DETAIL 과 query params 만 제외하고 중복이므로 삭제 필요
  PRODUCT: 'kurly://product?no=',
  PRODUCT_DETAIL: 'kurly://product',
  GIFT_CATEGORY: `kurly://category_tab?categoryNo=${GIFT_CATEGORY}`,
  GIFT_HISTORY: `kurly://mykurly/gift_history`,
  GIFT_DETAIL: `kurly://gift/detail?order_no=`,
  HOME: 'kurly://home',
  REVIEW: 'kurly://compose/review',
  CART: 'kurly://cart',
  GAME_MY_KURLY_FARM: 'kurly://games/my-kurly-farm',
  COUPON: 'kurly://mykurly/coupon',
  ORDER: 'kurly://order',
  ORDER_DETAIL: 'kurly://order?no=',
  MYKURLY: 'kurly://mykurly',
  MARKET_MAIN_BEST_TAB: 'kurly://home?tab=popular_product',
} as const;

// NOTE: App OS 별 앱 스토어 주소
export const KURLY_APP_STORE_URL_DICTIONARY = {
  IOS: 'https://apps.apple.com/kr/app/id1080244833',
  ANDROID: 'https://play.google.com/store/apps/details?id=com.dbs.kurly.m2',
};

export default deepLinkUrl;
