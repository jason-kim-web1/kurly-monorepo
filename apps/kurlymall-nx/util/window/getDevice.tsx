import {
  isDesktop,
  isMobileOnly,
  isAndroid,
  isIOS,
  isWinPhone,
  deviceDetect,
  isMobileSafari,
} from 'react-device-detect';

import { checkPlatformInterface, OS } from '../../src/shared/utils/check-app-interface';
import { ParsedUrlQuery } from 'querystring';

export const PC = 'pc';
export const MOBILE_WEB = 'mobileWeb';
export const WEBVIEW = 'webview';

export const isPC = isDesktop;
export const isMobileWeb = isMobileOnly;
export const isAos = isAndroid;
export const isIos = isIOS;
export const isMobileDevice = isAos || isIos || isWinPhone;

export const getAppVersion = (): string => {
  const texts = window.navigator.userAgent.match(/Kurly\/(\d+\.\d+\.\d+)/);
  if (!texts) {
    return '';
  }

  return texts[1];
};

const checkAndroidInterface = checkPlatformInterface(OS.ANDROID);
const checkIosInterface = checkPlatformInterface(OS.IOS);

export const isWebview = () =>
  typeof window === 'object' &&
  (!!getAppVersion() || !!checkAndroidInterface('postMessage') || !!checkIosInterface('action'));

export const isPaymentWebview = () =>
  isWebview() || !!checkAndroidInterface('checkoutResult') || !!checkIosInterface('checkoutResult');

export const getDevice = () => {
  const device = {
    [PC]: isPC,
    [MOBILE_WEB]: isMobileWeb,
    [WEBVIEW]: isWebview(),
  };
  type DeviceKey = keyof typeof device;

  const deviceKeys = Object.keys(device) as DeviceKey[];
  return deviceKeys.find((key) => device[key]) ?? PC;
};

export const kakaoSignupGetDevice = () => {
  const device = {
    I: isIos,
    A: isAos,
    MW: isMobileWeb,
    PC: isPC,
  };
  type DeviceKey = keyof typeof device;

  const deviceKeys = Object.keys(device) as DeviceKey[];
  return deviceKeys.find((key) => device[key]) ?? 'MW';
};

export const getReplaceUrl = (url: string) => {
  return url.replace(/(\/m\/)/g, '/');
};

export const checkSafari = () => {
  try {
    const { browserName } = deviceDetect();
    return browserName?.toLowerCase() === 'safari' || isMobileSafari;
  } catch (error) {
    return false;
  }
};

export const isWebviewByUA = (userAgent: string): boolean => {
  return /Kurly\/(\d+\.\d+\.\d+)/.test(userAgent);
};

export const isAosByUA = (userAgent: string): boolean => {
  return isWebviewByUA(userAgent) && userAgent.toLowerCase().indexOf('android') > -1;
};
/**
 * 페이지 진입과 동시에 URL Scheme (kurly://) 호출을 해도 되는지 여부
 * 1. 모바일
 * 2. 컬리 웹뷰 아님
 * 3. 안드로이드 : 모두 가능
 * 4. iOS : 특정브라우저들에서만 가능("주소가 유효하지 않기 때문에 Safari가 해당 페이지를 열 수 없습니다" 오류 방지)
 */
export const isUriSchemeCallAllowedOnLoad = (query: ParsedUrlQuery, userAgent?: string) => {
  const uaString = userAgent || navigator.userAgent;
  const isKurlyWebView = isWebviewByUA(uaString);

  // 로그인 갔다 오는 케이스 등에서 다시 앱스킴 호출 시도하지 않도록 사용
  const isBypass = /^true$/.test(query.noscheme as string);

  // 사파리 등에서 강제로 시도되도록 할 때 사용
  const isForced = /^true$/.test(query.forcescheme as string);

  if (!isBypass && !isPC && !isKurlyWebView) {
    if (isForced) {
      return true;
    }
    if (isAndroid) {
      return true;
    } else {
      return /Chrome|NAVER|KAKAOTALK|Line|Instagram|Edge|GSA/i.test(uaString);
    }
  }
  return false;
};

export const getDeviceID = (): string | undefined => {
  if (typeof window === 'object') {
    return window.navigator.userAgent.match(/DeviceID\/([\w-]+)/)?.[1];
  }
};
