import { PAYMENT_GIFT_PATH, ORDER_PATH, GIFT_PATH, KURLYPAY_PATH } from '../constant';

/**
 * AppTemplate
 * app.tsx에서 사용 할 template 타입입니다.
 * @description app_props_component_only: AppProps Component만 렌더링됩니다.
 * @description use_page_only: usePage()를 호출 후 AppProps Component을 렌더링합니다.
 * @description all: 모든 공통 로직이 실행됩니다.
 */
type AppTemplate = 'app_props_component_only' | 'use_page_only' | 'all';

export const USE_APP_PROPS_COMPONENT_ONLY_URI = [ORDER_PATH.init.mobileUri, PAYMENT_GIFT_PATH.init.mobileUri];

export const USE_PAGE_ONLY_URI = [
  ORDER_PATH.processWebview.uri,
  PAYMENT_GIFT_PATH.processWebview.uri,
  GIFT_PATH.gift.mobileUri,
  ORDER_PATH.processBridge.uri,
  KURLYPAY_PATH.kurlypayAction.uri,
];

/**
 * selectAppTemplate
 * app.tsx에서 사용 할 template를 선택합니다.
 * @param { string } pathname next router pathname 값
 */
export function selectAppTemplate(pathname: string): AppTemplate {
  if (USE_APP_PROPS_COMPONENT_ONLY_URI.some((uri) => uri && pathname.includes(uri))) {
    return 'app_props_component_only';
  }

  if (USE_PAGE_ONLY_URI.some((uri) => uri && pathname.includes(uri))) {
    return 'use_page_only';
  }

  return 'all';
}
