const FUSION_SIGNALS_EVENT = {
  REQUEST: 'request',
  CLICK_PRODUCT: 'click_product',
  CLICK_SELECT: 'click_select',
  CLICK_ADD_TO_CART: 'click_add_to_cart_from_click_product',
  CLICK_BUY_DIRECT: 'click_buy_direct_from_click_product',
  CLICK_ADD_TO_CART_FROM_CLICK_SELECT: 'click_add_to_cart_from_click_select',
  CLICK_BUY_DIRECT_FROM_CLICK_SELECT: 'click_buy_direct_from_click_select',
} as const;

type FusionSignalsEventType = typeof FUSION_SIGNALS_EVENT[keyof typeof FUSION_SIGNALS_EVENT] | '';

interface FusionSignalsParams {
  site: 'market' | 'beauty';
  session: string;
  app_id: string;
  user_id: string;
  fusion_query_id: string;
  query: string;
  doc_id?: number;
  label?: string;
  click_seq?: number;
  res_offset?: number;
  res_pos?: number;
}

export { FUSION_SIGNALS_EVENT };
export type { FusionSignalsEventType, FusionSignalsParams };
