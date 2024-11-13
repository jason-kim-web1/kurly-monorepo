import { eq, isNil, omitBy } from 'lodash';

import { MainTopNavigationOption, PCMainSiteNavigation } from '../../main/navigation';
import { isNotEmpty } from './lodash-extends';

interface Props {
  link: string;
  site?: string;
}

const getPathNames = (options: MainTopNavigationOption[]) => options.map(({ link }) => link);
const checkPathname = (pathname: string, rules: string[]) => rules.some((p) => eq(p, pathname));

const checkMainPageLink = (link: string) => {
  const expUrl = /^http[s]?:\/\/([\S])/i;
  const isUrl = expUrl.test(link);
  const mainLinkRules = [
    '/main',
    '/main/beauty',
    ...getPathNames(PCMainSiteNavigation.MARKET),
    ...getPathNames(PCMainSiteNavigation.BEAUTY),
  ];
  if (!isUrl) {
    if (checkPathname(link, mainLinkRules)) {
      return true;
    }
    return false;
  }
  const url = new URL(link);
  return checkPathname(url.pathname, mainLinkRules);
};

export const queryStringSiteConverter = ({ link, site = 'market' }: Props) => {
  if (!link) {
    return link;
  }

  const trimLink = link.trim();
  const lowerLink = link.toLowerCase();
  const isMainLink = checkMainPageLink(link);

  if (
    !trimLink ||
    lowerLink.includes('site=market') ||
    lowerLink.includes('site=beauty') ||
    trimLink.includes('kurly://') ||
    isMainLink
  ) {
    return trimLink;
  }

  if (site.toLowerCase() === 'beauty') {
    const specialCharacter = link.includes('?') ? '&' : '?';
    return `${trimLink}${specialCharacter}site=beauty`;
  }

  return link;
};

export const getSearchParamsString = (params: object) => {
  const search = new URLSearchParams(omitBy(params, isNil)).toString();
  return `${isNotEmpty(search) ? '?' : ''}${search}`;
};
