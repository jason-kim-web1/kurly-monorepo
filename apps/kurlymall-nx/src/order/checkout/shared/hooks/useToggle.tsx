import { useState, useCallback } from 'react';

import { amplitudeService } from '../../../../shared/amplitude';
import { SelectExpandButton } from '../../../../shared/amplitude/events';

export default function useToggle(initialState?: boolean) {
  const [state, setState] = useState(initialState ?? false);

  return {
    isOpen: state,
    close: useCallback(() => setState(false), []),
    open: useCallback(() => setState(true), []),
    toggle: useCallback(() => setState(!state), [state]),
    toggleWithAmplitude: useCallback(
      (title) => {
        amplitudeService.logEvent(
          new SelectExpandButton({
            section: title,
            referrerEvent: amplitudeService.getWebviewReferrerEvent(),
          }),
        );
        setState(!state);
      },
      [state],
    ),
  };
}
