export const REFERRER_EVENT = new Set(['select_product', 'select_product_shortcut']);

export const REFERRER_EVENT_SAVE = new Set([
  'view_product_detail',
  'view_product_selection',
  'select_purchase',
  'add_to_cart_product',
  'add_to_cart_success',
  'restock_alarm_success',
  'select_pick_product',
  'remove_pick_product',
  'order_creation_success',
  'select_expand_button',
  'select_checkout',
  'checkout_success',
  'purchase_product',
  'select_section_item',
  'select_section_item_shortcut',
]);

// referrer_event에 selection_type이 들어갔을 때 해당 값을 유지해야하는 이벤트 목록
export const REFERRER_EVENT_SELECTION_TYPE_EVENT_SAVE = new Set([
  'select_product_shortcut',
  'view_product_detail',
  'view_product_selection',
  'add_to_cart_product',
  'add_to_cart_success',
  'order_creation_success',
  'select_expand_button',
  'select_checkout',
  'checkout_success',
  'purchase_product',
  'select_section_item',
  'select_section_item_shortcut',
]);

// 웹뷰로 referrer_event가 전달되었을 경우 해당 값을 유지해야하는 이벤트 목록
export const WEBVIEW_REFERRER_EVENT_SAVE = new Set([
  'order_creation_success',
  'select_expand_button',
  'select_checkout',
  'checkout_success',
  'purchase_product',
]);

// NOTE: referrer_event 속성이 전송되어야 하는 이벤트 이름 목록
export const REFERRER_EVENT_PROPERTY_SEND_EVENT_NAMES = new Set([
  'order_creation_success',
  'select_checkout',
  'add_to_cart_product',
  'add_to_cart_success',
  'checkout_success',
  'purchase_product',
  'select_expand_button',
  'remove_pick_product',
  'select_pick_product',
  'select_purchase',
  'view_product_selection',
]);
