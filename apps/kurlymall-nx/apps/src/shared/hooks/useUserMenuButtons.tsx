import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { eq } from 'lodash';

import { useAppSelector } from '../store';
import { COMMON_PATH, getPageUrl, USER_MENU_PATH } from '../constant';
import { amplitudeService, TabName } from '../amplitude';
import { SelectSearchTab, SelectUserTabMenu } from '../amplitude/events';
import { redirectTo } from '../reducers/page';
import { isActiveMyKurlyUrl, isActiveProductListUrl } from '../../header/utils/isAllowedUrl';
import { useMoWebConfigContext } from '../context/MoWebConfigContext';
import useHomeAmplitude from '../../main/hooks/useHomeAmplitude';
import { MainSite } from '../../main/interfaces/MainSection.interface';

type MenuActionType = 'home' | 'category' | 'myPage' | '';

interface Options {
  onClickHome?: () => void;
}

const getHomePath = (site: MainSite) => `${getPageUrl(USER_MENU_PATH.home)}${site === 'BEAUTY' ? '/beauty' : ''}`;

const useUserMenuButtons = (options?: Options) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isHome } = useMoWebConfigContext();
  const { logSelectSiteHomeTab } = useHomeAmplitude();

  const site = useAppSelector(({ main }) => main.site);
  const hasNew = useAppSelector(({ header }) => header.userNotification.hasNew);
  const isGuest = useAppSelector(({ auth }) => auth.isGuest);

  const myKurlyUrl = getPageUrl(USER_MENU_PATH.mykurly);
  const categoryPath = `${getPageUrl(USER_MENU_PATH.category)}${site === 'BEAUTY' ? '?site=beauty' : ''}`;
  const myKurlyPath = isGuest ? `${getPageUrl(COMMON_PATH.login)}?internalUrl=${myKurlyUrl}` || '' : myKurlyUrl;

  const isCurrentSearchPage = router.pathname.includes(USER_MENU_PATH.search.uri);
  const isCurrentMain = site === 'BEAUTY' ? eq(router.asPath, '/main/beauty') : eq(router.asPath, '/main');

  const activeButtonType: MenuActionType = useMemo(() => {
    if (isHome) {
      return 'home';
    }

    if (isActiveProductListUrl(router.asPath)) {
      return 'category';
    }

    if (isActiveMyKurlyUrl(router.asPath)) {
      return 'myPage';
    }

    return '';
  }, [isHome, router.asPath]);

  const movePage = async (name: TabName, url: string) => {
    amplitudeService.logEvent(new SelectUserTabMenu({ event_name: name }));

    dispatch(
      redirectTo({
        url,
      }),
    );

    amplitudeService.setTabName(name);
  };

  const handleClickHome = async () => {
    options?.onClickHome?.();

    const shouldSwitchSite = isCurrentMain && eq(window.scrollY, 0);
    const nextSite = site === 'MARKET' ? 'BEAUTY' : 'MARKET';

    await movePage(TabName.HOME, shouldSwitchSite ? getHomePath(nextSite) : getHomePath(site));

    if (shouldSwitchSite) {
      logSelectSiteHomeTab(nextSite);
    }
  };

  const handleClickSearch = () => {
    if (isCurrentSearchPage) {
      return;
    }
    amplitudeService.logEvent(new SelectSearchTab());

    dispatch(
      redirectTo({
        url: getPageUrl(USER_MENU_PATH.search),
        query:
          site === 'BEAUTY'
            ? {
                site: 'beauty',
              }
            : undefined,
      }),
    );

    amplitudeService.setTabName(TabName.SEARCH);
  };

  return {
    movePage,
    handleClickSearch,
    activeButtonType,
    categoryPath,
    myKurlyPath,
    myKurlyUrl,
    handleClickHome,
    hasNew,
    isCurrentSearchPage,
  };
};

export { useUserMenuButtons };
