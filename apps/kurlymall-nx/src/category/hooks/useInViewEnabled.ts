import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

import { MainSite } from '../../main/interfaces/MainSection.interface';
import { waitScrollStops } from '../../shared/utils/wait-scroll-stops';

export default function useInViewEnabled(site: MainSite) {
  const canSetIsScrollRef = useRef(false);
  const scrollListenerRef = useRef<(() => void) | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const removeScrollEventListener = useCallback(() => {
    canSetIsScrollRef.current = false;
    if (scrollListenerRef.current) {
      window.removeEventListener('scroll', scrollListenerRef.current);
    }
  }, []);

  const addScrollEventListener = useCallback(() => {
    canSetIsScrollRef.current = true;
    const debouncedInViewEnabledOff = debounce(() => {
      setIsScrolling(false);
    }, 0);

    scrollListenerRef.current = () => {
      if (canSetIsScrollRef.current) {
        setIsScrolling(true);
      }

      waitScrollStops(window).then(debouncedInViewEnabledOff);
    };

    window.addEventListener('scroll', scrollListenerRef.current);
  }, []);

  useEffect(() => {
    return () => {
      removeScrollEventListener();
    };
  }, [site, removeScrollEventListener]);

  return {
    inViewEnabled: isScrolling,
    removeScrollEventListener,
    addScrollEventListener,
    setInViewEnabled: setIsScrolling,
  };
}
