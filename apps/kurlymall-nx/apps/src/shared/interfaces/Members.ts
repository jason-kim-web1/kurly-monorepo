import { FreeTicket, MembersBannerMessage, SubscriptionPartner } from '../../mypage/membership/shared/type';
import { Grade, GradeName } from '../enums';

export interface MypagePointInfo {
  point: number;
  redirectUrl: string;
}

export interface MypageGiftCardInfo {
  count: number;
  benefitMessage: string;
  redirectUrl: string;
}

export interface VipInfo {
  name: string;
  profileImageUrl: string;
}

export interface MyKurlyStyleProfile {
  hasProfile: boolean;
}

export interface MemberInfoResponse {
  member_no: number;
  member_id: string;
  mobile_no: string;
  grade: number;
  group_name: string;
  name: string;
  email: string;
  vip_info: {
    name: string;
  };
}

export interface MemberBenefitsResponse {
  type: string;
  tag: string | null;
  name: string;
  model: MemberBenefitPolicy;
  value: number;
  description: string;
}

type SubscriptionStatus = 'SUBSCRIBE' | 'UNSUBSCRIBE';

export interface SubscriptionProduct {
  name: string;
  productCd: string;
  subscriptionPartner: {
    identifier: string;
    name: string;
  };
}

export interface MemberMyKurlyResponse {
  userName: string;
  userGrade: Grade;
  userGroupName: string;
  userGroupInfo: string;
  couponCount: number;
  pickCount: number;
  kurlyPassEnabled: true;
  subscription: {
    agreeSMS: boolean;
    cancelReserved: boolean;
    startSubscriptionDate: string;
    endSubscriptionDate: string;
    subscriptionStatus: SubscriptionStatus;
    subscriptionProduct: SubscriptionProduct;
  };
  freePoint: MypagePointInfo;
  prepaidPoint: MypagePointInfo;
  giftCard: MypageGiftCardInfo;
  vipInfo: VipInfo;
  kurlypayFailure: boolean;
}

export interface MemberMypageResponse {
  userName: string;
  userGrade: Grade;
  userGroupName: string;
  couponCount: number;
  subscription: {
    agreeSMS: boolean;
    cancelReserved: boolean;
    startSubscriptionDate: string;
    endSubscriptionDate: string;
    subscriptionStatus: SubscriptionStatus;
    subscriptionProduct: SubscriptionProduct;
  };
}

export interface MemberInfo {
  memberNo: number;
  id: string;
  name: string;
  email: string;
  mobile: string;
  grade: Grade;
  gradeName: string;
  vipInfo: {
    name: string;
  };
}

export enum MemberBenefitPolicy {
  MEMBER_BENEFIT_POLICY = 'MEMBER_BENEFIT_POLICY',
  MEMBER_GROUP_POLICY = 'MEMBER_GROUP_POLICY',
  KURLY_PASS = 'KURLY_PASS',
}
export interface MemberPointBenefit {
  grade: string;
  policy: MemberBenefitPolicy;
  percent: number;
  description: string;
}

export type MemberBenefit = MemberBenefitsResponse;

export interface MemberSubscription {
  agreeSMS: boolean;
  cancelReserved: boolean;
  hasAffiliateBenefits: boolean;
  startSubscriptionDate: string;
  endSubscriptionDate: string;
  isSubscribed: boolean;
  showMembershipBanner: boolean;
  partner?: SubscriptionPartner;
  isUsingFreeTicket: boolean;
  freeTicket?: FreeTicket;
  bannerMessage: MembersBannerMessage;
}

export interface MemberMetadata {
  segments: string[];
}

export interface MemberMyKurly {
  userName: string;
  userGrade: Grade;
  userGradeName: string;
  userGroupInfo: string;
  couponCount: number;
  pickCount: number;
  isKurlyPassEnabled: boolean;
  subscription: {
    agreeSMS: boolean;
    cancelReserved: boolean;
    startSubscriptionDate: string;
    endSubscriptionDate: string;
    isSubscribed: boolean;
    showMembershipBanner: boolean;
    partner: SubscriptionPartner;
  };
  freePoint: MypagePointInfo;
  prepaidPoint: MypagePointInfo;
  giftCard: MypageGiftCardInfo;
  vipInfo: VipInfo;
  isKurlypayFailure: boolean;
}

export interface MemberGradeInfoResponse {
  member_no: number;
  current_month: {
    level: number;
    name: GradeName;
    description: string;
  };
  next_month: {
    level: number;
    name: GradeName;
    description: string;
  };
  upgrade_info: {
    payment_price_sum: number;
    order_price_sum: number;
    used_point_sum: number;
    require_order_price_sum: number;
    upgrade_level: {
      level: number;
      name: GradeName;
      description: string;
    };
  };
}

export interface MemberGradeInfo {
  memberNo: number;
  currentMonth: {
    level: number;
    name: GradeName;
    description: string;
  };
  nextMonth: {
    level: number;
    name: GradeName;
    description: string;
  };
  upgradeInfo: {
    paymentPriceSum: number;
    orderPriceSum: number;
    usedPointSum: number;
    requireOrderPriceSum: number;
    upgradeLevel: {
      level: number;
      name: GradeName;
      description: string;
    };
  };
}

export const enum DuplicationKeys {
  MEMBER_ID = 'MEMBER_ID',
  EMAIL = 'EMAIL',
  MOBILE_NUMBER = 'MOBILE_NUMBER',
}

export interface MemberDuplicationBody {
  key: DuplicationKeys;
  value: string;
}

export interface MemberExistentBody {
  key: DuplicationKeys.MEMBER_ID;
  value: string;
}

export interface MembershipLabel {
  text: string;
  textColor: string;
  backgroundColor: string;
  borderColor: string;
}

export interface MemberDeviceAgreementResponse {
  push_agreement: boolean;
  night_push_agreement: boolean;
  marketing_push_agreement: boolean;
  push_agreed_datetime: string;
  push_agreed_timestamp: number;
  night_push_agreed_datetime: string;
  night_push_agreed_timestamp: number;
  marketing_push_agreed_datetime: string;
  marketing_push_agreed_timestamp: number;
}

export interface MemberDeviceAgreement {
  pushAgreement: boolean;
  nightPushAgreement: boolean;
  marketingPushAgreement: boolean;
}
