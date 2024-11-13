import { useEffect } from 'react';

import { isEmpty } from 'lodash';

import { UIEvents } from '../../interfaces/NaverMap/NaverMap.interface';

interface Props {
  target: naver.maps.Map;
  events: Partial<UIEvents>;
}

export default function HandleEvents({ target, events }: Props) {
  useEffect(() => {
    if (isEmpty(events)) {
      return;
    }

    const listeners = Object.entries(events).map(([key, listener]) => {
      if (!listener) {
        return;
      }

      if (key === 'onDoubleClick') {
        return naver.maps.Event.addListener(target, 'dblclick', listener);
      }

      const eventName = key.slice(2).toLowerCase();
      return naver.maps.Event.addListener(target, eventName, listener);
    });

    return () => {
      naver.maps.Event.removeListener(listeners.filter((listener) => !!listener) as naver.maps.MapEventListener[]);
    };
  }, [target, events]);

  return null;
}
