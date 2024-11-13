import { MainSite } from '../interfaces/MainSection.interface';
import { PRODUCT_PATH } from '../../shared/constant';

const siteMap: Record<MainSite, string> = {
  BEAUTY: 'beauty',
  MARKET: 'market',
} as const;

export function convertMainSiteToSiteName(site: MainSite) {
  const siteName = siteMap[site];
  if (!siteName) {
    return 'market';
  }
  return siteName;
}

export function createCollectionUrl(site: MainSite, collectionCode: string) {
  const url = `${PRODUCT_PATH.collections.uri}/${collectionCode}`;
  if (!collectionCode) {
    return null;
  }
  if (site === 'BEAUTY') {
    return `${url}?site=beauty`;
  }
  return url;
}

export function createCollectionGroupsUrl(site: MainSite, collectionCode: string, collectionName?: string) {
  const siteName = site === 'BEAUTY' ? '?site=beauty' : '';
  const specialCharacters = site === 'BEAUTY' ? '&' : '?';
  const addName = collectionName ? `${specialCharacters}collection=${collectionName}` : '';
  return `${PRODUCT_PATH.collectionGroups.uri}/${collectionCode}${siteName}${addName}`;
}
