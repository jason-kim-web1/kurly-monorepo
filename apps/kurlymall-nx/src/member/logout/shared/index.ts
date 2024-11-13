import { removeAppToken } from '../../../order/shared/shared/services/appToken.storage.service';
import { amplitudeService } from '../../../shared/amplitude';
import { SESSION_KEY_DEV, SESSION_KEY_PROD } from '../../../shared/configs/config';
import { deleteCookie } from '../../../shared/services/document.service';
import { removeSocialLoginTokenFromSessionStorage } from '../../login/services/login.services';

export const doLogout = (params?: { externalUrl?: string }) => {
  amplitudeService.clearUserProperties();
  deleteCookie(SESSION_KEY_DEV, SESSION_KEY_PROD);
  removeSocialLoginTokenFromSessionStorage();

  removeAppToken();

  const { externalUrl } = params || {};

  window.location.replace(`/shop/member/logout.php${externalUrl ? `?external_url=${externalUrl}` : ''}`);
};
