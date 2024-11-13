import { loadLocalStorage, storeLocalStorage, removeLocalStorage } from '../../../../shared/services/storage.service';

export const storeTossToken = (tossToken: string | null) => {
  return storeLocalStorage('tossToken', tossToken);
};

export const removeTossToken = () => {
  return removeLocalStorage('tossToken');
};

export const loadTossToken = (): string | null => {
  return loadLocalStorage('tossToken');
};
