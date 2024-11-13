import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';

import * as Yup from 'yup';

import { isEqual } from 'lodash';

import { removeQueryString } from '../utils/url';

interface Coordinates {
  x: number;
  y: number;
}

const coordinatesSchema: Yup.SchemaOf<Coordinates> = Yup.object({
  x: Yup.number().required(),
  y: Yup.number().required(),
});

const storageMapper = {
  parse: <T extends object>(value: string | null) => {
    if (!value) return null;

    try {
      const parsedValue = JSON.parse(value) as T;
      const isValid = coordinatesSchema.validateSync(parsedValue);

      if (isValid) {
        return parsedValue;
      }

      return null;
    } catch (e) {
      return null;
    }
  },
  serialize: <T extends object>(value: T | null) => {
    try {
      return JSON.stringify(value);
    } catch (e) {
      return null;
    }
  },
};

const usePageWindowScroll = (enabled = true) => {
  const router = useRouter();
  const uniqueId = useMemo(() => `page-scroll-${removeQueryString(router.asPath)}`, [router.asPath]);

  const windowScrollRequestRef = useRef<number>();

  const saveScrollPoint = useCallback(
    (coordinates: Coordinates) => {
      const value = storageMapper.serialize(coordinates);
      if (value) {
        sessionStorage.setItem(uniqueId, value);
      }
    },
    [uniqueId],
  );

  const restoreScrollPoint = useCallback(() => {
    const value = storageMapper.parse<Coordinates>(sessionStorage.getItem(uniqueId));
    if (!value) return;

    sessionStorage.removeItem(uniqueId);

    const handleScroll = () => {
      if (isEqual(value, { x: window.scrollX, y: window.scrollY }) && windowScrollRequestRef.current) {
        cancelAnimationFrame(windowScrollRequestRef.current);
        return;
      }

      window.scroll(value.x, value.y);
      windowScrollRequestRef.current = requestAnimationFrame(handleScroll);
    };

    windowScrollRequestRef.current = requestAnimationFrame(handleScroll);
  }, [uniqueId]);

  useEffect(() => {
    if (!enabled) return;

    const handleRouteChangeStart = () => {
      saveScrollPoint({ x: window.scrollX, y: window.scrollY });
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);

      if (windowScrollRequestRef.current) {
        cancelAnimationFrame(windowScrollRequestRef.current);
      }
    };
  }, [router, saveScrollPoint, enabled]);

  return {
    restoreScrollPoint,
  };
};

export { usePageWindowScroll };
