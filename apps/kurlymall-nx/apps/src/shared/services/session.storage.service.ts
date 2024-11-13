import { isUndefined } from 'lodash';

export const SESSION_STORAGE_KEY = {
  hideMainDeliveryTooltip: 'hideMainDeliveryTooltip',
  currentPath: 'currentPath',
  prevPath: 'prevPath',
  socialLoginToken: 'socialLoginToken',
  socialLoginRedirectType: 'socialLoginRedirectType',
  partnerEntry: 'partnerEntry',
  svc_mgmt_num: 'svc_mgmt_num',
  subs_prod_id: 'subs_prod_id',
  eventBenefitPreviouslyClickedOption: 'eventBenefitPreviouslyClickedOption',
  LAST_VIEWING_CONTENT_NO: 'LAST_VIEWING_CONTENT_NO',
  FUSION_SIGNALS: 'FUSION_SIGNALS',
  mainNotice: 'mainNotice',
  selectedPrimaryCode: 'selectedPrimaryCode',
  ORDER_LIST_RESTORATION: 'ORDER_LIST_RESTORATION',
} as const;

type SessionStorageKey = keyof typeof SESSION_STORAGE_KEY;

export const storeSessionStorage = <T>(KEY: SessionStorageKey, data: T) => {
  if (isUndefined(window)) {
    return;
  }

  window.sessionStorage.setItem(KEY, JSON.stringify(data));
};

export const loadSessionStorage = <T>(KEY: SessionStorageKey): T | null => {
  if (isUndefined(window)) {
    return null;
  }

  try {
    const data = window.sessionStorage.getItem(KEY);
    if (!data) {
      return null;
    }

    return JSON.parse(data);
  } catch {
    return null;
  }
};

export const removeSessionStorage = (...keys: SessionStorageKey[]) => {
  if (isUndefined(window)) {
    return;
  }

  keys.forEach((key) => {
    window.sessionStorage.removeItem(key);
  });
};
