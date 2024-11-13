import {
  CART_PATH,
  ORDER_PATH,
  ADDRESS_PATH,
  GIFT_PATH,
  INQUIRY_PATH,
  PAYMENT_GIFT_PATH,
  USER_MENU_PATH,
  PRODUCT_PATH,
} from '../../shared/constant';

export const isAllowedUrl = (pathname: string) => {
  const NOT_ALLOWED_URL = [
    ORDER_PATH.order.uri,
    ORDER_PATH.success.uri,
    ORDER_PATH.fail.uri,
    ORDER_PATH.cancel.uri,
    PAYMENT_GIFT_PATH.success.uri,
    PAYMENT_GIFT_PATH.fail.uri,
    PAYMENT_GIFT_PATH.cancel.uri,
    CART_PATH.counter.uri,
    CART_PATH.cart.uri,
    ADDRESS_PATH.address.uri,
    ADDRESS_PATH.add.uri,
    ADDRESS_PATH.result.uri,
    ADDRESS_PATH.update.uri,
    GIFT_PATH.gift.uri,
    INQUIRY_PATH.inquiry.uri,
  ];

  return !NOT_ALLOWED_URL.includes(pathname);
};

export const CART_PAGE = [CART_PATH.cart.uri, CART_PATH.cart.mobileUri];

export const isActiveProductListUrl = (pathname: string) => {
  const PRODUCT_LIST_URL = [
    USER_MENU_PATH.category.uri,
    PRODUCT_PATH.collections.uri,
    PRODUCT_PATH.categories.uri,
    PRODUCT_PATH.collectionGroups.uri,
  ];

  return PRODUCT_LIST_URL.some((url) => pathname.startsWith(url));
};

export const isActiveMyKurlyUrl = (pathname: string) => {
  const MY_KURLY_URL = [USER_MENU_PATH.mykurly.uri, '/member'];

  return MY_KURLY_URL.some((url) => pathname.startsWith(url));
};
