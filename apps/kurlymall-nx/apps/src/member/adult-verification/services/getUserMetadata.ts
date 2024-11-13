import { AxiosInstance } from 'axios';

import httpClient from '../../../shared/configs/http-client';

interface IUserMetaData {
  seg: string[];
  adult: {
    adult_member_name: string;
    is_adult: boolean;
    verified_at: string;
    expired_at: string;
  };
}

export async function fetchUserMetadata(axios: AxiosInstance) {
  const url = '/member/proxy/member-main/v1/member/metadata';

  const { data } = await axios.get<{
    data: IUserMetaData;
  }>(url);
  const { adult, seg } = data.data;
  return {
    segments: seg,
    isAdult: adult.is_adult,
    verifiedAt: adult.verified_at,
    expiredAt: adult.expired_at,
  };
}

export default async function getUserMetadata() {
  return fetchUserMetadata(httpClient);
}
