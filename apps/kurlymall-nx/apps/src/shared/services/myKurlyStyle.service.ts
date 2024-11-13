import {
  fetchAgreePrivacyPolicy,
  updatePrivacyPolicy,
  fetchMyInfo,
  updateMyKurlyStyle,
  fetchSiteId,
  updateSiteId,
  fetchRecommendProduct,
} from '../api';

import {
  MyKurlyStyle,
  MyKurlyStyleParams,
  PrivacyPolicy,
  PrivacyPolicyParam,
  Profile,
  RecommendProducts,
  SiteIdParams,
} from '../interfaces/MyKurlyStyle';
import { GenderType } from '../interfaces/GenderType';

//회원 프로필 개인정보 제공동의 약관 조회
export const getPrivacyPolicy = (): Promise<PrivacyPolicy> => {
  return fetchAgreePrivacyPolicy();
};

//회원 프로필 개인정보 제공동의
export const putPrivacyPolicy = (state: boolean): Promise<PrivacyPolicyParam> => {
  return updatePrivacyPolicy(state);
};

//내 컬리 스타일 정보 조회
export const getMyInfo = (): Promise<MyKurlyStyle> => {
  return fetchMyInfo();
};

//내 컬리 스타일 저장
export const postMyKurlyStyle = (
  birthYear: number,
  gender: GenderType,
  hasToddler: boolean,
  openProfile: boolean,
): Promise<MyKurlyStyleParams> => {
  return updateMyKurlyStyle(birthYear, gender, hasToddler, openProfile);
};

//회원 사이트 프로필 정보 조회
export const getProfile = (siteId: string): Promise<Profile> => {
  return fetchSiteId(siteId);
};

//회원 사이트 프로필 정보 저장
export const postSiteId = (siteId: string | undefined, segments: string[]): Promise<SiteIdParams> => {
  return updateSiteId(siteId, segments);
};

//프로필 저장 후 상품추천
export const getRecommendProduct = (siteId: string, hasProfile: boolean): Promise<RecommendProducts> => {
  return fetchRecommendProduct(siteId, hasProfile);
};
