import httpClient from '../../configs/http-client';

import { UnknownError } from '../../errors';

import {
  MemberBenefitsResponse,
  MemberGradeInfoResponse,
  MemberInfoResponse,
  MemberMyKurlyResponse,
  BaseApiResponse,
  BaseResponse,
  MyKurlyStyleProfile,
} from '../../interfaces';
import { PasswordChangeForm } from '../../../member/change-password/shared/interface';

// 나의컬리스타일 프로필 등록여부 확인
export const fetchMyKurlyStyleProfile = async (): Promise<MyKurlyStyleProfile> => {
  const url = '/member/proxy/profile/v1/my-kurly-style/status';

  try {
    const { data } = await httpClient.get<BaseApiResponse<MyKurlyStyleProfile>>(url);
    return data.data;
  } catch {
    throw new Error('프로필 등록 여부 조회에 실패하였습니다.');
  }
};

// 회원 정보 조회
export const readMemberInfo = async (): Promise<MemberInfoResponse> => {
  const url = '/member/proxy/member-main/v1/member/info/simple';
  try {
    const { data } = await httpClient.get(url);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
};

// 마이컬리 정보 조회 - mykurly
export const readMemberMykurlyInfo = async (): Promise<MemberMyKurlyResponse> => {
  const url = '/member/proxy/member-mykurly/v1/mypages';
  try {
    const { data } = await httpClient.get<BaseResponse<MemberMyKurlyResponse>>(url);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
};

// 회원 적립률 조회
export const readMemberPointBenefit = async (): Promise<MemberBenefitsResponse> => {
  const url = '/v3/members/member-benefits/point';
  try {
    const { data } = await httpClient.get<BaseResponse<MemberBenefitsResponse>>(url);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
};

// 회원 혜택 조회
export const readMemberBenefits = async (): Promise<MemberBenefitsResponse[]> => {
  const url = '/member/proxy/member-mykurly/v1/benefits/members';
  try {
    const { data } = await httpClient.get<BaseResponse<MemberBenefitsResponse[]>>(url);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
};

// 회원 다음달 예상등급 정보
export const readMemberGradeInfo = async (): Promise<MemberGradeInfoResponse> => {
  const url = '/member/proxy/membership/v1/members/level';
  try {
    const { data } = await httpClient.get<BaseApiResponse<MemberGradeInfoResponse>>(url);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
};

export const putMemberPassword = async ({
  originalPassword,
  newPassword,
}: Partial<PasswordChangeForm>): Promise<void> => {
  const endpoint = 'member/proxy/member-main/v1/member/password-change';

  try {
    await httpClient.put(endpoint, {
      originalPassword,
      newPassword,
    });
    return;
  } catch (err) {
    throw new Error(err?.response?.data?.message ?? '일시적인 오류가 발생했습니다. 잠시후 다시 시도해 주세요.');
  }
};
