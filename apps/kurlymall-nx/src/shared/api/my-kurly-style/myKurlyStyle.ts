import httpClient from '../../configs/http-client';

import { BaseApiResponse, BaseResponse } from '../../interfaces';
import {
  MyKurlyStyle,
  MyKurlyStyleParams,
  PrivacyPolicy,
  PrivacyPolicyParam,
  Profile,
  RecommendProducts,
  SiteIdParams,
} from '../../interfaces/MyKurlyStyle';
import { GenderType } from '../../interfaces/GenderType';

//회원 프로필 개인정보 제공동의 조회
export const fetchAgreePrivacyPolicy = async (): Promise<PrivacyPolicy> => {
  const url = '/member/proxy/profile/v1/public/privacy-policy';

  try {
    const { data } = await httpClient.get<BaseApiResponse<PrivacyPolicy>>(url);
    return data.data;
  } catch {
    throw new Error('약관 조회에 실패하였습니다.');
  }
};

//회원 프로필 개인정보 제공동의 업데이트
export const updatePrivacyPolicy = async (agreePrivacyPolicy: boolean): Promise<PrivacyPolicyParam> => {
  const url = '/member/proxy/profile/v1/privacy-policy/agreement';

  try {
    const { data } = await httpClient.put<PrivacyPolicyParam>(url, {
      agreePrivacyPolicy,
    });
    return data;
  } catch {
    throw new Error('이용약관 업데이트에 실패하였습니다.');
  }
};

//내 컬리 스타일 정보 조회
export const fetchMyInfo = async (): Promise<MyKurlyStyle> => {
  const url = '/member/proxy/profile/v1/my-kurly-style';

  try {
    const { data } = await httpClient.get<BaseApiResponse<MyKurlyStyle>>(url);
    return data.data;
  } catch {
    throw new Error('정보 조회에 실패하였습니다.');
  }
};

//내 컬리 스타일 저장
export const updateMyKurlyStyle = async (
  birthYear: number,
  gender: GenderType,
  hasToddler: boolean,
  openProfile: boolean,
): Promise<MyKurlyStyleParams> => {
  const url = '/member/proxy/profile/v1/my-kurly-style';

  try {
    const { data } = await httpClient.post<MyKurlyStyleParams>(url, {
      birthYear,
      gender,
      hasToddler,
      openProfile,
    });

    return data;
  } catch {
    throw new Error('저장에 실패하였습니다.');
  }
};

//회원 사이트 프로필 정보 조회
export const fetchSiteId = async (siteId: string): Promise<Profile> => {
  const url = `/member/proxy/profile/v1/sites/${siteId}`;

  try {
    const { data } = await httpClient.get<BaseApiResponse<Profile>>(url);
    return data.data;
  } catch {
    throw new Error('정보 조회에 실패하였습니다.');
  }
};

//회원 사이트 프로필 정보 저장
export const updateSiteId = async (siteId: string | undefined, segments: string[]): Promise<SiteIdParams> => {
  const url = `/member/proxy/profile/v1/sites/${siteId}`;

  try {
    const { data } = await httpClient.post<SiteIdParams>(url, {
      segments,
    });
    return data;
  } catch {
    throw new Error('저장에 실패하였습니다.');
  }
};

//프로필 저장 후 상품추천
export const fetchRecommendProduct = async (siteId: string, hasProfile: boolean): Promise<RecommendProducts> => {
  const id = hasProfile ? `sites/${siteId}` : 'my-kurly-style';
  const url = `/member/proxy/profile/v1/recommend-product/${id}`;

  try {
    const { data } = await httpClient.get<BaseResponse<RecommendProducts>>(url);
    return data.data;
  } catch {
    throw new Error('상품추천에 실패하였습니다.');
  }
};
