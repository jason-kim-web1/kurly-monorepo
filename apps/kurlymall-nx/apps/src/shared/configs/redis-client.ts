// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createClient } from 'redis';
import { decode, encode } from 'iconv-lite';

import { unserialize, serializeTo } from '../services/serialize.service';

import { REDIS_URL, NEXT_PUBLIC_MOCK_ENABLED } from './config';

import { logger } from '../services';
import { millisecondToSec, getMinutes } from '../utils/time';
import { KurlySessionData } from '../../../libs/session';

const sessionId = (id: string) => `PHPREDIS_SESSION:${id}`;

const createRedisClient = () =>
  createClient({
    host: REDIS_URL,
    return_buffers: true,
    retry_strategy(options: { attempt: number; error?: { code: string } }) {
      logger.error(
        {
          attempt: options.attempt,
          code: options.error?.code,
        },
        'Redis reconnecting',
      );
      return Math.min(options.attempt * 100, 3000);
    },
  });

const createMockRedisClient = () =>
  (function () {
    const nop: (err: Error | boolean, value?: Buffer | null) => void = () => {};
    const store: { [key: string]: Buffer | undefined } = {};
    return {
      on: nop,
      get(key: string, cb = nop) {
        cb(false, store[key] || null);
      },
      set(key: string, value: Buffer, cb = nop) {
        store[key] = value;
        cb(false);
      },
      refStore: store,
    };
  })();

const getRedisClient = () => {
  if (NEXT_PUBLIC_MOCK_ENABLED) {
    return createMockRedisClient();
  }
  return createRedisClient();
};

const client = getRedisClient();

client.on('error', (err: Error) => {
  logger.error(err, 'Redis conenct error');
});

export const getSession = (id: string): Promise<KurlySessionData | undefined> =>
  new Promise((resolve, reject) => {
    client.get(sessionId(id), (err: Error, value: Buffer | null) => {
      if (err) {
        reject(err);
        return;
      }
      if (!value) {
        resolve(undefined);
        return;
      }
      try {
        const data = unserialize(decode(value, 'euc-kr'));
        resolve(data);
      } catch {
        resolve(undefined);
      }
    });
  });

export const setSession = (id: string, data: KurlySessionData): Promise<void> =>
  new Promise((resolve, reject) => {
    client.set(
      sessionId(id),
      encode(serializeTo(data), 'euc-kr'),
      'EX',
      millisecondToSec(getMinutes(60)),
      (err: Error) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      },
    );
  });
