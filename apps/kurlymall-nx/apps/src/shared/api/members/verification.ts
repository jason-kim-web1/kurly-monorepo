import { UnknownError } from '../../errors';
import httpClient from '../../configs/http-client';

// 성인인증결과 조회
export const getVerificationResult = async (accessToken: string) => {
  const url = '/member/proxy/member-main/v1/member/metadata';
  const config = { headers: { Authorization: `Bearer ${accessToken}` } };
  try {
    const { data } = await httpClient.get(url, config);
    return data.data.adult;
  } catch (error) {
    throw new UnknownError(error);
  }
};
