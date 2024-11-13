import {
  AffiliateBenefits,
  Benefit,
  BenefitOptionCodeType,
  BenefitOptionInfo,
  CouponMetaType,
  Payment,
  SubscriptionPartner,
  UnusedFreeTickets,
  UsingFreeTicket,
} from '../../../mypage/membership/shared/type';

export enum SettlementStatus {
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  FAILED = 'FAILED',
  SUSPENDED = 'SUSPENDED',
}

export enum SubscriptionStatus {
  SUBSCRIBE = 'SUBSCRIBE',
  UNSUBSCRIBE = 'UNSUBSCRIBE',
}

export enum SubscriptionPartnerIdentifier {
  KURLY = 'KURLY',
  SKT = 'SKT',
}

export enum BenefitType {
  POINT = 'POINT',
  COUPON = 'COUPON',
}

export enum CouponType {
  PRICE_DISCOUNT = 'PRICE_DISCOUNT',
  PERCENT_DISCOUNT = 'PERCENT_DISCOUNT',
  FREE_SHIPPING = 'FREE_SHIPPING',
}

export enum AffiliateBenefitType {
  LINK = 'LINK',
  LINK_RANDOM_NUMBER = 'LINK_RANDOM_NUMBER',
  NUMBER = 'NUMBER',
}

export type Coupon = {
  couponType: CouponType;
  description: string;
  value: number;
  used: boolean;
};

export type BenefitItem = {
  benefitType: BenefitType;
  point: { value: number } | null;
  coupon: Coupon | null;
};

export type MyMembershipBenefitsResponse = {
  isSubscribed: boolean;
  isCancelReserved: boolean;
  canCancelNow: boolean;
  partner: SubscriptionPartner;
  startBenefitDate: string;
  endBenefitDate: string;
  benefits: Benefit[];
  providedBenefitOptionInfo: BenefitOptionInfo;
  selectedBenefitOptionInfo: BenefitOptionInfo;
  payment: Payment;
  startAffiliateDate: string;
  endAffiliateDate: string;
  affiliateBenefits: AffiliateBenefits[];
  usingFreeTicket?: UsingFreeTicket;
  unusedFreeTickets?: UnusedFreeTickets[];
};

export type PaymentUnsubscribeDetailResponse = {
  benefits: Benefit[];
  endBenefitDate: string;
  cancelable: boolean;
  affiliateBenefits: AffiliateBenefits[];
  usingFreeTicket?: UsingFreeTicket;
};

export type PaymentUnsubscribeRequest = {
  id: number | undefined;
  reason: string | undefined;
};

export type PaymentUnsubscribeReserveRequest = PaymentUnsubscribeRequest & {
  isCancelReserved: boolean;
};

export type PaymentUnsubscribeResponse = {
  status: number;
};

export type MemberSessionRequest = {
  marketingAgreement: boolean;
};

// 멤버십 구독 안내
export type MembersBenefitLanding = {
  id: string;
  url: string;
  imgPC: string;
  imgMobile: string;
};

export type MembersInfoImageList = {
  title: string;
  description: string;
  imgPC: string;
  imgMobile: string;
  bgColor: string;
  noticeText?: string[];
  noticeSlide?: string[];
  contentId?: string;
  landing?: MembersBenefitLanding;
};

export type MembersTabMenuLists = {
  id: string;
  name: string;
};

export type BenefitShare = {
  kakaoTemplateId: number;
  linkCopy: string;
};

export type AffiliateBenefitResponse = {
  affiliateId: string;
  imgUrl: string;
  color: string;
  title: string;
  content: string[];
  benefitType: AffiliateBenefitType;
  redirectLink: string;
  couponNumber?: string;
};

export type BenefitOptionIdResponse = {
  benefitOptionId: number;
};

export interface BenefitMetaList {
  id: string;
  type: CouponMetaType;
  description: string;
  value: number;
  common: boolean;
}

export interface CouponMetaList {
  benefitOptionId: number;
  benefitOptionName: string;
  benefitOptionDescription: string;
  benefitOptionCode: BenefitOptionCodeType;
  benefitMetaList: BenefitMetaList[];
}

export interface CouponPackResponse {
  selectedBenefitOptionId: number;
  providedBenefitOptionId: number;
  benefitOptionCouponMetaList: CouponMetaList[];
}

export interface MyBenefitUpdate {
  title: string;
  defaultVersion: string;
  updateVersion: string;
  updateDate: Date;
}

export interface MyBenefitList {
  title: string;
  text: string;
}

export interface MyBenefitInfo {
  name: string;
  value: string;
  info: MyBenefitList[];
  total: string;
}

export interface MyBenefitResponse {
  data: MyBenefitInfo[];
}
