import { nanoid } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';

import { getSession, setSession } from '../../src/shared/configs/redis-client';
import { SESSION_KEY } from '../../src/shared/configs/config';
import { logger } from '../../src/shared/services';
import { extractAuthentication } from '../../src/shared/utils/token';
import { responseGuestToken } from './session';
import { KurlySessionData } from '../../libs/session';
import { refreshToken } from '../../src/shared/api/token';

const l = logger.child({ api: '/nx/api/refresh' });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { authorization } = req.headers;
  const requestData = { sessionKey: req.cookies[SESSION_KEY], authorization };

  if (!req.cookies[SESSION_KEY] || !authorization) {
    l.info({ requestData });
    await responseGuestToken(res);
    return;
  }

  let sessionData: KurlySessionData | null = null;
  try {
    sessionData = (await getSession(req.cookies[SESSION_KEY])) || null;
  } catch (e) {
    l.info({ requestData }, JSON.stringify(e));
    await responseGuestToken(res);
    return;
  }

  if (!sessionData) {
    l.info({ requestData });
    await responseGuestToken(res);
    return;
  }

  let refreshedJWT = '';
  try {
    refreshedJWT = await refreshToken(authorization.replace('Bearer ', ''));

    // 회원 여부 상관없이 redis에서 가져온 token을 refresh한번 해서 넘겨준다.
    await setSession(req.cookies[SESSION_KEY], {
      ...sessionData,
      jwt: refreshedJWT,
    });

    const { isGuest } = extractAuthentication(refreshedJWT);

    if (isGuest) {
      const response = {
        accessToken: refreshedJWT,
        isGuest,
        uid: nanoid(),
      };
      res.status(200).send(response);
      l.info({ requestData, response });
      return;
    }
  } catch (e) {
    l.info({ requestData }, JSON.stringify(e));
    await responseGuestToken(res);
    return;
  }

  const response = {
    accessToken: refreshedJWT,
    isGuest: !sessionData.member,
    uid: sessionData.sess?.m_uuid ?? sessionData.uid,
  };
  res.status(200).send(response);
  l.info({ requestData, response });
};
