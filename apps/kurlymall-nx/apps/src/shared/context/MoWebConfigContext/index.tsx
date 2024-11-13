import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { chain, noop, pick } from 'lodash';

import { SiteInfo } from '../../interfaces/AppConfig';
import { MainSite } from '../../../main/interfaces/MainSection.interface';

import { useAppConfigSiteInfos } from './app-config/useAppConfigSiteInfos';
import DEFAULT_APP_CONFIG from '../../constant/defaultAppConfig';
import { ChildrenOnlyProps } from '../../types';

import { ALLOWED_TAB_IDS } from './app-config/constants';
import { useAppSelector } from '../../store';
import { checkAllowedUserSegments, createTabLink } from './utils';
import { RequiredTabInfo } from './types';
import { HomeLayout } from './HomeLayout';
import { removeMobilePrefix } from '../../utils/url';
import { ne } from '../../utils/lodash-extends';

type MoWebConfigContext = {
  isHome: boolean;
  tabInfos: Record<MainSite, RequiredTabInfo[]>;
  setTabInfos: (values: Record<MainSite, RequiredTabInfo[]>) => void;
  isLoadingAppConfig: boolean;
};

const generateSiteTabInfos = (siteInfos: SiteInfo[]): Record<MainSite, RequiredTabInfo[]> => {
  const [marketInfo, beautyInfo] = siteInfos;

  const createLinkTabInfos = (siteInfo: SiteInfo) =>
    chain(siteInfo.tabInfos ?? [])
      .map((o) => pick(o, ['id', 'name', 'badge', 'segmentFilter', 'type', 'pageKey']))
      .map((o) => ({ ...o, link: createTabLink(siteInfo.id.toUpperCase() as MainSite, o) }))
      .value();

  return {
    MARKET: createLinkTabInfos(marketInfo),
    BEAUTY: createLinkTabInfos(beautyInfo),
  };
};

const defaultTabs: Record<MainSite, RequiredTabInfo[]> = generateSiteTabInfos(DEFAULT_APP_CONFIG.siteInfos);

const initialContextValue: MoWebConfigContext = {
  isHome: false,
  tabInfos: {
    MARKET: defaultTabs.MARKET,
    BEAUTY: defaultTabs.BEAUTY,
  },
  setTabInfos: noop,
  isLoadingAppConfig: false,
};

const moWebConfigContext = createContext<MoWebConfigContext>(initialContextValue);

const MoWebConfigContextProvider = ({ children }: ChildrenOnlyProps) => {
  const { asPath } = useRouter();
  const { data: siteInfos, isSuccess } = useAppConfigSiteInfos();

  const [isTabLoaded, setIsTabLoaded] = useState(false);

  const { userSegments, hasSession } = useAppSelector(({ member, auth }) => ({
    userSegments: member.metadata?.segments,
    hasSession: auth.hasSession,
  }));

  const [tabInfos, setTabInfos] = useState<Record<MainSite, RequiredTabInfo[]>>({
    MARKET: initialContextValue.tabInfos.MARKET,
    BEAUTY: initialContextValue.tabInfos.BEAUTY,
  });

  const tabPathSearchParams = useMemo(() => {
    return chain(tabInfos)
      .values()
      .flatten()
      .map((o) => {
        const [path, query] = removeMobilePrefix(o.link).split('?');
        return {
          path,
          searchParams: new URLSearchParams(query),
        };
      })
      .value();
  }, [tabInfos]);

  const isHome: boolean = useMemo(() => {
    const [currentPath, currentQuery] = removeMobilePrefix(asPath).split('?');
    const searchParams = new URLSearchParams(currentQuery);

    return tabPathSearchParams.some((o) => {
      if (ne(o.path, currentPath)) return false;
      return Array.from(o.searchParams.entries()).every(([key, value]) => searchParams.get(key) === value);
    });
  }, [asPath, tabPathSearchParams]);

  useEffect(() => {
    if (!isSuccess || !siteInfos || !hasSession) return;

    const { MARKET: marketTabInfos, BEAUTY: beautyTabInfos } = generateSiteTabInfos(siteInfos);

    const nextTabInfos: Record<MainSite, RequiredTabInfo[]> = {
      MARKET: marketTabInfos
        .filter((o) => ALLOWED_TAB_IDS.MARKET.includes(o.id))
        .filter(({ segmentFilter }) => checkAllowedUserSegments(segmentFilter, userSegments)),
      BEAUTY: beautyTabInfos
        .filter((o) => ALLOWED_TAB_IDS.BEAUTY.includes(o.id))
        .filter(({ segmentFilter }) => checkAllowedUserSegments(segmentFilter, userSegments)),
    };

    setTabInfos(nextTabInfos);
    setIsTabLoaded(true);
  }, [isSuccess, siteInfos, hasSession, userSegments]);

  return (
    <moWebConfigContext.Provider
      value={{
        isHome,
        tabInfos,
        setTabInfos,
        isLoadingAppConfig: !isTabLoaded,
      }}
    >
      {isHome ? <HomeLayout>{children}</HomeLayout> : children}
    </moWebConfigContext.Provider>
  );
};

const useMoWebConfigContext = () => {
  const ctx = useContext(moWebConfigContext);
  if (!ctx) throw Error('MoWebConfigContextProvider 하위에서 사용되어야 합니다.');

  return ctx;
};

export type { RequiredTabInfo };
export { MoWebConfigContextProvider, useMoWebConfigContext };
