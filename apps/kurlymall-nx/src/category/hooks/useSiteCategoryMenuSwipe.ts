import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import useWindowSize from '../../shared/hooks/useWindowSize';
import { MainSite } from '../../main/interfaces/MainSection.interface';
import { initializeMainSite } from '../../main/slice';
import { getPageUrl, USER_MENU_PATH } from '../../shared/constant';
import { redirectTo } from '../../shared/reducers/page';
import { useAppSelector } from '../../shared/store';
import { logSiteChange } from '../amplitude/events';
import { amplitudeService } from '../../shared/amplitude';
import { convertMainSiteToSiteName } from '../../main/util/mainSiteUtil';

const amplitudeBucket = amplitudeService.bucketInstance();
const SITES: MainSite[] = ['MARKET', 'BEAUTY'];

export default function useSiteCategoryMenuSwipe() {
  const dispatch = useDispatch();

  const site = useAppSelector(({ main }) => main.site);

  useEffect(() => {
    amplitudeBucket.updateBrowseSiteName(convertMainSiteToSiteName(site));
  }, [site]);

  const handleChangeSite = (nextSite: MainSite) => {
    if (site === nextSite) return;

    dispatch(initializeMainSite(site, nextSite, false));
    dispatch(
      redirectTo({
        url: getPageUrl(USER_MENU_PATH.category),
        query: { ...(nextSite !== 'MARKET' && { site: nextSite.toLowerCase() }) },
        replace: true,
      }),
    );
  };

  const { width: windowWidth } = useWindowSize();

  const threshold = windowWidth / 2;

  const currentSiteIndex = SITES.indexOf(site);

  const onSwipePrev = () => {
    const categorySite = SITES[currentSiteIndex - 1];

    logSiteChange(categorySite, 'swipe_category');
    handleChangeSite(SITES[currentSiteIndex - 1]);
  };

  const onSwipeNext = () => {
    const categorySite = SITES[currentSiteIndex + 1];

    logSiteChange(categorySite, 'swipe_category');
    handleChangeSite(SITES[currentSiteIndex + 1]);
  };

  return {
    onSwipePrev: currentSiteIndex === 0 ? undefined : onSwipePrev,
    onSwipeNext: currentSiteIndex === SITES.length - 1 ? undefined : onSwipeNext,
    threshold,
    site,
    handleChangeSite,
  };
}
