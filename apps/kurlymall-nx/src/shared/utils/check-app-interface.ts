import { has } from 'lodash';

export enum OS {
  ANDROID = 'Android',
  IOS = 'Ios',
}

export const checkUserInterface = (os: OS) => (path: string | string[]) => {
  const target = os === OS.ANDROID ? window.Android_User : window.webkit?.messageHandlers.user;
  return has(target, path);
};

export const checkNavigateInterface = (os: OS) => (path: string | string[]) => {
  const target = os === OS.ANDROID ? window.Android_Navigate : window.webkit?.messageHandlers.navigate;
  return has(target, path);
};

export const checkAnalyticsInterface = (os: OS) => (path: string | string[]) => {
  const target = os === OS.ANDROID ? window.Android_Analytics : window.webkit?.messageHandlers.analytics;
  return has(target, path);
};

export const checkOrderInterface = (os: OS) => (path: string | string[]) => {
  const target = os === OS.ANDROID ? window.Android_Order : window.webkit?.messageHandlers;
  return has(target, path);
};

export const checkPlatformInterface = (os: OS) => (path: string | string[]) => {
  const target = os === OS.ANDROID ? window.Android : window.webkit?.messageHandlers;
  return has(target, path);
};
