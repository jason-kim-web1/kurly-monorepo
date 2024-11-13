import { useRef } from 'react';

export const useThrottle = () => {
  const throttlingRef = useRef(false);

  const throttleWithPromise = <T extends (...args: any[]) => Promise<any>>(
    fn: T,
    delay: number,
  ): Promise<ReturnType<T>> => {
    return new Promise((resolve, reject) => {
      if (throttlingRef.current) {
        return;
      }

      throttlingRef.current = true;
      setTimeout(() => {
        throttlingRef.current = false;
      }, delay);

      fn().then(resolve).catch(reject);
    });
  };

  return {
    throttleWithPromise,
  };
};
