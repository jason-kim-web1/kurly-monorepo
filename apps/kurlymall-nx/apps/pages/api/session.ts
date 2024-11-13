import { nanoid } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';

import { cookie, fetchSession, KurlySession } from '../../libs/session';
import { setSession } from '../../src/shared/configs/redis-client';
import { logger } from '../../src/shared/services';
import { extractAuthentication } from '../../src/shared/utils/token';
import { getGuestToken } from '../../src/server/api';
import { refreshToken } from '../../src/shared/api/token';

const l = logger.child({ api: '/nx/api/session' });

export const responseGuestToken = async (res: NextApiResponse, session: KurlySession | null = null) => {
  try {
    const accessToken = await getGuestToken();
    const responseGuestSession = {
      accessToken,
      uid: nanoid(),
      isGuest: true,
      ...(session?.data?.login_fail_count && {
        loginFailCount: session.data.login_fail_count ?? 0,
      }),
    };

    // session 이 있을경우 (없어도 fetchSession 이후에는 신규 세션 오브젝트가 생김)
    // 해당 세션에 jwt를 redis에 업데이트 합니다.
    if (session) {
      session.cookie = cookie;
      session.data = {
        jwt: accessToken,
        uid: responseGuestSession.uid,
      };
    }
    res.status(200).send(responseGuestSession);
  } catch (e) {
    res.status(500).send({ message: 'Internal server error' });
    l.error(e);
  }
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  let session: null | KurlySession = null;
  try {
    session = await fetchSession(req, res);
  } catch (e) {
    l.info({ session }, JSON.stringify(e));
    await responseGuestToken(res, session);
    return;
  }
  l.info({ session });
  if (!session?.data) {
    await responseGuestToken(res, session);
    return;
  }

  let refreshedJWT = null;
  try {
    refreshedJWT = await refreshToken(session.data.jwt);
  } catch (e) {
    l.info({ session }, JSON.stringify(e));
    await responseGuestToken(res, session);
    return;
  }

  const sessionId = session.id;
  // 회원 여부 상관없이 redis에서 가져온 token을 refresh한번 해서 넘겨준다.
  await setSession(sessionId, {
    ...session.data,
    jwt: refreshedJWT,
  });

  const { isGuest } = extractAuthentication(refreshedJWT);

  if (isGuest) {
    const response = {
      accessToken: refreshedJWT,
      isGuest,
      uid: nanoid(),
      ...(session?.data?.login_fail_count && {
        loginFailCount: session.data.login_fail_count ?? 0,
      }),
    };
    res.status(200).send(response);
    l.info({ session });
    return;
  }

  const response = {
    accessToken: refreshedJWT,
    isGuest: !session.data.member,
    uid: session.data.sess?.m_uuid ?? session.data.uid,
    ...(session.data.code && {
      code: session.data.code,
    }),
    ...(session?.data?.login_fail_count && {
      loginFailCount: session.data.login_fail_count,
    }),
    ...(session.data.sess &&
      session.data.member && {
        userInfo: {
          id: session.data.sess.m_id,
          name: session.data.member.name,
          grade: session.data.sess.user_grade_name,
        },
      }),
  };
  res.status(200).send(response);
  l.info({ response });
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const jwt = req.headers.authorization?.replace('Bearer ', '') || '';
    l.info(jwt);

    const { isGuest } = extractAuthentication(jwt);
    const session = await fetchSession(req, res);
    l.info({ session });
    if (!session.data) {
      session.cookie = cookie;
      session.data = {
        jwt,
        uid: nanoid(),
      };
    } else {
      await setSession(session.id, {
        ...session.data,
        jwt,
      });
    }

    const response = {
      accessToken: jwt,
      isGuest,
      uid: session.data.sess?.m_uuid ?? session.data.uid,
    };
    res.status(200).send(response);
    l.info({ response });
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
    l.error(err);
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    handlePut(req, res);
    return;
  }

  handleGet(req, res);
};
