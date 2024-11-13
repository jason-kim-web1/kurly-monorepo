import { get, head } from 'lodash';

import { isDefined } from './lodash-extends';
import { checkBrowserEnvironment } from './checkBrowserEnvironment';
import { ignoreError } from './general';

const COOKIE_OPTION_LIST = ['domain', 'expires', 'max-age', 'partitioned', 'path', 'samesite', 'secure'] as const;

const NAVER_CPS_COOKIE_NAMES = ['ch_kfpartnerID', 'ch_uuid', 'ch_access', 'ch_expires'] as const;

type CookieOptionNames = typeof COOKIE_OPTION_LIST[number];

type CookieOptions = Partial<Record<CookieOptionNames, string>>;

const UN_SET_COOKIE_OPTIONS: CookieOptions = { expires: '0', 'max-age': '0' };

const KURLY_COOKIE_HOST_LIST = ['.dev.kurly.com', '.perf.kurly.com', '.stg.kurly.com', '.kurly.com'] as const;

const removeHttpProtocolFromOrigin = (origin: string): string => origin.replace(/(^http[s]?:\/\/)/, '');

const createCookieData = (name: string, value: string, options: CookieOptions) => {
  const cookieOption = COOKIE_OPTION_LIST.filter((cookieOptionKey) => isDefined(get(options, cookieOptionKey)))
    .map((cookieOptionKey) => `;${cookieOptionKey}=${get(options, cookieOptionKey)}`)
    .join('');
  return `${name}=${value}${cookieOption}`;
};

export const setCookie = (cookieData: string) => {
  if (!checkBrowserEnvironment()) {
    return;
  }
  ignoreError(() => {
    document.cookie = cookieData;
  });
};

const getKurlyCookieDomain = () => {
  if (!checkBrowserEnvironment()) {
    return '';
  }
  const origin = removeHttpProtocolFromOrigin(document.location.origin);
  const domain = head(KURLY_COOKIE_HOST_LIST.filter((host) => origin.match(host)));
  return domain || origin;
};

export const flushNaverCpsCookies = () => {
  if (!checkBrowserEnvironment()) {
    return;
  }
  ignoreError(() => {
    const domain = getKurlyCookieDomain();
    const cookieData = NAVER_CPS_COOKIE_NAMES.map((cookieName) =>
      createCookieData(cookieName, '', {
        ...UN_SET_COOKIE_OPTIONS,
        domain,
        path: '/',
      }),
    );
    cookieData.forEach((data) => {
      setCookie(data);
    });
  });
};
