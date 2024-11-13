import { PaymentVendor } from '../../src/order/shared/shared/interfaces';

export const KAKAOPAY_VENDOR: PaymentVendor = {
  code: 'kakao-pay',
  name: '카카오페이',
  hasEvent: false,
  isSimplePay: true,
};

export const NAVERPAY_VENDOR: PaymentVendor = {
  code: 'naver-pay',
  name: '네이버페이',
  hasEvent: false,
  isSimplePay: false,
};

export const TOSS_VENDOR: PaymentVendor = {
  code: 'toss',
  name: '토스',
  hasEvent: false,
  isSimplePay: true,
};

export const PAYCO_VENDOR: PaymentVendor = {
  code: 'payco',
  name: '페이코',
  hasEvent: false,
  isSimplePay: true,
};

export const TOSSPAYMENTS_VENDOR: PaymentVendor = {
  code: 'toss-payments',
  name: '신용카드',
  hasEvent: false,
  isSimplePay: false,
};

export const KURLYPAY_CERDIT_VENDOR: PaymentVendor = {
  code: 'kurlypay-credit',
  name: '신용카드',
  hasEvent: false,
  isSimplePay: false,
};

export const EASY_KURLYPAY_VENDOR: PaymentVendor = {
  code: 'kurlypay',
  name: '컬리카드',
  hasEvent: false,
  isSimplePay: false,
};

export const simpleVendorsFixture: PaymentVendor[] = [NAVERPAY_VENDOR, TOSS_VENDOR, PAYCO_VENDOR];

export const vendorsFixture: PaymentVendor[] = [
  KAKAOPAY_VENDOR,
  NAVERPAY_VENDOR,
  TOSSPAYMENTS_VENDOR,
  EASY_KURLYPAY_VENDOR,
];

export const vendorsFixtureWithKurlyPayCredit: PaymentVendor[] = [
  KAKAOPAY_VENDOR,
  NAVERPAY_VENDOR,
  KURLYPAY_CERDIT_VENDOR,
];
