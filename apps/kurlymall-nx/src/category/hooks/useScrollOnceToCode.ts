import { useEffect, useRef } from 'react';

import { MainSite } from '../../main/interfaces/MainSection.interface';

export default function useScrollOnceToCode(code: string, scrollFn: () => void, site: MainSite, enabled: boolean) {
  const previousSite = useRef(site);
  const isScrolledRef = useRef(false);

  useEffect(() => {
    if (isScrolledRef.current || !enabled) return;
    scrollFn();
    isScrolledRef.current = true;
  }, [code, enabled]);

  useEffect(() => {
    if (site !== previousSite.current) {
      isScrolledRef.current = false;
      previousSite.current = site;
    }
  }, [site]);
}
