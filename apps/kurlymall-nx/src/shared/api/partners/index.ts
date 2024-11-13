import httpClient from '../../configs/http-client';

type PartnerName = 'loreal';

export type PrivacyPolicyStatus = 'AGREE' | 'DISAGREE' | 'EXPIRED';

export const PrivacyPolicyStatusMap: Record<PrivacyPolicyStatus, PrivacyPolicyStatus> = {
  AGREE: 'AGREE',
  DISAGREE: 'DISAGREE',
  EXPIRED: 'EXPIRED',
};

interface PartnerMemberInfo {
  memberNo: number;
  userKey: string;
  status: PrivacyPolicyStatus;
  agreedAt: string;
  provider: PartnerProvider;
}

interface PartnerProvider {
  name: string;
  identifier: string;
}

/**
 * 회원 개인정보 제공동의 동의 API
 * http://gateway.cloud.dev.kurly.services/member-partner/docs/index.html#_%ED%9A%8C%EC%9B%90_%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4_%EC%A0%9C%EA%B3%B5%EB%8F%99%EC%9D%98_%EB%8F%99%EC%9D%98_api
 */
export const postPartnerMemberPrivacyPolicyAgree = async (partnerName: PartnerName): Promise<boolean> => {
  try {
    await httpClient.post<PartnerMemberInfo>(`/member-partner/v1/members/${partnerName}/privacy-policy/agree`);
    return true;
  } catch (error) {
    return false;
  }
};

interface PartnerBrandMapping {
  memberNo: string;
  userKey: string;
  status: PrivacyPolicyStatus;
  agreedAt: string;
  brands: PartnerBrandItem[];
}

interface PartnerBrandItem {
  name: string;
  identifier: string;
  mappingKey: string;
  createdAt: string;
}
/**
 * 회원 브랜드 연동 정보 조회 API
 * http://gateway.cloud.dev.kurly.services/member-partner/docs/index.html#_%ED%9A%8C%EC%9B%90_%EB%B8%8C%EB%9E%9C%EB%93%9C_%EC%97%B0%EB%8F%99_%EC%A0%95%EB%B3%B4_%EC%A1%B0%ED%9A%8C_api
 */
export const fetchPartnerMemberBrandMapping = async (partnerName: PartnerName): Promise<PartnerBrandMapping> => {
  const { data } = await httpClient.get<PartnerBrandMapping>(`/member-partner/v1/members/${partnerName}/brand/mapping`);
  return data;
};

export interface PartnerPrivacyPolicy {
  recipient: string;
  purpose: string;
  items: string;
  period: string;
  description: string;
  startedAt: string;
}

/**
 * 프로바이더 개인정보 제공동의서 정보 조회 API
 * http://gateway.cloud.dev.kurly.services/member-partner/docs/index.html#_%ED%94%84%EB%A1%9C%EB%B0%94%EC%9D%B4%EB%8D%94_%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4_%EC%A0%9C%EA%B3%B5%EB%8F%99%EC%9D%98%EC%84%9C_%EC%A0%95%EB%B3%B4_%EC%A1%B0%ED%9A%8C_api
 */
export const fetchPartnerPrivacyPolicy = async (partnerName: PartnerName): Promise<PartnerPrivacyPolicy> => {
  const { data } = await httpClient.get<PartnerPrivacyPolicy>(
    `/member-partner/v1/providers/${partnerName}/privacy-policy`,
  );
  return data;
};

export interface PublicPartnerBrandItem {
  name: string;
  identifier: string;
  mappingKey: string;
  meta: PublicPartnerBrandItemMeta;
}

export type PublicPartnerBrandList = PublicPartnerBrandItem[];

export interface PublicPartnerBrandItemMeta {
  imageUrl: string;
}

/**
 * 프로바이더 브랜드 정보 조회 API
 * http://gateway.cloud.dev.kurly.services/member-partner/docs/index.html#_%ED%94%84%EB%A1%9C%EB%B0%94%EC%9D%B4%EB%8D%94_%EB%B8%8C%EB%9E%9C%EB%93%9C_%EC%A0%95%EB%B3%B4_%EC%A1%B0%ED%9A%8C_api
 */
export const fetchPartnerBrandList = async (partnerName: PartnerName): Promise<PublicPartnerBrandList> => {
  const { data } = await httpClient.get<PublicPartnerBrandList>(
    `/member-partner/v1/providers/${partnerName}/brand/list`,
  );
  return data;
};
