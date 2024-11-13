import { createContext, useMemo, useRef } from 'react';

import { PropsWithChildrenOnly } from '../../shared/interfaces';
import { SiteCategorySelectedCodeContext } from '../types';
import { MainSite } from '../../main/interfaces/MainSection.interface';
import {
  loadSessionStorage,
  SESSION_STORAGE_KEY,
  storeSessionStorage,
} from '../../shared/services/session.storage.service';

export const siteCategorySelectedCodeContext = createContext<SiteCategorySelectedCodeContext>({
  getAllCode: () => ({ MARKET: '', BEAUTY: '' }),
  getCode: () => '',
  setCode: () => {},
});

type SelectedPrimaryCodes = Record<MainSite, string>;

export default function SiteCategorySelectedCodeProvider({ children }: PropsWithChildrenOnly) {
  const storageValueRef = useRef(loadSessionStorage<SelectedPrimaryCodes>(SESSION_STORAGE_KEY.selectedPrimaryCode));
  const codeRef = useRef<Map<MainSite, string>>(
    new Map([
      ['MARKET', storageValueRef.current?.MARKET || ''],
      ['BEAUTY', storageValueRef.current?.BEAUTY || ''],
    ]),
  );

  const value = useMemo(() => {
    return {
      getAllCode: () => Object.fromEntries(codeRef.current.entries()) as SelectedPrimaryCodes,
      getCode: (site: MainSite) => codeRef.current.get(site) || '',
      setCode: (site: MainSite, code: string) => {
        codeRef.current.set(site, code);
        storeSessionStorage<SelectedPrimaryCodes>(
          SESSION_STORAGE_KEY.selectedPrimaryCode,
          Object.fromEntries(codeRef.current.entries()) as SelectedPrimaryCodes,
        );
      },
    };
  }, []);

  return <siteCategorySelectedCodeContext.Provider value={value}>{children}</siteCategorySelectedCodeContext.Provider>;
}
