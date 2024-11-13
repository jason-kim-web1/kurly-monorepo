import { checkBrowserEnvironment } from '../../../shared/utils/checkBrowserEnvironment';

const SOCIAL_LOGIN_TOKEN = 'socialLoginToken';
const SOCIAL_LOGIN_REDIRECT_TYPE = 'socialLoginRedirectType';

export const loadSocialLoginTokenFromSessionStorage = () => {
  if (!checkBrowserEnvironment()) {
    return undefined;
  }

  return window.sessionStorage.getItem(SOCIAL_LOGIN_TOKEN);
};

export const saveSocialLoginTokenInSessionStorage = (socialLoginToken: string) => {
  if (!checkBrowserEnvironment()) {
    return;
  }

  window.sessionStorage.setItem(SOCIAL_LOGIN_TOKEN, socialLoginToken);
};

export const removeSocialLoginTokenFromSessionStorage = () => {
  if (!checkBrowserEnvironment()) {
    return;
  }

  window.sessionStorage.removeItem(SOCIAL_LOGIN_TOKEN);
  window.sessionStorage.removeItem(SOCIAL_LOGIN_REDIRECT_TYPE);
};
