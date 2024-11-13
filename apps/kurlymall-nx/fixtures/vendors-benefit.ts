import {
  KAKAOPAY_VENDOR,
  KURLYPAY_CERDIT_VENDOR,
  NAVERPAY_VENDOR,
  TOSSPAYMENTS_VENDOR,
  EASY_KURLYPAY_VENDOR,
} from './checkout/payment-vendors';

interface Event {
  vendorName?: string;
  title: string;
  descriptions: string[];
}

export const EASY_KURLYPAY_BENEFIT: Event = {
  vendorName: EASY_KURLYPAY_VENDOR.name,
  title: `${EASY_KURLYPAY_VENDOR.name} 첫 결제시 5천원 즉시 할인, 5천원 캐시백`,
  descriptions: ['10월 한달간 결제시, 누구나 상시 2% 캐시백', '구매 금액의 최대 5% 적립금 지급'],
};

export const KAKAOPAY_BENEFIT: Event = {
  vendorName: KAKAOPAY_VENDOR.name,
  title: `${KAKAOPAY_VENDOR.name} 첫 결제시 5천원 즉시 할인, 5천원 캐시백`,
  descriptions: ['10월 한달간 카카오페이로 결제시, 누구나 상시 2% 캐시백', '구매 금액의 최대 5% 적립금 지급'],
};

export const NAVERPAY_BENEFIT: Event = {
  vendorName: NAVERPAY_VENDOR.name,
  title: `${NAVERPAY_VENDOR.name} 포인트 2배 적립`,
  descriptions: ['10만원 이상 구매시 네이버포인트 2배 적립'],
};

export const TOSSPAYMENTS_BENEFIT: Event = {
  vendorName: TOSSPAYMENTS_VENDOR.name,
  title: `${TOSSPAYMENTS_VENDOR.name} 로 1만원 이상 올해 최초 결제시 5천원 캐시백`,
  descriptions: ['~12월 31일 24시까지'],
};

export const KURLYPAY_CERDIT_BENEFIT: Event = {
  vendorName: KURLYPAY_CERDIT_VENDOR.name,
  title: `${KURLYPAY_CERDIT_VENDOR.name} 로 1만원 이상 올해 최초 결제시 5천원 캐시백`,
  descriptions: ['~12월 31일 24시까지'],
};

export const ALL_VENDOR_BENEFIT: Event[] = [
  KAKAOPAY_BENEFIT,
  NAVERPAY_BENEFIT,
  TOSSPAYMENTS_BENEFIT,
  KURLYPAY_CERDIT_BENEFIT,
];
