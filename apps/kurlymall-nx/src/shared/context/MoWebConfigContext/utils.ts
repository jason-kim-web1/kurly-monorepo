import { eq, intersection, isEmpty } from 'lodash';

import { MainSite } from '../../../main/interfaces/MainSection.interface';
import { SiteType, TabInfo } from '../../interfaces/AppConfig';
import {
  BeautyNavigationOptionRecord,
  MarketNavigationOptionRecord,
  MarketVipNavigationOptionRecord,
} from '../../../main/navigation';
import { isNotEmpty } from '../../utils/lodash-extends';
import { removeMobilePrefix } from '../../utils/url';
import { VipLevelType } from '../../../member/shared/constants';
import { getSearchParamsString } from '../../utils/queryStringSiteConverter';

const createTabLink = (site: MainSite, tab: Pick<TabInfo, 'type' | 'id' | 'pageKey'>) => {
  const searchParams = { site: eq(site, 'BEAUTY') ? site.toLowerCase() : null };

  switch (tab.type) {
    case SiteType.RECOMMENDATION:
      return site === 'MARKET'
        ? MarketNavigationOptionRecord.RECOMMEND.link
        : BeautyNavigationOptionRecord.RECOMMEND.link;

    case SiteType.WEBVIEW:
      return MarketVipNavigationOptionRecord[tab.id as VipLevelType]?.link ?? '';

    case SiteType.COLLECTION_GROUP:
      return `/collection-groups/${tab.pageKey}${getSearchParamsString(searchParams)}`;

    case SiteType.COLLECTION:
      return `/collections/${tab.pageKey}${getSearchParamsString(searchParams)}`;

    case SiteType.BANNER:
      if (eq(tab.pageKey, 'event')) {
        return site === 'MARKET'
          ? MarketNavigationOptionRecord.BENEFIT.link
          : BeautyNavigationOptionRecord.BENEFIT.link;
      }

      if (eq(tab.pageKey, 'bargain')) {
        return site === 'MARKET'
          ? MarketNavigationOptionRecord.BARGAIN.link
          : BeautyNavigationOptionRecord.BARGAIN.link;
      }

      /** NOTE 미정 */
      return '';

    case SiteType.COLLECTION_GROUP_GALLERY:
      if (eq(tab.pageKey, 'beauty-brand')) {
        return BeautyNavigationOptionRecord.BENEFIT.link;
      }

      return '';

    default:
      return MarketNavigationOptionRecord.RECOMMEND.link;
  }
};

const checkAllowedUserSegments = (tabSegmentFilter: string[], userSegmentFilter: string[]) => {
  if (isEmpty(tabSegmentFilter)) {
    return true;
  }

  const intersectingSegments = intersection(tabSegmentFilter, userSegmentFilter);

  return isNotEmpty(intersectingSegments) && intersectingSegments.length <= userSegmentFilter.length;
};

const getHomePathIndex = (path: string, homePaths: string[]) => {
  const currentPath = removeMobilePrefix(path);
  return homePaths.findIndex((homePath) => eq(currentPath, homePath));
};

export { createTabLink, getHomePathIndex, checkAllowedUserSegments };
