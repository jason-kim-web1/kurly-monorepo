import { useRouter } from 'next/router';

import { useCallback } from 'react';

import { assign } from '../services';

export function useLink() {
  const router = useRouter();

  return useCallback(
    (url: string, isExternal = false) => {
      if (url.includes('.php') || isExternal) {
        assign(url);
      } else {
        void router.push(url);
      }
    },
    [router],
  );
}
