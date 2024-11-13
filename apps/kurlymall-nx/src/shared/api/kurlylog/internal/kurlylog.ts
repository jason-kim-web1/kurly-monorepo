import internalHttpClient from '../../../configs/internal-http-client';

export const getInternalKurlylogUserInfo = async (accessToken: string) => {
  const url = '/kurlylog/users/me';

  const {
    data: { data },
  } = await internalHttpClient.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};
