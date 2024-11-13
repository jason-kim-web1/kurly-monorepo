/**
 * 지불 방법에 대한 공용 타입 및 상수 정의
 */

export type PaymentMethod =
  | 'bank_deposit'
  | 'virtual_account'
  | 'point_only'
  | 'promotion'
  | 'credit_card'
  | 'pay_credit_card'
  | 'pay_money'
  | 'pay_cash'
  | 'pay_point'
  | 'pay_bank_transfer'
  | 'pay_coupon'
  | 'pay_discount'
  | 'pay_gift_card'
  | 'mobile_pay'
  | 'others'
  | 'none'
  | '';

export type PaymentVendorCode =
  | 'smile-pay'
  | 'paynow'
  | 'payco'
  | 'naver-pay'
  | 'toss'
  | 'chai'
  | 'kakao-pay'
  | 'mobilians'
  | 'phonebill'
  | 'toss-payments'
  | 'kurlypay-credit'
  | 'kurly'
  | 'toss-payments-subscription'
  | 'others'
  | 'kurlypay';

export type CardVendorCode =
  | '61' //현대
  | '41' //신한
  | '31' //비씨(페이북)
  | '11' //KB국민
  | '51' //삼성
  | '71' //롯데
  | '21' //하나(외환)
  | '91' //NH채움
  | '33' //우리
  | '34' //수협
  | '36' //씨티
  | '46' //광주
  | '35' //전북
  | '42' //제주
  | '62' //신협체크
  | '38' //MG새마을체크
  | '39' //저축은행체크
  | '37' //우체국카드
  | '30' //KDB산업은행
  | '15' //카카오뱅크
  | 'P1' // 컬리
  | 'A'; // 전체

type CardVendorKey =
  | 'SHINHAN_CARD'
  | 'BC_CARD'
  | 'KB_CARD'
  | 'LOTTE_CARD'
  | 'HANA_CARD'
  | 'NH_CARD'
  | 'WOORI_CARD'
  | 'SUHYUP_CARD'
  | 'CITY_CARD'
  | 'KAKAOBANK_CARD'
  | 'KDB_CARD'
  | 'JB_CARD'
  | 'POST_CARD'
  | 'MG_CARD'
  | 'JEOCHUK_CARD'
  | 'JEJU_CARD'
  | 'KWANGJU_CARD'
  | 'SAMSUNG_CARD'
  | 'HYUNDAI_CARD'
  | 'SHINHYEOP_CARD'
  | 'KURLYPAY_CARD'
  | 'ALL_CARD';

type PaymentVendorKey =
  | 'SMILE_PAY'
  | 'PAYNOW'
  | 'PAYCO'
  | 'NAVER_PAY'
  | 'TOSS'
  | 'CHAI'
  | 'KAKAO_PAY'
  | 'MOBILIANS'
  | 'PHONEBILL'
  | 'TOSS_PAYMENTS'
  | 'KURLYPAY_CREDIT'
  | 'KURLY'
  | 'TOSS_PAYMENTS_SUBSCRIPTION'
  | 'OTHERS'
  | 'KURLYPAY';

//쿠폰에서 사용하는 payment name 정의
export const PaymentVendorName: Record<PaymentVendorCode, string> = {
  'smile-pay': '스마일페이',
  paynow: '페이나우',
  payco: '페이코',
  'naver-pay': '네이버페이',
  toss: '토스',
  chai: '차이',
  'kakao-pay': '카카오페이',
  mobilians: '휴대폰 결제',
  phonebill: '휴대폰 결제',
  'toss-payments': '토스페이먼츠(신용카드결제사)',
  'kurlypay-credit': '신용카드',
  'toss-payments-subscription': '토스페이먼츠 정기결제',
  kurly: '컬리 포인트',
  others: '기타',
  kurlypay: '컬리페이',
};

//쿠폰에서 사용하는 card name 정의
export const CartVendorName: Record<CardVendorCode, string> = {
  '41': '신한 (구, LG)',
  '31': '비씨',
  '11': 'KB국민',
  '71': '롯데',
  '21': '하나(외환)',
  '91': 'NH채움',
  '33': '우리',
  '34': '수협',
  '36': '씨티',
  '15': '카카오뱅크',
  '30': 'KDB 산업체크',
  '35': '전북',
  '37': '우체국체크',
  '38': 'MG 새마을금고체크',
  '39': '저축은행체크',
  '42': '제주',
  '46': '광주',
  '51': '삼성',
  '61': '현대',
  '62': '신협체크',
  P1: '컬리',
  A: '전체',
};

export const CardVenderCode: Record<CardVendorKey, CardVendorCode> = {
  SHINHAN_CARD: '41',
  BC_CARD: '31',
  KB_CARD: '11',
  LOTTE_CARD: '71',
  HANA_CARD: '21',
  NH_CARD: '91',
  WOORI_CARD: '33',
  SUHYUP_CARD: '34',
  CITY_CARD: '36',
  KAKAOBANK_CARD: '15',
  KDB_CARD: '30',
  JB_CARD: '35',
  POST_CARD: '37',
  MG_CARD: '38',
  JEOCHUK_CARD: '39',
  JEJU_CARD: '42',
  KWANGJU_CARD: '46',
  SAMSUNG_CARD: '51',
  HYUNDAI_CARD: '61',
  SHINHYEOP_CARD: '62',
  KURLYPAY_CARD: 'P1',
  ALL_CARD: 'A',
};

export const PaymentVenderName: Record<PaymentVendorKey, PaymentVendorCode> = {
  SMILE_PAY: 'smile-pay',
  PAYNOW: 'paynow',
  PAYCO: 'payco',
  NAVER_PAY: 'naver-pay',
  TOSS: 'toss',
  CHAI: 'chai',
  KAKAO_PAY: 'kakao-pay',
  MOBILIANS: 'mobilians',
  PHONEBILL: 'phonebill',
  TOSS_PAYMENTS: 'toss-payments',
  KURLYPAY_CREDIT: 'kurlypay-credit',
  KURLY: 'kurly',
  TOSS_PAYMENTS_SUBSCRIPTION: 'toss-payments-subscription',
  OTHERS: 'others',
  KURLYPAY: 'kurlypay',
};
