import { toPairs } from 'lodash';

import { UIEvents } from '../../../interfaces/NaverMap/NaverMap.interface';

const HANDLERS: {
  [key in keyof UIEvents]: boolean;
} = {
  onMouseDown: true,
  onMouseUp: true,
  onClick: true,
  onDoubleClick: true,
  onRightClick: true,
  onMouseOver: true,
  onMouseOut: true,
  onMouseMove: true,
  onDragStart: true,
  onDrag: true,
  onDragEnd: true,
  onTouchStart: true,
  onTouchMove: true,
  onTouchEnd: true,
};

export default function getMapProps(props: naver.maps.MapOptions & UIEvents) {
  return toPairs(props).reduce(
    (acc, [key, value]) => {
      if (HANDLERS[key as keyof UIEvents]) {
        acc.events[key] = value;
      } else {
        acc.mapOptions[key] = value;
      }
      return acc;
    },
    {
      mapOptions: {},
      events: {},
    } as {
      mapOptions: { [key: string]: Partial<naver.maps.MapOptions> };
      events: { [key: string]: Partial<UIEvents> };
    },
  );
}
