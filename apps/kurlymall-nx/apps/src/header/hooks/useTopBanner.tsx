import { useCallback } from 'react';

import ReactGA from 'react-ga4';

import { amplitudeService } from '../../shared/amplitude';
import { SelectJoinTopBanner } from '../../shared/amplitude/events';

interface Props {
  onClickClose: () => void;
  loggedIn: boolean;
}

export default function useTopBanner({ onClickClose, loggedIn }: Props) {
  const handleClickBanner = useCallback(
    (url: string) => {
      const gaCode = loggedIn ? 'general_header_friends' : 'general_header_sighup';

      ReactGA.event(gaCode, { action: 'click' });

      if (!loggedIn) {
        amplitudeService.logEvent(new SelectJoinTopBanner());
      }

      window.location.assign(url);
    },
    [loggedIn],
  );

  const handleClickClose = useCallback(() => {
    const expires = new Date().setDate(new Date().getDate() + 1);
    localStorage.setItem('top_banner_hide', String(expires));

    onClickClose();
  }, [onClickClose]);

  return {
    handleClickBanner,
    handleClickClose,
  };
}
