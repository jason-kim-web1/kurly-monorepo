import { noop, chain, isEqual } from 'lodash';

import { isNotFunction } from './lodash-extends';

// NOTE: 커스텀 Promise 객체까지 지원할건지 논의 필요
export const isPromise = <T>(a: Promise<T> | T): a is Promise<T> => {
  return a instanceof Promise;
};

export const ignoreError = <T>(f: () => T) => {
  try {
    if (isNotFunction(f)) {
      return;
    }
    const res = f();
    if (isPromise(res)) {
      res.catch(noop);
    }
  } catch (error) {
    noop();
  }
};

// NOTE: 상수를 검증하는 함수
export const validateConstantsValue = (constants: Record<string, unknown>, value: unknown) =>
  chain(constants)
    .entries()
    .map((e) => {
      const [, v] = e;
      return isEqual(v, value);
    })
    .some();
