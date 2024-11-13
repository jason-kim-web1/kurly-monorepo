import { loadLocalStorage, storeLocalStorage, removeLocalStorage } from '../../../../shared/services/storage.service';

export const storeAppToken = (appToken: string | null) => {
  return storeLocalStorage('appToken', appToken);
};

export const removeAppToken = () => {
  return removeLocalStorage('appToken');
};

export const loadAppToken = (): string | null => {
  return loadLocalStorage('appToken');
};
