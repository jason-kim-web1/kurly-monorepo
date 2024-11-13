import { CSSProperties, ReactNode } from 'react';

export interface UIEvents {
  onMouseDown?: (event: naver.maps.PointerEvent) => void;
  onMouseUp?: (event: naver.maps.PointerEvent) => void;
  onClick?: (event: naver.maps.PointerEvent) => void;
  onDoubleClick?: (event: naver.maps.PointerEvent) => void;
  onRightClick?: (event: naver.maps.PointerEvent) => void;
  onMouseOver?: (event: naver.maps.PointerEvent) => void;
  onMouseOut?: (event: naver.maps.PointerEvent) => void;
  onMouseMove?: (event: naver.maps.PointerEvent) => void;
  onDragStart?: (event: naver.maps.PointerEvent) => void;
  onDrag?: (event: naver.maps.PointerEvent) => void;
  onDragEnd?: (event: naver.maps.PointerEvent) => void;
  onTouchStart?: (event: naver.maps.PointerEvent) => void;
  onTouchMove?: (event: naver.maps.PointerEvent) => void;
  onTouchEnd?: (event: naver.maps.PointerEvent) => void;
}

export interface MapProps extends Omit<naver.maps.MapOptions, 'center'>, UIEvents {
  className?: string;
  style?: CSSProperties;
  innerStyle?: CSSProperties;
  center: LatLng;
  children?: ReactNode;
}

export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface MarkerClickEvent {
  coord: naver.maps.Coord;
  offset: naver.maps.Point;
  overlay: naver.maps.Marker;
  point: naver.maps.Point;
  domEvent: Event;
  originalEvent: Event;
  pointerEvent: Event;
}
