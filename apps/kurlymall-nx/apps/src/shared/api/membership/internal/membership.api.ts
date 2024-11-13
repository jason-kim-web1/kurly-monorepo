import internalHttpClient from '../../../configs/internal-http-client';

export const getInternalSubscriptionMembers = async (accessToken: string) => {
  const url = '/member/proxy/membership/v1/subscriptions/members';

  const { data } = await internalHttpClient.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};
