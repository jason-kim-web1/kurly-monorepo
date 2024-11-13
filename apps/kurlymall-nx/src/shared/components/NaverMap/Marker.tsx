import { useRef } from 'react';

import { useNaverMapContext } from '../../context/NaverMapContext/NaverMapContext';
import { useIsomorphicLayoutEffect } from '../../hooks';
import { LatLng, MarkerClickEvent } from '../../interfaces/NaverMap/NaverMap.interface';

interface MarkerProps extends Omit<naver.maps.MarkerOptions, 'position' | 'map' | 'clickable'> {
  icon?: naver.maps.HtmlIcon;
  title: string;
  position: LatLng;
  onClick?: (event: MarkerClickEvent) => void;
}

export default function Marker({ icon, title, position: { latitude, longitude }, onClick }: MarkerProps) {
  const { map } = useNaverMapContext();

  const marker = useRef<naver.maps.Marker | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!map) {
      return;
    }

    const markerPosition = new naver.maps.LatLng(latitude, longitude);
    marker.current = new naver.maps.Marker({
      map,
      title,
      position: markerPosition,
      clickable: !!onClick,
      icon,
    });

    return () => {
      if (!marker.current) return;
      marker.current.setMap(null);
      marker.current = null;
    };
  }, [map]);

  useIsomorphicLayoutEffect(() => {
    if (!marker.current) {
      return;
    }

    let listener: naver.maps.MapEventListener;
    if (onClick) {
      listener = marker.current.addListener('click', onClick);
    }

    return () => {
      if (!marker.current) return;
      if (listener) {
        marker.current.removeListener(listener);
      }
    };
  }, [onClick]);

  return null;
}
