import { useState, useEffect, useCallback } from 'react';

import { amplitudeService } from '../../shared/amplitude';
import {
  ViewEventDetail50,
  ViewEventDetail100,
  ViewEventDetail,
  ViewEventDetail25,
  ViewEventDetail75,
} from '../../shared/amplitude/events/lounges';

export function useScrollAmplitudeEvent({ pageName }: { pageName: string }) {
  const [percentage, setPercentage] = useState(0);

  const [loggedEvents, setLoggedEvents] = useState({
    view25: false,
    view50: false,
    view75: false,
    view100: false,
  });

  const getScrollPercentage = () => {
    const scroll = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    const viewport = scrollHeight - clientHeight;
    const percent = (scroll / viewport) * 100;

    return setPercentage(Math.floor(percent));
  };

  useEffect(() => {
    window.addEventListener('scroll', getScrollPercentage);

    return () => window.removeEventListener('scroll', getScrollPercentage);
  }, []);

  useEffect(() => {
    if (!pageName) {
      return;
    }

    const url = `${window.location.origin}${window.location.pathname}`;

    amplitudeService.logEvent(new ViewEventDetail({ url, pageName }));
  }, [pageName]);

  const logScrollEvent = useCallback(
    ({ key }: { key: keyof typeof loggedEvents }) => {
      if (!pageName) {
        return;
      }

      const url = `${window.location.origin}${window.location.pathname}`;

      setLoggedEvents((prevState) => ({ ...prevState, [key]: true }));

      switch (key) {
        case 'view25':
          amplitudeService.logEvent(new ViewEventDetail25({ url, pageName }));
          break;
        case 'view50':
          amplitudeService.logEvent(new ViewEventDetail50({ url, pageName }));
          break;
        case 'view75':
          amplitudeService.logEvent(new ViewEventDetail75({ url, pageName }));
          break;
        case 'view100':
          amplitudeService.logEvent(new ViewEventDetail100({ url, pageName }));
          break;
      }
    },
    [pageName],
  );

  useEffect(() => {
    if (percentage >= 25 && !loggedEvents.view25) {
      logScrollEvent({ key: 'view25' });
    }
  }, [loggedEvents.view25, percentage, logScrollEvent]);

  useEffect(() => {
    if (percentage >= 50 && !loggedEvents.view50) {
      logScrollEvent({ key: 'view50' });
    }
  }, [loggedEvents.view50, percentage, logScrollEvent]);

  useEffect(() => {
    if (percentage >= 75 && !loggedEvents.view75) {
      logScrollEvent({ key: 'view75' });
    }
  }, [loggedEvents.view75, percentage, logScrollEvent]);

  useEffect(() => {
    if (percentage > 99 && !loggedEvents.view100) {
      logScrollEvent({ key: 'view100' });
    }
  }, [loggedEvents.view100, percentage, logScrollEvent]);
}
