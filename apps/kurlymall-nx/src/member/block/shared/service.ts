import { checkBrowserEnvironment } from '../../../shared/utils/checkBrowserEnvironment';

const LOCK_TOKEN_COOKIE_NAME = 'lockedToken';

export const setLockedToken = (value: string) => {
  if (!checkBrowserEnvironment()) {
    return;
  }
  window.sessionStorage.setItem(LOCK_TOKEN_COOKIE_NAME, value);
};
export const getLockedToken = () => {
  if (!checkBrowserEnvironment()) {
    return '';
  }
  return window.sessionStorage.getItem(LOCK_TOKEN_COOKIE_NAME) ?? '';
};
export const deleteLockedToken = () => {
  if (!checkBrowserEnvironment()) {
    return;
  }
  window.sessionStorage.removeItem(LOCK_TOKEN_COOKIE_NAME);
};
