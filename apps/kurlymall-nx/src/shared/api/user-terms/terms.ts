import type { UserTerms, UserTermsType } from '../../interfaces/UserTerms';
import type { BaseResponse } from '../../interfaces';
import { getFile } from '../common';
import { UnknownError } from '../../errors';
import { RESOURCE_URL, isProduction } from '../../configs/config';
import { MemberPartners } from '../../interfaces/UserTerms';
import httpClient from '../../configs/http-client';

interface UserTermsResponse {
  title: string;
  majorVersion: number;
  minorVersion: number;
  url: string;
}

interface UserTermsDetailsResponse {
  title: string;
  editor: string;
  editDate: string;
  content: string;
}

const USER_TERMS_URL: Record<UserTermsType, string> = {
  agreement: `${RESOURCE_URL}/json/terms/agreement/${isProduction() ? 'meta' : 'meta_dev'}.json`,
  privacyPolicy: `${RESOURCE_URL}/json/terms/privacy-policy/${isProduction() ? 'meta' : 'meta_dev'}.json`,
} as const;

const USER_TERMS_DETAIL_URL: Record<UserTermsType, string> = {
  agreement: `${RESOURCE_URL}/json/terms/agreement/`,
  privacyPolicy: `${RESOURCE_URL}/json/terms/privacy-policy/`,
} as const;

export const fetchUserTerms = async (terms: UserTermsType): Promise<UserTerms> => {
  const url = USER_TERMS_URL[terms];
  try {
    const { data } = await getFile<BaseResponse<UserTermsResponse[]>>(url);
    return data;
  } catch (e) {
    throw new UnknownError(e);
  }
};

export const fetchEachUserTerms = async ({
  terms,
  majorVersion,
  minorVersion,
}: {
  terms: UserTermsType;
  majorVersion: number;
  minorVersion: number;
}): Promise<UserTermsDetailsResponse> => {
  const url = USER_TERMS_DETAIL_URL[terms] + `${majorVersion}/${minorVersion}.json`;
  try {
    const data = await getFile<UserTermsDetailsResponse>(url);
    return data;
  } catch (e) {
    throw new UnknownError(e);
  }
};

export const fetchThirdPartyTerms = async (): Promise<MemberPartners[]> => {
  const url = '/member-partner/v1/stores/list';
  try {
    const { data } = await httpClient.get<MemberPartners[]>(url);
    return data;
  } catch (e) {
    throw new UnknownError(e);
  }
};
