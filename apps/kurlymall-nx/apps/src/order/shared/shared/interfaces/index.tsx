import { CardVendorCode, GiftMethod } from '../../../../shared/constant';

export const VendorCodes = {
  KAKAOPAY: 'kakao-pay',
  KURLYPAY: 'kurlypay',
  KURLYPAY_CREDIT: 'kurlypay-credit',
  TOSS_PAYMENTS: 'toss-payments',
  TOSS: 'toss',
  NAVER_PAY: 'naver-pay',
  PAYCO: 'payco',
  PHONEBILL: 'phonebill',
} as const;

export type VendorCode = typeof VendorCodes[keyof typeof VendorCodes];

// 'smile-pay', 'mobilians' - 삭제 된 결제수단
const VendorCodesWithDeleted = {
  ...VendorCodes,
  SMILE_PAY: 'smile-pay',
  MOBILIANS: 'mobilians',
};

export type VendorCodeWithDeleted = typeof VendorCodesWithDeleted[keyof typeof VendorCodesWithDeleted];

export interface Receiver {
  name: string;
  phone: string;
  method: GiftMethod;
}

export interface PaymentVendor {
  code: VendorCode;
  name: string;
  hasEvent: boolean;
  isSimplePay: boolean;
}

export type PaymentEvents = {
  [P in VendorCode]?: PaymentEvent[];
};

export interface PaymentEvent {
  code: VendorCode;
  title: string;
  descriptions: string[];
}

export interface Installment {
  name: string;
  value: string;
}

export interface CreditCard {
  name: string;
  value: CardVendorCode;
}

export * from './OrderVendorCode.interface';
