import { PaymentVendorCode } from '../../../../shared/constant';

export const PaymentVendorTextMap: Record<PaymentVendorCode, string> = {
  'smile-pay': '스마일페이', // 주문 내역을 위해 필요
  paynow: '페이나우',
  payco: '페이코',
  'naver-pay': '네이버페이',
  toss: '토스',
  chai: '차이',
  'kakao-pay': '카카오페이',
  mobilians: '휴대폰',
  phonebill: '휴대폰',
  'toss-payments': '신용카드',
  'kurlypay-credit': '신용카드',
  'toss-payments-subscription': '정기결제',
  kurly: '적립금 · 컬리캐시 전액사용',
  others: '기타',
  kurlypay: '컬리페이',
};
