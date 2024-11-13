import { BenefitType, EasyPaymentCompanyId } from '../../../shared/interfaces';

export interface KurlyMembersResponseProduct {
  name: string;
  code: string;
  price: number;
  discountPrice: number;
}

export type KurlypayType = 'card' | 'bank';

type KurlypayCardType = 'credit_card' | 'check_card';

export enum KurlyMembersCouponPackCode {
  CORE = 'CORE',
  PLUS = 'PLUS',
}

export type KurlyMembersCouponPackCodeType = keyof typeof KurlyMembersCouponPackCode;

interface KurlypayBase {
  id: string;
  type: KurlypayType;
  companyCode: EasyPaymentCompanyId;
  companyName: string;
  maskingNo: string;
  imageUrl: string;
  cardType: KurlypayCardType;
  createdAt: string;
  lastPaymentAt: string;
}

interface KurlypayPaymentMethod extends KurlypayBase {
  registered?: boolean;
}

type KurlypayPaymentMethodList = KurlypayPaymentMethod[];

export interface KurlyMembersCheckoutApiResponse extends KurlyMembersChangePaymentMethodApiResponse {
  order: {
    firstSubscription: boolean;
    startSettlementDate: string;
  };
  nextFreeTicket: KurlyMembersFreeTicket | null;
  benefitOptionMetaList: BenefitOption[];
}
export interface KurlyMembersChangePaymentMethodApiResponse {
  product: KurlyMembersResponseProduct;
  order: {
    startSettlementDate: string;
  };
  kurlypayPaymentMethodList: KurlypayPaymentMethodList;
  isKurlypayError: boolean;
}

export interface KurlyMembersProduct {
  name: string;
  code: string;
  originalPrice: number;
  paymentPrice: number;
}

export interface KurlyMembersFreeTicket {
  id: number;
  name: string;
  createdAt: string;
  expiredAt: string;
  status: string;
}

interface BenefitMeta {
  type: BenefitType;
  description: string;
  value: number;
  tagList: string[];
}
export interface BenefitOption {
  benefitOptionId: number;
  benefitOptionCode: KurlyMembersCouponPackCodeType;
  benefitOptionName: string;
  benefitOptionDescription: string;
  benefitMetaList: BenefitMeta[];
}

export interface Coupon {
  couponType: BenefitType;
  couponDescription: string;
  couponValue: number;
  couponTagList: string[];
}

export interface CouponPack {
  couponPackId: number;
  couponPackCode: KurlyMembersCouponPackCodeType;
  couponPackName: string;
  couponPackDescription: string;
  couponList: Coupon[];
}

export interface PaymentMethod extends KurlypayBase {
  isCurrentPaymentMethod?: boolean;
}

export interface KurlyMembersCheckoutResponse {
  product: KurlyMembersProduct;
  order: {
    firstSubscription?: boolean;
    startSettlementDate: string;
  };
  kurlypayList: PaymentMethod[];
  nextFreeTicket?: KurlyMembersFreeTicket | null;
  couponPackList?: CouponPack[];
  isKurlypayError: boolean;
}

export interface MembersCheckoutResponse extends KurlyMembersChangePaymentMethodApiResponse {
  nextFreeTicket?: KurlyMembersFreeTicket | null;
  benefitOptionMetaList?: BenefitOption[];
}
