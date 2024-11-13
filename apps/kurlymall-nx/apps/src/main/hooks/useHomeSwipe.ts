import { useRouter } from 'next/router';
import { head, last } from 'lodash';

import { useMemo } from 'react';

import { useAppSelector } from '../../shared/store';
import useWindowSize from '../../shared/hooks/useWindowSize';
import useHomeAmplitude from './useHomeAmplitude';
import { useMoWebConfigContext } from '../../shared/context/MoWebConfigContext';
import { generateSubTabOption } from '../../shared/hooks/useSubTabs';
import { MainSite } from '../interfaces/MainSection.interface';
import { MainTopNavigationOption } from '../navigation';

export default function useHomeSwipe(activeId: number) {
  const router = useRouter();
  const site = useAppSelector(({ main }) => main.site);
  const { logSelectSubTab, logSelectSite } = useHomeAmplitude();

  const { isLoadingAppConfig, tabInfos: siteTabInfos } = useMoWebConfigContext();

  const options: Record<MainSite, MainTopNavigationOption[]> = useMemo(() => {
    return {
      MARKET: siteTabInfos.MARKET.map(generateSubTabOption),
      BEAUTY: siteTabInfos.BEAUTY.map(generateSubTabOption),
    };
  }, [siteTabInfos]);

  const isMarketOnPrev = site === 'BEAUTY' && activeId === 0;
  const isBeautyOnNext = site === 'MARKET' && activeId === options.MARKET.length - 1;

  const changePage = (link: string) => {
    const isMobilePath = link.startsWith('/m/');
    const asPath = isMobilePath ? link.replace(/^\/m/, '') : link;

    return router.push(link, asPath);
  };

  const handleSwipePrev = async () => {
    if (isMarketOnPrev) {
      logSelectSite('MARKET');
      await changePage(last(options.MARKET)?.link ?? '/');
      return;
    }

    const next = activeId - 1;

    const { id, name, type } = options[site][next];

    logSelectSubTab(type, id, next, name, 'swipe');

    await changePage(options[site][next].link);
  };

  const handleSwipeNext = async () => {
    if (isBeautyOnNext) {
      logSelectSite('BEAUTY');
      await changePage(head(options.BEAUTY)?.link ?? '/');
      return;
    }

    const next = activeId + 1;
    const { id, name, type } = options[site][next];

    logSelectSubTab(type, id, next, name, 'swipe');

    await changePage(options[site][next].link);
  };

  const isSwipePrevDisabled = (activeId === 0 && site === 'MARKET') || isLoadingAppConfig;
  const isSwipeNextDisabled = (activeId === options.BEAUTY.length - 1 && site === 'BEAUTY') || isLoadingAppConfig;

  const { width: windowWidth } = useWindowSize();

  const threshold = windowWidth / 2;

  return {
    onSwipePrev: isSwipePrevDisabled ? undefined : handleSwipePrev,
    onSwipeNext: isSwipeNextDisabled ? undefined : handleSwipeNext,
    threshold,
  };
}
