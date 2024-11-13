import {
  CART_PATH,
  ORDER_PATH,
  ADDRESS_PATH,
  USER_MENU_PATH,
  GIFT_PATH,
  INQUIRY_PATH,
  PAYMENT_GIFT_PATH,
} from '../../shared/constant';

import { isAllowedUrl } from './isAllowedUrl';

test('isAllowedUrl 허용', () => {
  expect(isAllowedUrl(USER_MENU_PATH.home.uri)).toBe(true);
});

test.each([
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
])('isAllowedUrl 허용 불가', (expected) => {
  expect(isAllowedUrl(expected)).toBe(false);
});
