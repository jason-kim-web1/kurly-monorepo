import { get } from 'lodash';

import { getCookieParser, NextApiRequestCookies } from 'next/dist/server/api-utils';

import type { IncomingMessage, ServerResponse } from 'http';
import { SESSION_KEY } from '../configs/config';
import { getSession } from '../configs/redis-client';
import { getGuestToken } from '../../server/api';
import { extractAuthentication } from '../utils/token';
import { refreshToken } from '../api/auth/token';

interface GetSessionDataReturnType {
  accessToken: string;
  isGuest: boolean;
}

interface NextServerRequest extends IncomingMessage {
  cookies: NextApiRequestCookies;
}

export const getGuestTokenWithData = async (): Promise<GetSessionDataReturnType> => {
  const guestAccessToken = await getGuestToken();
  return {
    accessToken: guestAccessToken,
    isGuest: true,
  };
};

const assertNotEmptyContext = (req: NextServerRequest, res: ServerResponse) => {
  if (!req || !res) {
    throw Error('세션 정보를 가져올 수 없습니다.');
  }

  return { request: req };
};

const getSessionByNextRequest = async (request: NextServerRequest) => {
  const cookieParser = getCookieParser(request.headers);
  const cookies = cookieParser();
  const sessionId = get(cookies, SESSION_KEY, '');
  return getSession(sessionId);
};

export const getRefreshData = async (accessToken: string) => {
  try {
    const { accessToken: refreshedAccessToken } = await refreshToken(accessToken);
    return {
      refreshedAccessToken,
      isAvailableRefreshToken: true,
    };
  } catch (e) {
    return {
      refreshedAccessToken: '',
      isAvailableRefreshToken: false,
    };
  }
};

export const getServerSideSessionData = async (
  req: NextServerRequest,
  res: ServerResponse,
): Promise<GetSessionDataReturnType> => {
  const { request } = assertNotEmptyContext(req, res);
  const session = await getSessionByNextRequest(request);

  if (!session) {
    return getGuestTokenWithData();
  }

  const accessToken = get(session, 'jwt', '');
  const { isExpired, isGuest } = extractAuthentication(accessToken);

  if (isExpired) {
    const { refreshedAccessToken, isAvailableRefreshToken } = await getRefreshData(accessToken);

    if (!isAvailableRefreshToken) {
      return getGuestTokenWithData();
    }

    return {
      accessToken: refreshedAccessToken,
      isGuest,
    };
  }

  return {
    accessToken,
    isGuest,
  };
};
