import { RefObject, useState } from 'react';

import { debounce } from 'lodash';

import { useIsomorphicLayoutEffect } from '../../hooks';

const SYNC_DELAY = 100;

export default function useSyncTransitionWrapperHeight(
  baseRef: RefObject<HTMLDivElement>,
  syncRef: RefObject<HTMLDivElement>,
) {
  const [autoHeight, setAutoHeight] = useState(true);

  useIsomorphicLayoutEffect(() => {
    if (!autoHeight) return;

    const baseEl = baseRef.current;
    const syncEl = syncRef.current;

    if (!(baseEl && 'ResizeObserver' in window && syncEl)) return;

    const resizeHandler = debounce((entries: ResizeObserverEntry[]) => {
      entries.forEach((o) => {
        if (o.target === baseEl) {
          syncEl.style.height = `${o.target.clientHeight}px`;
        }
      });
    }, SYNC_DELAY);

    const observer = new ResizeObserver(resizeHandler);

    observer.observe(baseEl);

    return () => {
      resizeHandler.cancel();
      observer.unobserve(baseEl);
    };
  }, [baseRef, syncRef, autoHeight]);

  return {
    setAutoHeight,
  };
}
