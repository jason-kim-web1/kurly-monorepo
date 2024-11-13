import nextSession from 'next-session';
import { Session } from 'next-session/lib/types';

import { COOKIE_DOMAIN, SESSION_KEY } from '../src/shared/configs/config';

import { getSession, setSession } from '../src/shared/configs/redis-client';
import { IncomingMessage, ServerResponse } from 'http';

export interface KurlySessionData {
  jwt: string;
  uid: string;
  member?: {
    name: string;
  };
  login_fail_count?: number;
  sess?: {
    m_uuid?: string;
    m_id?: string;
    user_grade_name?: string;
  };
  code?: string;
}

export interface KurlySession extends Session {
  data: KurlySessionData;
}

const secure = process.env.NODE_ENV === 'production';

export const cookie = {
  path: '/',
  httpOnly: false,
  sameSite: secure ? ('none' as const) : false,
  domain: process.env.SESSION_COOKIE_DOMAIN ?? (secure ? COOKIE_DOMAIN : undefined),
  secure,
};

const store = {
  async get(sessionId: string) {
    const session = await getSession(sessionId);
    return {
      cookie,
      data: session,
    };
  },
  async set(sessionId: string, session: KurlySession) {
    return setSession(sessionId, session.data);
  },
  destroy() {
    return Promise.resolve();
  },
};

const options = {
  name: SESSION_KEY,
  store,
  cookie,
};

export const fetchSession = nextSession(options) as (
  req: IncomingMessage & {
    session?: KurlySession;
  },
  res: ServerResponse,
) => Promise<KurlySession>;
