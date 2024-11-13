import internalHttpClient from '../../../configs/internal-http-client';
import { BaseResponse, MemberInfoResponse } from '../../../interfaces';

export const getInternalMemberInfo = async (accessToken: string) => {
  const url = '/member/proxy/member-main/v1/member/info/simple';

  const {
    data: { data },
  } = await internalHttpClient.get<BaseResponse<MemberInfoResponse>>(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};
