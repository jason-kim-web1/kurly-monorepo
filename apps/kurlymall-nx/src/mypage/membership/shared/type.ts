import { CouponType } from '../../../shared/api/membership/api.type';

export enum MembershipBenefitType {
  POINT = 'point',
  COUPON = 'coupon',
}

export type Benefit = {
  type: MembershipBenefitType;
  value: string;
  isUsed: boolean;
  condition: string;
  couponType?: CouponType;
};

export enum PaymentStatus {
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  FAILED = 'FAILED',
  SUSPENDED = 'SUSPENDED',
}

export enum PaymentType {
  KURLY_PAY = 'kurly-pay',
  NAVER_PAY = 'naver-pay',
  CREDIT = 'credit',
}

export type Payment = {
  status: PaymentStatus;
  nextDate: string;
  price: string | null;
  type: PaymentType;
  method: {
    name: string;
    number: string;
  };
};

export type CancelReason = {
  id: number;
  reason: string;
};

export type FreeTicket = {
  expiredAt: string;
  name: string;
  months: number;
};

export type MembersBannerMessage = {
  title: string;
  description: string;
};

export type BenefitOptionInfo = {
  benefitOptionId: number;
  benefitOptionName: string;
  benefitOptionDescription: string;
};

export interface SubscriptionPartner {
  isSKT: boolean;
  isKurly: boolean;
  name: string;
}

export interface MyMembershipState {
  loading: boolean;
  isSubscribed: boolean;
  isCancelReserved: boolean;
  isCancelNow: boolean;
  startBenefitDate: string;
  endBenefitDate: string;
  benefits: Benefit[];
  providedBenefit: BenefitOptionInfo;
  selectedBenefit: BenefitOptionInfo;
  payment: Payment;
  cancelReasons: CancelReason[];
  partner: SubscriptionPartner;
  startAffiliateDate: string;
  endAffiliateDate: string;
  affiliateBenefits: AffiliateBenefits[];
  usingFreeTicket?: UsingFreeTicket;
  unusedFreeTickets?: UnusedFreeTickets[];
}

export interface SubscriptionMember {
  cancelReserved: boolean;
  startSubscriptionDate: string;
  endSubscriptionDate: string;
  isSubscribed: boolean;
  partner?: SubscriptionPartner;
  agreeSMS: boolean;
  hasAffiliateBenefits: boolean;
  isUsingFreeTicket: boolean;
  freeTicket?: FreeTicket;
  bannerMessage: MembersBannerMessage;
}

export type AffiliateBenefits = {
  imgUrl: string;
  title: string;
  content: string[];
  benefitType: string;
};

export type UsingFreeTicket = {
  id: number;
  name: string;
  startedAt: string;
  endedAt: string;
  status: string;
};

export type UnusedFreeTickets = {
  id: number;
  name: string;
  createdAt: string;
  expiredAt: string;
  status: string;
};

export enum BenefitOptionCodeType {
  CORE = 'CORE',
  PLUS = 'PLUS',
}

export enum CouponMetaType {
  FREE_SHIPPING = 'FREE_SHIPPING',
  PERCENT_DISCOUNT = 'PERCENT_DISCOUNT',
  PRICE_DISCOUNT = 'PRICE_DISCOUNT',
}

export type SurveyBenefitText = {
  title: string;
  text?: string;
  list?: string[];
};

export enum UnsubscribeConfirmMessage {
  NOW = '즉시 구독 취소',
  RESERVE = '구독 해지 예약',
  CANCEL = '취소',
  UNSUBSCRIBE = '해지하기',
  UNSUBSCRIBE_CONFIRMSHEET = '구독 해지',
  SUBSCRIBE_CONFIRMSHEET = '혜택 유지',
  SURVEY = '제출하기',
}
