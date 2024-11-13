import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { AppState } from '../store';

import { AmplitudeEvent } from '../amplitude/AmplitudeEvent';
import { amplitudeService } from '../amplitude';

export function useLoadEvent<T>(event: AmplitudeEvent<T>) {
  const router = useRouter();

  const { uid } = useSelector(({ auth }: AppState) => auth);

  useEffect(() => {
    if (router.isReady && uid) {
      amplitudeService.setUserId(uid);
      amplitudeService.logEvent(event);
    }
  }, [event, router.isReady, uid]);
}
