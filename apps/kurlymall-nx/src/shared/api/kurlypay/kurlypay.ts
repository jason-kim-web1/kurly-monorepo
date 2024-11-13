import httpClient from '../../configs/http-client';

interface KurlypayToken {
  // 인증토큰
  authorizationToken: string;
  // 토큰  만료시각 (yyyyMMddHHmmsssss)
  expireAt: string;
  // sha1으로 암호화된 가맹점ID
  merchantIdentifier: string;
  // sha1으로 암호화된 회원번호
  merchantMemberIdentifier: string;
}

/*
  컬리페이 인증 토큰 생성
  컬리페이 페이지 이동 등 추가 데이터 필요시 사용
 */
export const fetchKurlypayToken = async (): Promise<KurlypayToken> => {
  const url = '/order/v1/kurlypay/authorization';
  const { data } = await httpClient.get<KurlypayToken>(url);
  return data;
};

interface KurlypayAccessToken {
  accessToken: string;

  expiresIn: string;
}

type KurlypayAccessExpiryType =
  // 3분 (default)
  | 'TEMPORARY'
  // 24시간
  | 'PERMANENT';

/**
 * 컬리페이 인증 토큰 생성(신규)
 * https://kurly0521.atlassian.net/wiki/spaces/JGSD/pages/3717661818/access+token+API
 * @param expiryType
 */
export const fetchKurlypayAccessToken = async (
  expiryType: KurlypayAccessExpiryType = 'TEMPORARY',
): Promise<KurlypayAccessToken> => {
  const url = '/order/v1/kurlypay/authorization/access-token';
  const { data } = await httpClient.post<KurlypayAccessToken>(url, {
    expiryType,
  });
  return data;
};
