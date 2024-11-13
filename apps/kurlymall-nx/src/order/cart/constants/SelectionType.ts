/**
 * 장바구니 삭제 버튼 유형 (선택삭제, 상품별 'X' 버튼, 품절상품삭제버튼) 중 선택된 type 값
 * * 선택삭제 = selection
 * * 상품별 'X' 버튼 = product
 * * 품절상품삭제버튼 = soldout
 */
export const DELETE_TYPE = {
  SELECTION: 'selection',
  PRODUCT: 'product',
  SOLDOUT: 'soldout',
} as const;

export type DeleteType = typeof DELETE_TYPE[keyof typeof DELETE_TYPE];
