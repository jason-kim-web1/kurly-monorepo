import { useState, useCallback, useEffect } from 'react';

import { amplitudeService, ScreenName } from '../amplitude';

export function useScreenName(screenName: ScreenName) {
  const [isScreenName, setIsScreenName] = useState<string | undefined>('');

  const setScreenName = useCallback(() => {
    amplitudeService.setScreenName(screenName);
  }, [screenName]);

  useEffect(() => {
    setScreenName();

    const checkScreenName = () => {
      setIsScreenName(amplitudeService.getScreenName());
    };

    checkScreenName();
  }, [setScreenName]);

  useEffect(() => {
    if (!isScreenName) {
      setScreenName();
    }
  }, [isScreenName, setScreenName]);
}
