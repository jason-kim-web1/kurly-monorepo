import { AxiosError } from 'axios';

import { isNull } from 'lodash';

import {
  MembershipBenefitType,
  CancelReason,
  PaymentStatus,
  SubscriptionMember,
  UnusedFreeTickets,
  CouponMetaType,
  PaymentType,
} from '../../../mypage/membership/shared/type';
import httpClient from '../../configs/http-client';
import { parseDate } from '../../utils/date';
import { convertToAllKoreanNumber } from '../../services';
import {
  BenefitType,
  CouponType,
  SubscriptionStatus,
  BenefitItem,
  MyMembershipBenefitsResponse,
  PaymentUnsubscribeDetailResponse,
  PaymentUnsubscribeRequest,
  PaymentUnsubscribeResponse,
  MemberSessionRequest,
  PaymentUnsubscribeReserveRequest,
  SubscriptionPartnerIdentifier,
  AffiliateBenefitResponse,
  CouponPackResponse,
  CouponMetaList,
  BenefitMetaList,
  BenefitOptionIdResponse,
  MyBenefitUpdate,
  MyBenefitResponse,
} from './api.type';
import { UnknownError } from '../../errors';
import { KURLY_PAY, NAVER_PAY } from '../../../mypage/membership/shared/constants';
import { isProduction, RESOURCE_URL } from '../../configs/config';
import { getFile } from '../common';
import { MemberBenefitUpdate } from '../events/member/benefit.api';

const prefix = '/member/proxy/membership/v1';

const convertToBenefitArray = (benefitInfo: BenefitItem[]) =>
  benefitInfo.map(({ benefitType, point, coupon }) => {
    if (benefitType === BenefitType.POINT) {
      return {
        type: MembershipBenefitType.POINT,
        title: '적립금',
        value: convertToAllKoreanNumber(point?.value || 0),
        isUsed: false,
        condition: '바로 사용 가능',
      };
    }
    return {
      type: MembershipBenefitType.COUPON,
      ...(coupon?.couponType === CouponType.FREE_SHIPPING
        ? {
            value: '무료 배송',
          }
        : {
            value:
              coupon?.couponType === CouponType.PRICE_DISCOUNT
                ? convertToAllKoreanNumber(coupon?.value)
                : `${coupon?.value}% 할인`,
          }),
      isUsed: coupon?.used || false,
      condition: coupon?.description || '',
      couponType: coupon?.couponType,
    };
  });

const parseToUnusedFreeTickets = (unusedFreeTickets: UnusedFreeTickets[]) => {
  if (unusedFreeTickets) {
    return unusedFreeTickets.map(({ id, name, createdAt, expiredAt, status }) => {
      return {
        id,
        name,
        createdAt: parseDate(createdAt),
        expiredAt: parseDate(expiredAt),
        status,
      };
    });
  }

  return unusedFreeTickets;
};

const convertToConponType = (benefitMetaList: BenefitMetaList[]) => {
  if (benefitMetaList) {
    return benefitMetaList.map(({ type, description, value, common }, index) => {
      if (type === CouponMetaType.PERCENT_DISCOUNT) {
        return {
          id: `${type}${index}`,
          type,
          description,
          common,
          value: `${value}% 할인 쿠폰`,
        };
      }
      if (type === CouponMetaType.FREE_SHIPPING) {
        return {
          id: `${type}${index}`,
          type,
          description,
          common,
          value: `무료배송 쿠폰`,
        };
      }
      return {
        id: `${type}${index}`,
        type,
        description,
        common,
        value: `${convertToAllKoreanNumber(value)} 쿠폰`,
      };
    });
  }

  return benefitMetaList;
};

const convertToCouponMetaList = (data: CouponMetaList[]) => {
  if (data) {
    return data.map(
      ({ benefitOptionId, benefitOptionName, benefitOptionDescription, benefitOptionCode, benefitMetaList }) => {
        return {
          benefitOptionId,
          benefitOptionName,
          benefitOptionDescription,
          benefitOptionCode,
          benefitMetaList: convertToConponType(benefitMetaList),
        };
      },
    );
  }
  return data;
};

const convertToPaymentType = (type: PaymentType, method: string) => {
  if (type === PaymentType.KURLY_PAY) {
    return `${KURLY_PAY}(${method})`;
  }
  if (type === PaymentType.NAVER_PAY) {
    return NAVER_PAY;
  }
  return method;
};

export const getSubscriptionMembers = async (): Promise<SubscriptionMember> => {
  try {
    const { data } = await httpClient.get(`${prefix}/subscriptions/members`);

    const {
      agreeSMS,
      subscriptionStatus,
      startSubscriptionDate,
      endSubscriptionDate,
      cancelReserved,
      hasAffiliateBenefits,
      subscriptionProduct,
      freeTicketInfo,
      banner,
    } = data;

    return {
      agreeSMS,
      isSubscribed: subscriptionStatus === SubscriptionStatus.SUBSCRIBE,
      cancelReserved,
      hasAffiliateBenefits,
      partner: {
        isKurly: subscriptionProduct?.subscriptionPartner?.identifier === SubscriptionPartnerIdentifier.KURLY,
        isSKT: subscriptionProduct?.subscriptionPartner?.identifier === SubscriptionPartnerIdentifier.SKT,
        name: subscriptionProduct?.subscriptionPartner?.name,
      },
      startSubscriptionDate: parseDate(startSubscriptionDate),
      endSubscriptionDate: parseDate(endSubscriptionDate),
      isUsingFreeTicket: freeTicketInfo?.usingFreeTicket,
      freeTicket: freeTicketInfo?.freeTicket,
      bannerMessage: {
        title: banner?.title,
        description: banner?.description,
      },
    };
  } catch (err) {
    throw new UnknownError(err);
  }
};

export const getSubscriptionMembersDetail = async (): Promise<MyMembershipBenefitsResponse> => {
  try {
    const { data } = await httpClient.get(`${prefix}/subscriptions/members/detail`);

    const { member, settlement, benefit, subscriptionProduct, affiliateInfo, freeTicketInfo } = data;

    return {
      isSubscribed: member.status === SubscriptionStatus.SUBSCRIBE,
      isCancelReserved: member.cancelReserved,
      canCancelNow: true,
      partner: {
        isKurly: subscriptionProduct?.subscriptionPartner?.identifier === SubscriptionPartnerIdentifier.KURLY,
        isSKT: subscriptionProduct?.subscriptionPartner?.identifier === SubscriptionPartnerIdentifier.SKT,
        name: subscriptionProduct?.subscriptionPartner?.name,
      },
      startBenefitDate: parseDate(benefit.startBenefitDate),
      endBenefitDate: parseDate(benefit.endBenefitDate),
      benefits: convertToBenefitArray(benefit.benefitInfo),
      providedBenefitOptionInfo: benefit.providedBenefitOptionInfo
        ? {
            benefitOptionId: benefit.providedBenefitOptionInfo.benefitOptionName,
            benefitOptionName: benefit.providedBenefitOptionInfo.benefitOptionName,
            benefitOptionDescription: benefit.providedBenefitOptionInfo.benefitOptionDescription,
          }
        : benefit.providedBenefitOptionInfo,
      selectedBenefitOptionInfo: benefit.selectedBenefitOptionInfo
        ? {
            benefitOptionId: benefit.selectedBenefitOptionInfo.benefitOptionId,
            benefitOptionName: benefit.selectedBenefitOptionInfo.benefitOptionName,
            benefitOptionDescription: benefit.selectedBenefitOptionInfo.benefitOptionDescription,
          }
        : benefit.selectedBenefitOptionInfo,
      payment: {
        status: settlement.status,
        nextDate: parseDate(settlement.nextSettlementDate),
        price: isNull(settlement.amount) ? null : convertToAllKoreanNumber(settlement.amount),
        type: settlement.type,
        method: {
          name: convertToPaymentType(settlement.type, settlement.method),
          number: settlement.description,
        },
      },
      startAffiliateDate: parseDate(affiliateInfo.startDate),
      endAffiliateDate: parseDate(affiliateInfo.endDate),
      affiliateBenefits: affiliateInfo.affiliateBenefits,
      usingFreeTicket: freeTicketInfo?.usingFreeTicket
        ? {
            ...freeTicketInfo.usingFreeTicket,
            startedAt: parseDate(freeTicketInfo?.usingFreeTicket?.startedAt),
            endedAt: parseDate(freeTicketInfo?.usingFreeTicket?.endedAt),
          }
        : freeTicketInfo?.usingFreeTicket,
      unusedFreeTickets: parseToUnusedFreeTickets(freeTicketInfo?.unusedFreeTickets),
    };
  } catch (err) {
    if ((err as AxiosError).response?.status === 404) {
      return {
        isSubscribed: false,
        isCancelReserved: false,
        canCancelNow: true,
        partner: {
          isKurly: false,
          isSKT: false,
          name: '',
        },
        startBenefitDate: '',
        endBenefitDate: '',
        benefits: [],
        providedBenefitOptionInfo: {
          benefitOptionId: 0,
          benefitOptionName: '',
          benefitOptionDescription: '',
        },
        selectedBenefitOptionInfo: {
          benefitOptionId: 0,
          benefitOptionName: '',
          benefitOptionDescription: '',
        },
        payment: {
          status: PaymentStatus.COMPLETED,
          nextDate: '',
          price: '',
          type: PaymentType.CREDIT,
          method: {
            name: '',
            number: '',
          },
        },
        startAffiliateDate: '',
        endAffiliateDate: '',
        affiliateBenefits: [],
        usingFreeTicket: {
          id: 0,
          name: '',
          startedAt: '',
          endedAt: '',
          status: '',
        },
        unusedFreeTickets: [],
      };
    }

    console.error(err);

    throw err;
  }
};

export const getSubscriptionCancelReasons = async (): Promise<CancelReason[]> => {
  try {
    const { data } = await httpClient.get(`${prefix}/subscriptions/cancel-reason`);

    return data;
  } catch (err) {
    console.error(err);

    throw err;
  }
};

export const getPaymentUnsubscribeDetail = async (): Promise<PaymentUnsubscribeDetailResponse> => {
  try {
    const { data } = await httpClient.get(`${prefix}/subscriptions/payments/products/unsubscribe/detail`);
    const {
      benefit: { benefitInfo, endBenefitDate },
      cancelable,
      usingFreeTicket,
      affiliateBenefits,
    } = data || {};

    return {
      benefits: convertToBenefitArray(benefitInfo),
      endBenefitDate: parseDate(endBenefitDate),
      cancelable,
      usingFreeTicket: usingFreeTicket
        ? {
            id: usingFreeTicket?.id,
            name: usingFreeTicket?.name,
            startedAt: parseDate(usingFreeTicket?.startedAt),
            endedAt: parseDate(usingFreeTicket?.endedAt),
            status: usingFreeTicket?.status,
          }
        : usingFreeTicket,
      affiliateBenefits,
    };
  } catch (err) {
    console.error(err);

    throw err;
  }
};

export const putPaymentUnsubscribeReserve = async ({
  id,
  reason,
  isCancelReserved,
}: PaymentUnsubscribeReserveRequest): Promise<PaymentUnsubscribeResponse> => {
  try {
    const response = await httpClient.put(`${prefix}/subscriptions/payments/products/unsubscribe/reserve`, {
      cancelReasonId: id,
      opinion: reason,
      isCancelReserved,
    });

    return response?.data;
  } catch (err) {
    console.error(err);

    throw err;
  }
};

export const postPaymentUnsubscribe = async ({
  id,
  reason,
}: PaymentUnsubscribeRequest): Promise<PaymentUnsubscribeResponse> => {
  try {
    const response = await httpClient.post(`${prefix}/subscriptions/payments/products/unsubscribe`, {
      cancelReasonId: id,
      opinion: reason,
    });

    return response?.data;
  } catch (err) {
    console.error(err);

    throw err;
  }
};

export const postMemberSessionCreate = async ({ marketingAgreement }: MemberSessionRequest) => {
  try {
    const response = await httpClient.post(`${prefix}/subscriptions/members/session-create`, {
      marketingAgreement,
    });

    return response?.data;
  } catch (err) {
    console.error(err);

    throw err;
  }
};

// 외부 제휴 혜택
export const fetchAffiliateBenefit = async (): Promise<AffiliateBenefitResponse[]> => {
  const url = `${prefix}/affiliate-benefit/coupons`;
  try {
    const { data } = await httpClient.get(url);
    return data;
  } catch (e) {
    throw new UnknownError(e);
  }
};

// 쿠폰팩
export const fetchCouponPack = async (): Promise<CouponPackResponse> => {
  const url = `${prefix}/subscriptions/benefits/meta`;
  try {
    const { data } = await httpClient.get(url);

    const { selectedBenefitOptionId, providedBenefitOptionId, benefitOptionCouponMetaList } = data || {};
    return {
      selectedBenefitOptionId,
      providedBenefitOptionId,
      benefitOptionCouponMetaList: benefitOptionCouponMetaList
        ? convertToCouponMetaList(benefitOptionCouponMetaList)
        : benefitOptionCouponMetaList,
    };
  } catch (err) {
    console.error(err);

    throw err;
  }
};

export const putCouponPackOptionId = async ({
  benefitOptionId,
}: BenefitOptionIdResponse): Promise<BenefitOptionIdResponse> => {
  try {
    const response = await httpClient.put(`${prefix}/subscriptions/benefits/options`, {
      benefitOptionId,
    });

    return response?.data;
  } catch (err) {
    console.error(err);

    throw err;
  }
};

// 혜택가 안내 데이터 - 추후 개인화 데이터 개발 완료 시 삭제될 예정
export const fetchMyBenefitUpdate = async (): Promise<MyBenefitUpdate> => {
  const url = `${RESOURCE_URL}/json/my-members/${isProduction() ? 'meta' : 'meta_dev'}.json`;
  try {
    return await getFile<MemberBenefitUpdate>(url);
  } catch (e) {
    throw new UnknownError(e);
  }
};

export const fetchMyBenefitInfo = async (version: string): Promise<MyBenefitResponse> => {
  const url = `${RESOURCE_URL}/json/my-members/${version}.json`;
  try {
    return await getFile<MyBenefitResponse>(url);
  } catch (e) {
    throw new UnknownError(e);
  }
};
