import { useEffect, useMemo, useState } from 'react';

import { eq, gt } from 'lodash';

import { useRouter } from 'next/router';

import { MainTopNavigationOption } from '../../main/navigation';
import { RequiredTabInfo, useMoWebConfigContext } from '../context/MoWebConfigContext';
import { getHomePathIndex } from '../context/MoWebConfigContext/utils';
import { useAppSelector } from '../store';
import { removeMobilePrefix, removeQueryString } from '../utils/url';

const generateSubTabOption = ({ id, name, link, badge, type }: RequiredTabInfo): MainTopNavigationOption => {
  return {
    id,
    name,
    link,
    badge,
    type,
  };
};

const INITIAL_ACTIVE_SUB_TAB_ID = -1;

const useSubTabs = () => {
  const { asPath } = useRouter();

  const site = useAppSelector(({ main }) => main.site);
  const { isLoadingAppConfig, tabInfos: siteTabInfos } = useMoWebConfigContext();
  const tabInfos = siteTabInfos[site];

  const [prevId, setPrevId] = useState(INITIAL_ACTIVE_SUB_TAB_ID);
  const [activeId, setActiveId] = useState(INITIAL_ACTIVE_SUB_TAB_ID);

  const options = useMemo(() => tabInfos.map(generateSubTabOption), [tabInfos]);

  const tabPaths = useMemo(() => tabInfos.map((tab) => removeQueryString(tab.link)), [tabInfos]);

  useEffect(() => {
    if (eq(activeId, INITIAL_ACTIVE_SUB_TAB_ID)) return;

    return () => {
      setPrevId(activeId);
    };
  }, [activeId]);

  useEffect(() => {
    const currentPath = removeMobilePrefix(removeQueryString(asPath));
    const nextId = getHomePathIndex(currentPath, tabPaths);

    if (gt(nextId, -1)) {
      setActiveId(nextId);
    }
  }, [tabPaths, asPath]);

  return {
    options,
    activeId,
    prevId,
    isLoading: isLoadingAppConfig,
  };
};

export { useSubTabs, generateSubTabOption };
