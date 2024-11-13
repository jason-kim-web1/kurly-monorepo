import {
  fetchLorealBrandList,
  fetchLorealPrivacyPolicy,
  postLorealMemberPrivacyPolicyAgree,
  fetchLorealMemberBrandMapping,
} from '../api/partners/loreal';

// 이용약관 내용 조회
export const getLorealPrivacyPolicy = () => fetchLorealPrivacyPolicy();

// 브랜드 리스트 조회
export const getLorealBrandList = () => fetchLorealBrandList();

// 회원 개인정보 제공동의 동의 API
export const lorealMemberPrivacyPolicyAgree = () => postLorealMemberPrivacyPolicyAgree();

// 회원 브랜드 연동 정보 조회 API
export const getLorealMemberBrandMapping = () => fetchLorealMemberBrandMapping();
