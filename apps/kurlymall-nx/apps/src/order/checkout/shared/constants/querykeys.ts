export const CART_QUERY_KEYS = {
  ALL: ['CART'] as const,
  DETAIL: (address?: string) => [...CART_QUERY_KEYS.ALL, 'DETAIL', { address }] as const,
  CURRENT_ADDRESS: (isGuest: boolean) => [...CART_QUERY_KEYS.ALL, 'CURRENT_ADDRESS', { isGuest }] as const,
  CHECK_ADDRESS: () => [...CART_QUERY_KEYS.ALL, 'CHECK_ADDRESS'] as const,
  RECOMMEND_PRODUCT_LIST: () => [...CART_QUERY_KEYS.ALL, 'RECOMMEND_PRODUCT_LIST'] as const,
  REFRESH: () => [...CART_QUERY_KEYS.ALL, 'REFRESH'] as const,
};
