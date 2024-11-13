import {
  fetchPartnerBrandList,
  fetchPartnerPrivacyPolicy,
  postPartnerMemberPrivacyPolicyAgree,
  fetchPartnerMemberBrandMapping,
} from './index';

const BRAND_NAME = 'loreal';

//이용약관 내용 조회
export const fetchLorealPrivacyPolicy = () => fetchPartnerPrivacyPolicy(BRAND_NAME);

//브랜드 리스트 조회
export const fetchLorealBrandList = () => fetchPartnerBrandList(BRAND_NAME);

// 프로바이더
export const postLorealMemberPrivacyPolicyAgree = () => postPartnerMemberPrivacyPolicyAgree(BRAND_NAME);

// 회원 브랜드 연동 정보 조회 API
export const fetchLorealMemberBrandMapping = () => fetchPartnerMemberBrandMapping(BRAND_NAME);
