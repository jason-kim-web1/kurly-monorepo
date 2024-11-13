import { useRef } from 'react';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export function useConditionalInterval(callback: () => void, delay: number, isStop: boolean) {
  const savedCallback = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useIsomorphicLayoutEffect(() => {
    if (isStop || delay <= 0 || !savedCallback.current) {
      return;
    }

    const id = setInterval(savedCallback.current, delay);
    return () => clearInterval(id);
  }, [delay, isStop]);
}
