import { useQuery, useMutation } from '@tanstack/react-query';
import { size } from 'lodash';

import { STALE_TIME } from '../constants';

import { LOREAL_BRAND_LIST, LOREAL_MEMBER_BRAND_MAPPING, LOREAL_TERMS_DETAIL } from '../constants/queryKey';
import {
  getLorealBrandList,
  getLorealPrivacyPolicy,
  lorealMemberPrivacyPolicyAgree,
  getLorealMemberBrandMapping,
} from '../../../shared/services/loreal.service';
import { PartnerPrivacyPolicy, PrivacyPolicyStatusMap } from '../../../shared/api/partners';
import { parseDate } from '../utils/parseDate';

//이용약관 내용 조회
export const useTermsDetail = () => {
  const queryResult = useQuery(LOREAL_TERMS_DETAIL, getLorealPrivacyPolicy, {
    staleTime: STALE_TIME,
    refetchOnWindowFocus: true,
  });
  const { data } = queryResult;
  const termsDetail: PartnerPrivacyPolicy = data || {
    recipient: '',
    purpose: '',
    items: '',
    period: '',
    startedAt: '',
    description: '',
  };
  return {
    ...queryResult,
    termsDetail,
  };
};

//브랜드 리스트 조회
export const useBrandList = () => {
  const queryResult = useQuery(LOREAL_BRAND_LIST, getLorealBrandList, { staleTime: STALE_TIME });
  const { data } = queryResult;
  const brandList = data || [];
  return {
    ...queryResult,
    brandList,
    brandListCount: size(brandList),
  };
};

// 제 3자 개인정보 동의
export const useLorealMemberPrivacyPolicyMutation = () => {
  return useMutation(lorealMemberPrivacyPolicyAgree);
};

// 회원 - 브랜드 매핑정보 조회
export const useLorealMemberBrandMapping = (enabled: boolean) => {
  const queryResult = useQuery(LOREAL_MEMBER_BRAND_MAPPING, getLorealMemberBrandMapping, {
    enabled,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: true,
  });
  const { data } = queryResult;
  const currentIntegratedBrandList = data?.brands || [];
  const membershipStatus = data?.status || PrivacyPolicyStatusMap.DISAGREE;
  const agreedAt = data?.agreedAt;
  const formattedAgreedAt = parseDate(agreedAt || '');
  const membershipUserKey = data?.userKey || '';
  return {
    ...queryResult,
    currentIntegratedBrandList,
    currentIntegratedBrandListCount: size(currentIntegratedBrandList),
    membershipStatus,
    agreedAt,
    formattedAgreedAt,
    membershipUserKey,
  };
};
