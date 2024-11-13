import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { NextURL } from 'next/dist/server/web/next-url';

const REGEX_MAP = {
  MOBILE_USER_AGENT: new RegExp(
    '.*Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)|Tablet|tablet.*',
  ),
  API_PATH_REGEX: new RegExp('^(/nx/api)'),
  MOBILE_PATH_PREFIX: new RegExp('(/m)+/'),
  LEGACY_GOODS_LIST_REGEX: new RegExp('^(/goods-list)'),
  POPUP_PATH_PREFIX: new RegExp('^(/popup/)'),
  REDIRECT_PATH_PREFIX: new RegExp('^(/redirect)'),
  NX_ONLY_PATH_REGEX:
    /^\/(?:mock|nx|__?next|introduce|order|address|gift|policy|mypage|webview|main|cart|goods|member|event|user-terms|user-guide|category|market-benefit|goods-list|beauty-benefit|beauty-event|search|board|collections|categories|collection-groups|m\/|images\/|manifest\.json|service-worker\.js|sitemap|naver|partners|popup|events|\.well-known|apple-app-site-association|devtools|games|redirect|kurlypay|open)/,
};
const isLocalPhpDisabled = /^true$/i.test(process.env.LOCAL_PHP_SERVER_DISABLED || '');
const isNodeEnvDev = process.env.NODE_ENV === 'development';
const STAGE = process.env.NEXT_PUBLIC_STAGE || 'production';

const getLocalPhpRewriteUrl = (stage: string, orgUrl: NextURL) => {
  const { pathname } = orgUrl;
  const newUrl = orgUrl.clone();

  const subdomainPostfix =
    {
      performance: '.perf',
      stage: '.stg',
      development: '.dev',
    }[stage] || '';

  if (/^\/campaign\//.test(pathname)) {
    newUrl.pathname = pathname.replace(/^\/campaign/, '');
    newUrl.host = `campaign${subdomainPostfix}.kurly.com:443`;
    newUrl.protocol = `https`;
    return newUrl;
  } else {
    newUrl.host = `www${subdomainPostfix}.kurly.com:443`;
    newUrl.protocol = `https`;
    return newUrl;
  }
};

const STATIC_FILE_PATTERN_LIST = [
  /^(\/apple-app-site-association)/,
  /^(\/\.well-known\/)/,
  /^(\/manifest\.json)/,
  /^(\/images\/)/,
  /^(\/naver)/,
  /^(\/sitemap\/)/,
  /^(\/service-worker\.js)/,
  /^(\/order\/checkout\/bridge)/,
];

const LEGACY_GOODS_LIST_RULES = [
  {
    searchKey: 'category',
    pathPrefix: '/categories/',
  },
  {
    searchKey: 'collection',
    pathPrefix: '/collections/',
  },
];

const checkRegex =
  (regex: RegExp) =>
  (target: string): boolean =>
    regex.test(target);
const checkNxApiPath = checkRegex(REGEX_MAP.API_PATH_REGEX);
const checkPopupPagePath = checkRegex(REGEX_MAP.POPUP_PATH_PREFIX);
const checkRedirectPagePath = checkRegex(REGEX_MAP.REDIRECT_PATH_PREFIX);
const checkMobileUserAgent = checkRegex(REGEX_MAP.MOBILE_USER_AGENT);
const checkRequestUrlAlreadyMobilePrefix = (pathname: string): boolean => pathname.startsWith('/m/');
const checkLegacyGoodsListPage = checkRegex(REGEX_MAP.LEGACY_GOODS_LIST_REGEX);
const checkStaticFileRequest = (pathname: string): boolean =>
  STATIC_FILE_PATTERN_LIST.reduce<boolean>((acc, regex) => {
    if (regex.test(pathname)) {
      acc = true;
    }
    return acc;
  }, false);

const handleLegacyGoodsListRequest = (nextUrl: NextURL): NextResponse => {
  const [targetRule] = LEGACY_GOODS_LIST_RULES.filter((rule) => {
    const { searchKey } = rule;
    return nextUrl.searchParams.has(searchKey);
  });
  // NOTE: Handle /goods-list without any valid searchParams
  if (!targetRule) {
    nextUrl.pathname = '/main';
    return NextResponse.redirect(nextUrl);
  }
  const { pathPrefix, searchKey } = targetRule;
  nextUrl.pathname = `${pathPrefix}${nextUrl.searchParams.get(searchKey)}`;
  nextUrl.searchParams.delete(searchKey);
  return NextResponse.redirect(nextUrl);
};

export function middleware(request: NextRequest) {
  const isMobile = checkMobileUserAgent(request.headers.get('user-agent') || '');
  const { nextUrl, headers } = request;
  const { pathname } = nextUrl;

  // 로컬 개발환경에서 www-v2 없이 사용할 때
  if (isLocalPhpDisabled && isNodeEnvDev && !REGEX_MAP.NX_ONLY_PATH_REGEX.test(pathname)) {
    return NextResponse.rewrite(getLocalPhpRewriteUrl(STAGE, nextUrl));
  }

  const isAlreadyMobilePrefix = checkRequestUrlAlreadyMobilePrefix(pathname);
  const isApiPath = checkNxApiPath(pathname);
  const isPopUpPath = checkPopupPagePath(pathname);
  const isRedirectPath = checkRedirectPagePath(pathname);
  const isLegacyGoodsListPage = checkLegacyGoodsListPage(pathname);
  const isStaticFileRequest = checkStaticFileRequest(pathname);
  if (isStaticFileRequest || isPopUpPath || isRedirectPath) {
    return NextResponse.next();
  }
  if (isApiPath) {
    nextUrl.pathname = pathname.replace('/nx/api', '/api');
    const res = NextResponse.rewrite(nextUrl);
    const reqOrigin = headers.get('Origin');
    if (reqOrigin && /\.kurly\.com$/.test(reqOrigin)) {
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      res.headers.set('Access-Control-Allow-Origin', reqOrigin);
      res.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
      res.headers.set(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
      );
    }
    return res;
  }
  if (isAlreadyMobilePrefix) {
    nextUrl.pathname = pathname.replace(REGEX_MAP.MOBILE_PATH_PREFIX, '/');
    return NextResponse.redirect(nextUrl);
  }
  if (isLegacyGoodsListPage) {
    return handleLegacyGoodsListRequest(nextUrl);
  }

  if (!isMobile) {
    return NextResponse.next();
  }
  nextUrl.pathname = `/m${pathname}`;
  return NextResponse.rewrite(nextUrl);
}

export const config = {
  matcher: ['/:path*'],
};
