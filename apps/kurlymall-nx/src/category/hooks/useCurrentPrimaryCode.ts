import { useCallback, useEffect, useState } from 'react';

import { MainSite } from '../../main/interfaces/MainSection.interface';
import useSiteCategorySelectedCode from './useSiteCategorySelectedCode';
import { useAppSelector } from '../../shared/store';

export default function useCurrentPrimaryCode() {
  const mainSite = useAppSelector(({ main }) => main.site);
  const { getCode, setCode } = useSiteCategorySelectedCode();
  const [selected, setSelected] = useState<Record<MainSite, string>>({
    MARKET: getCode('MARKET'),
    BEAUTY: getCode('BEAUTY'),
  });

  const setCurrentPrimaryCode = useCallback((code: string, site: MainSite) => {
    setSelected((prev) => ({
      ...prev,
      [site]: code,
    }));
  }, []);

  useEffect(() => {
    return () =>
      (Object.entries(selected) as [MainSite, string][]).forEach(([site, code]) => {
        if (code) {
          setCode(site, code);
        }
      });
  }, [selected, setCode, mainSite]);

  return {
    currentPrimaryCategoryCode: selected,
    setCurrentPrimaryCategoryCode: setCurrentPrimaryCode,
  };
}
