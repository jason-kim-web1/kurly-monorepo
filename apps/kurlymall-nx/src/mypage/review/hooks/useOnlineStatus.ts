import { useSyncExternalStore } from 'use-sync-external-store/shim';

import { getOnline } from '../../../shared/utils/getOnline';

type SubscribeFn = Parameters<typeof useSyncExternalStore>[0];
type GetServerSnapShotFn = Parameters<typeof useSyncExternalStore>[2];

const subscribe: SubscribeFn = (cb) => {
  window.addEventListener('online', cb);
  window.addEventListener('offline', cb);
  return () => {
    window.removeEventListener('online', cb);
    window.removeEventListener('offline', cb);
  };
};

const getServerSnapshot: GetServerSnapShotFn = () => {
  return true;
};

export const useOnlineStatus = () => {
  const isOnline = useSyncExternalStore(subscribe, getOnline, getServerSnapshot) as boolean;
  return isOnline;
};
