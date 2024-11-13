import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { join, isNull } from 'lodash';

import { FLAG_PREFIX, FLAG_UN_SET_PLACEHOLDER } from '../constants';
import { checkBrowserEnvironment } from '../../shared/utils/checkBrowserEnvironment';

const checkValidStorageValue = (value: unknown) => (isNull(value) ? false : true);

export const useFlagValue = (flagName: string) => {
  const STORAGE_KEY = join([FLAG_PREFIX, flagName.toUpperCase()], '');
  const storageValue = useSyncExternalStore(
    (cb) => {
      const isBrowserEnv = checkBrowserEnvironment();
      if (!isBrowserEnv) {
        return () => {};
      }
      window.addEventListener('storage', cb);
      return () => window.removeEventListener('storage', cb);
    },
    () => {
      const isBrowserEnv = checkBrowserEnvironment();
      if (!isBrowserEnv) {
        return FLAG_UN_SET_PLACEHOLDER;
      }
      const currentValue = window.sessionStorage.getItem(STORAGE_KEY);
      if (checkValidStorageValue(currentValue)) {
        return currentValue as string;
      }
      window.sessionStorage.setItem(STORAGE_KEY, FLAG_UN_SET_PLACEHOLDER);
      window.dispatchEvent(new Event('storage'));
      return FLAG_UN_SET_PLACEHOLDER;
    },
  );
  const update = (nextValue: unknown) => {
    const isBrowserEnv = checkBrowserEnvironment();
    if (!isBrowserEnv) {
      return;
    }
    window.sessionStorage.setItem(STORAGE_KEY, String(nextValue));
    window.dispatchEvent(new Event('storage'));
  };

  return [storageValue, { update }] as const;
};
