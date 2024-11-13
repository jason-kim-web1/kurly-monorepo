import { COMMON_PATH, CART_PATH, MYPAGE_PATH, ORDER_PATH, USER_MENU_PATH, MAIN_MENU_EVENT_PATH } from '../constant';

const INCLUDE_PATH = [
  `/m${USER_MENU_PATH.category.uri}`,
  '/member/lounges/[vipLevel]',
  '/m/member/lounges/[vipLevel]',
  `/m${COMMON_PATH.signupSuccess.uri}`,
  CART_PATH.cart.uri,
  CART_PATH.cart.mobileUri,
  CART_PATH.counter.uri,
  CART_PATH.counter.mobileUri,
  ORDER_PATH.order.uri,
  ORDER_PATH.order.mobileUri,
  ORDER_PATH.success.uri,
  ORDER_PATH.success.mobileUri,
  ORDER_PATH.join.uri,
  ORDER_PATH.join.mobileUri,
  ORDER_PATH.joinSuccess.uri,
  ORDER_PATH.joinSuccess.uri,
  MYPAGE_PATH.orderList.uri,
  MYPAGE_PATH.orderList.mobileUri,
  MYPAGE_PATH.orderDetail.uri,
  MYPAGE_PATH.orderDetail.mobileUri,
  `/m${MAIN_MENU_EVENT_PATH.beautyEvent.uri}`,
  MYPAGE_PATH.coupon.uri,
  MYPAGE_PATH.coupon.mobileUri,
  MYPAGE_PATH.couponDetail.uri,
  MYPAGE_PATH.couponDetail.mobileUri,
  MYPAGE_PATH.myMembership.uri,
  MYPAGE_PATH.myMembership.mobileUri,
  MYPAGE_PATH.unsubscribeMembership.uri,
  MYPAGE_PATH.unsubscribeMembership.mobileUri,
];

export const checkIsKPDSPage = (pathname: string) => {
  return INCLUDE_PATH.includes(pathname);
};
