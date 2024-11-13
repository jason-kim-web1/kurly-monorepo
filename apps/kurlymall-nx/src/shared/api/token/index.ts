import internalHttpClient from '../../configs/internal-http-client';

export const refreshToken = async (accessToken: string) => {
  // * 토큰 갱신 API /v3/auth/refresh 에 대해 “구버전 / 신규&웹 분기처리”로 계정 정지 상태 응답하도록 대응
  // * 자세한 설명: https://kurly0521.atlassian.net/browse/KMF-4836
  const url = '/v3/auth/refresh?version=2023-10-30';
  const { data } = await internalHttpClient.put(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const refreshedToken = data.data.access_token;

  return refreshedToken;
};
