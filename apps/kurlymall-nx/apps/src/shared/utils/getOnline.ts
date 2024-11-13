import { checkBrowserEnvironment } from './checkBrowserEnvironment';

export const getOnline = () => {
  if (!checkBrowserEnvironment()) {
    return true;
  }
  return window.navigator.onLine;
};
