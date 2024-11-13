/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';

import 'given2/setup';
import 'given2';
import { server } from './src/shared/mocks/server';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { TextEncoder, TextDecoder } = require('util');

window.MutationObserver = MutationObserver;

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

declare global {
  const given: {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    <T = any>(key: string, callback: () => T): T;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    [key: string]: any;
  };

  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      calledActions(targets: any[]): R;
    }
  }

  type CustomGiven<T> = {
    <S extends keyof T>(key: S, callback: () => T[S]): T[S];
  } & T;

  function getGiven<T>(initialValue: T): CustomGiven<T>;
}

global.getGiven = function getGiven<T>(initialValue: T): CustomGiven<T> {
  for (const key in initialValue) {
    given(key, () => initialValue[key]);
  }
  return given as CustomGiven<T>;
};

expect.extend({
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  calledActions(sources: any[], targets: any[]) {
    const pass = sources.length === targets.length && sources.every((it, index) => targets[index].match(it));

    const message = () =>
      `Expected: ${this.utils.printExpected(sources.map((it) => it.type))}\n` +
      `Received: ${this.utils.printReceived(targets.map((it) => it().type))}`;

    return { pass, message };
  },
});

beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

/**
 * framer-motion 라이브러리를 사용하는 구현체의 테스트 코드에서
 * Error: Not implemented: window.scrollTo 에러가 발생합니다.
 * 이에 대한 Stub scrollTo 를 설정합니다.
 *
 * 참고: https://github.com/framer/motion/blob/main/packages/framer-motion/jest.setup.tsx
 */
const noop = () => {};
Object.defineProperty(global, 'scrollTo', { value: noop, writable: true });
