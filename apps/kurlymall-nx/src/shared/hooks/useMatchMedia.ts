import { useEffect, useState, useRef } from 'react';

import { checkBrowserEnvironment } from '../utils/checkBrowserEnvironment';

export const useMatchMedia = (query: string) => {
  const [match, setMatch] = useState(false);
  const prevMatch = useRef<boolean>(false);

  const handleMediaQueryListChange = (e: MediaQueryListEvent) => {
    const { matches } = e;
    if (prevMatch.current === matches) {
      return;
    }
    setMatch(matches);
    prevMatch.current = matches;
  };

  useEffect(() => {
    if (!checkBrowserEnvironment()) {
      return;
    }
    const mediaQueryList = window.matchMedia(query);
    const { matches } = mediaQueryList;

    mediaQueryList.addEventListener('change', handleMediaQueryListChange);

    if (prevMatch.current !== matches) {
      setMatch(matches);
      prevMatch.current = matches;
    }
    return () => {
      mediaQueryList.removeEventListener('change', handleMediaQueryListChange);
    };
  }, [query]);

  return match;
};
