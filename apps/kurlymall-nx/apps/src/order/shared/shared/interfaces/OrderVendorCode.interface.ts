/**
 * 결제수단 (컬리패스를 제외한 주문서, 선물하기 결제에서 사용)
 * @description kurly: 전액적립금 결제
 */
export type PaymentsVendorCode =
  | 'kakao-pay'
  | 'kurlypay'
  | 'toss-payments'
  | 'toss'
  | 'naver-pay'
  | 'payco'
  | 'phonebill'
  | 'kurly'
  | 'kurlypay-credit';

/**
 * 결제수단 (주문서 장바구니에서 사용)
 * @description ALL: 쿠폰 사용 시 모든 결제수단에서 사용 가능
 */
export type OrderVendorCode = PaymentsVendorCode | 'kurly-pass' | 'ALL';

// 결제수단 > 결제수단명 표시
export const CheckoutVendorTextMap: Record<OrderVendorCode, string> = {
  payco: '페이코',
  'naver-pay': '네이버페이',
  toss: '토스',
  'kakao-pay': '카카오페이',
  phonebill: '휴대폰 결제',
  'toss-payments': '신용카드 결제',
  'kurlypay-credit': '신용카드 결제',
  kurly: '컬리 포인트',
  'kurly-pass': '컬리패스',
  ALL: '모든 결제 수단 허용',
  kurlypay: '컬리페이',
};

// 앰플리튜드에 사용되는 결제수단 values
export const AmplitudePaymentMethods: {
  [key in PaymentsVendorCode | 'onlyFreePoint' | 'onlyPaidPoint']: string;
} = {
  'naver-pay': 'naverpay',
  'kakao-pay': 'kakaopay',
  'toss-payments': '신용카드',
  payco: 'payco',
  phonebill: '핸드폰',
  toss: 'toss',
  kurly: '적립금*컬리캐시 전액사용',
  'kurlypay-credit': '신용카드',
  kurlypay: '컬리페이',
  onlyFreePoint: '적립금',
  onlyPaidPoint: '컬리캐시',
};
