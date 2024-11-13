import * as Sentry from '@sentry/nextjs';

import { useEffect } from 'react';

import { useAppSelector } from '../store';

export default function useSentry() {
  const info = useAppSelector(({ member }) => member.info);

  useEffect(() => {
    if (!info?.memberNo) {
      return;
    }

    Sentry.configureScope((scope) => {
      if (info.memberNo) {
        scope.setUser({
          id: info.memberNo,
        });

        return;
      }

      scope.setUser(null);
    });
  }, [info?.memberNo]);
}
