import { selectAppTemplate } from './select-app-template';

import { ADDRESS_PATH, CART_PATH, GIFT_PATH, INQUIRY_PATH, ORDER_PATH } from '../constant';

describe('selectAppTemplate', () => {
  context.each([ORDER_PATH.init.mobileUri ? ORDER_PATH.init.mobileUri : `/m${ORDER_PATH.init.uri}`])(
    'pathname이 USE_APP_PROPS_COMPONENT_ONLY_URI 일부에 포함되어 있으면',
    (expected) => {
      it('app_props_component_only를 반환한다.', () => {
        expect(selectAppTemplate(expected)).toBe('app_props_component_only');
      });
    },
  );

  context.each([
    ORDER_PATH.processWebview.uri,
    `${ORDER_PATH.processWebview.uri}/process`,
    `${ORDER_PATH.processWebview.uri}/kurly-pass`,
  ])('pathname이 USE_PAGE_ONLY_URI 일부에 포함되어 있으면', (expected) => {
    it('use_page_only를 반환한다.', () => {
      expect(selectAppTemplate(expected)).toBe('use_page_only');
    });
  });

  context.each([
    ORDER_PATH.order.uri,
    ORDER_PATH.process.uri,
    ORDER_PATH.success.uri,
    ORDER_PATH.fail.uri,
    ORDER_PATH.cancel.uri,
    CART_PATH.counter.uri,
    CART_PATH.cart.uri,
    ADDRESS_PATH.address.uri,
    ADDRESS_PATH.add.uri,
    ADDRESS_PATH.result.uri,
    ADDRESS_PATH.update.uri,
    GIFT_PATH.gift.uri,
    INQUIRY_PATH.inquiry.uri,
  ])('그 외의 uri면', (expected) => {
    it('all을 반환한다.', () => {
      expect(selectAppTemplate(expected)).toBe('all');
    });
  });
});
