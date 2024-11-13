import { isBefore, parseISO } from 'date-fns';

import {
  MemberBenefit,
  MemberDeviceAgreement,
  MemberDuplicationBody,
  MemberExistentBody,
  MemberGradeInfo,
  MemberInfo,
  MemberMyKurly,
  MemberPointBenefit,
  MemberSubscription,
} from '../interfaces';

import {
  fetchMyKurlyStyleProfile,
  insertMember,
  readMemberBenefits,
  readMemberDuplicationStatus,
  readMemberGradeInfo,
  readMemberInfo,
  readMemberPointBenefit,
  readMemberVerifyExistent,
  sendMobileAuthCode,
  verifyMobileAuthCode,
  putMemberPassword,
  VerificationForm,
  readMemberMykurlyInfo,
} from '../api';
import { PasswordChangeForm } from '../../member/change-password/shared/interface';
import {
  NormalSignupFormInterface,
  PostSignupFormInterface,
} from '../../member/signup/interfaces/NormalSignupForm.interface';
import { getDeviceID, isAos, isIos, isMobileWeb, isPC } from '../../../util/window/getDevice';
import { Grade } from '../enums';
import { SubscriptionPartnerIdentifier, SubscriptionStatus } from '../api/membership/api.type';
import { parseDate } from '../utils/date';
import { getUserMetaData } from '../../server/api';
import { getSubscriptionMembers } from '../api/membership/membership.api';
import { fetchDeviceAgreement } from '../api/members/device';
import getUserMetadata from '../../member/adult-verification/services/getUserMetadata';

export const getMyKurlyStyleProfile = async (): Promise<boolean> => {
  const { hasProfile } = await fetchMyKurlyStyleProfile();
  return hasProfile;
};

export const getMemberInfo = async (): Promise<MemberInfo> => {
  const data = await readMemberInfo();

  return {
    memberNo: data.member_no,
    id: data.member_id,
    name: data.name,
    email: data.email,
    mobile: data.mobile_no,
    grade: data.grade,
    gradeName: data.group_name,
    vipInfo: data.vip_info,
  };
};

export const getMemberPointBenefit = async (): Promise<MemberPointBenefit> => {
  const data = await readMemberPointBenefit();

  return {
    grade: data.name,
    policy: data.model,
    percent: data.value,
    description: data.tag === null ? '' : data.tag,
  };
};

export const getMemberBenefits = async (): Promise<MemberBenefit[]> => {
  const data = await readMemberBenefits();
  return data;
};

// 구독 정보 조회 - mypage
export const getSubscriptionMembersInfo = async (): Promise<MemberSubscription> => {
  const data = await getSubscriptionMembers();

  try {
    return {
      showMembershipBanner: true,
      ...data,
    };
  } catch (err) {
    return {
      isSubscribed: false,
      startSubscriptionDate: '',
      endSubscriptionDate: '',
      showMembershipBanner: false,
      agreeSMS: false,
      cancelReserved: false,
      hasAffiliateBenefits: false,
      partner: {
        isKurly: false,
        isSKT: false,
        name: '',
      },
      isUsingFreeTicket: false,
      freeTicket: {
        expiredAt: '',
        name: '',
        months: 0,
      },
      bannerMessage: {
        title: '',
        description: '',
      },
    };
  }
};

// 마이컬리 정보 조회 - mykurly
export const getMemberMykurlyInfo = async (): Promise<MemberMyKurly> => {
  const data = await readMemberMykurlyInfo();

  return {
    userName: data.userName,
    userGrade: data.userGrade,
    userGradeName: data.userGroupName,
    userGroupInfo: data.userGroupInfo,
    couponCount: data.couponCount,
    pickCount: data.pickCount,
    isKurlyPassEnabled: data.kurlyPassEnabled,
    subscription: data.subscription
      ? {
          ...data.subscription,
          isSubscribed: data.subscription?.subscriptionStatus === SubscriptionStatus.SUBSCRIBE,
          startSubscriptionDate: parseDate(data.subscription.startSubscriptionDate),
          endSubscriptionDate: parseDate(data.subscription.endSubscriptionDate),
          showMembershipBanner: true,
          partner: {
            isKurly:
              data.subscription?.subscriptionProduct?.subscriptionPartner?.identifier ===
              SubscriptionPartnerIdentifier.KURLY,
            isSKT:
              data.subscription?.subscriptionProduct?.subscriptionPartner?.identifier ===
              SubscriptionPartnerIdentifier.SKT,
            name: data.subscription?.subscriptionProduct?.subscriptionPartner?.name,
          },
        }
      : {
          isSubscribed: false,
          startSubscriptionDate: '',
          endSubscriptionDate: '',
          showMembershipBanner: false,
          agreeSMS: false,
          cancelReserved: false,
          partner: {
            isKurly: false,
            isSKT: false,
            name: '',
          },
        },
    freePoint: {
      point: data.freePoint?.point,
      redirectUrl: data.freePoint?.redirectUrl,
    },
    prepaidPoint: {
      point: data.prepaidPoint?.point,
      redirectUrl: data.prepaidPoint?.redirectUrl,
    },
    giftCard: {
      count: data.giftCard.count,
      benefitMessage: data.giftCard?.benefitMessage,
      redirectUrl: data.prepaidPoint?.redirectUrl,
    },
    isKurlypayFailure: data.kurlypayFailure,
    vipInfo: data.vipInfo,
  };
};

// 다음달 예상등급 정보 조회
export const getMemberGradeInfo = async (): Promise<MemberGradeInfo> => {
  const data = await readMemberGradeInfo();

  return {
    memberNo: data.member_no,
    currentMonth: { ...data.current_month },
    nextMonth: { ...data.next_month },
    upgradeInfo: {
      paymentPriceSum: data.upgrade_info.payment_price_sum,
      orderPriceSum: data.upgrade_info.order_price_sum,
      usedPointSum: data.upgrade_info.used_point_sum,
      requireOrderPriceSum: data.upgrade_info.require_order_price_sum,
      upgradeLevel: { ...data.upgrade_info.upgrade_level },
    },
  };
};

// 회원 패스워드 변경 (180일 알림 전용)
export const updateMemberPassword = async (password: Partial<PasswordChangeForm>): Promise<void> => {
  try {
    await putMemberPassword(password);
    return;
  } catch (error) {
    throw new Error(error.message);
  }
};

// 회원가입 휴대폰 인증번호 요청 및 검증
export const getVerificationInfo = async (body: VerificationForm) => {
  if (body.authCode) {
    return verifyMobileAuthCode(body);
  }
  return sendMobileAuthCode(body);
};

// 회원정보 중복 조회 (이메일, 아이디, 휴대폰번호,  회원가입 페이지 사용)
export const getMemberInfoDuplicationStatus = async (body: MemberDuplicationBody): Promise<boolean> => {
  const { isDuplicated } = await readMemberDuplicationStatus(body);
  return isDuplicated;
};

// 회원가입
export const fetchMemberSignup = async (
  signupValues: NormalSignupFormInterface,
): Promise<{
  memberNo: number;
}> => {
  const {
    memberId,
    password,
    name,
    email,
    mobileNumber,
    numberAddress,
    roadAddress,
    subAddress,
    zoneCode,
    zipCode,
    baseAddressType,
    gender,
    birthMonth,
    birthDay,
    birthYear,
    joinExtraInput,
    joinExtraInputType,
    joinInflowType,
    inflowType,
    agreed: {
      OptionalTermsOfPrivacy,
      OptionalTermsOfSms,
      OptionalTermsOfMailing,
      RequiredTermsCondition,
      RequiredTermsOfPrivacy,
    },
  } = signupValues;

  const forms: PostSignupFormInterface = {
    memberId,
    password,
    name,
    email,
    mobileNumber,
    numberAddress,
    roadAddress,
    subAddress,
    zoneCode,
    zipCode,
    baseAddressType,
    gender,
    joinInflowType,
    inflowType,
    isAgreeOptionalTermsOfPrivacy: OptionalTermsOfPrivacy.checked ?? false,
    isAgreeOptionalTermsOfSms: OptionalTermsOfSms.checked ?? false,
    isAgreeOptionalTermsOfMailing: OptionalTermsOfMailing.checked ?? false,
    isAgreeRequiredTermsCondition: RequiredTermsCondition.checked ?? false,
    isAgreeRequiredTermsOfPrivacy: RequiredTermsOfPrivacy.checked ?? false,
  };

  if (isPC) {
    forms.joinInflowType = 'PC_WEB';
    forms.inflowType = 'PC';
  } else if (isMobileWeb) {
    forms.joinInflowType = 'MOBILE_WEB';
  } else if (isAos) {
    forms.joinInflowType = 'ANDROID';
  } else if (isIos) {
    forms.joinInflowType = 'IOS';
  }

  if (birthYear && birthMonth && birthDay) {
    const prefixMonth = Number(birthMonth) < 10 ? `0${Number(birthMonth)}` : birthMonth;
    const prefixDay = Number(birthDay) < 10 ? `0${Number(birthDay)}` : birthDay;

    forms.birthYear = birthYear;
    forms.birthDay = `${prefixMonth}${prefixDay}`;
  }

  if (joinExtraInputType !== 'NONE') {
    forms.joinExtraInputType = joinExtraInputType;
    forms.joinExtraInput = joinExtraInput;
  }

  return insertMember(forms);
};

// 추천인 회원 존재여부 조회
export const getRecommendUserInfo = async (body: MemberExistentBody): Promise<boolean> => {
  const { existent } = await readMemberVerifyExistent(body);
  return existent;
};

// 일반 등급 유저 확인
export const verifyNormalUser = (grade: Grade) => grade === Grade.Normal;

// 성인 유저 여부 확인
export const verifyAdultUser = async (accessToken: string) => {
  const { isAdult, expiredAt } = await getUserMetaData(accessToken);
  return isAdult && isBefore(new Date(), parseISO(expiredAt));
};

// 유저 세그먼트 조회
export const getUserSegments = async () => {
  const { segments } = await getUserMetadata();
  return segments;
};

export const getMemberDeviceAgreement = async (): Promise<MemberDeviceAgreement | null> => {
  const deviceId = getDeviceID();
  if (!deviceId) {
    return null;
  }
  const {
    push_agreement: pushAgreement,
    marketing_push_agreement: marketingPushAgreement,
    night_push_agreement: nightPushAgreement,
  } = await fetchDeviceAgreement(deviceId);
  return {
    pushAgreement,
    marketingPushAgreement,
    nightPushAgreement,
  };
};
