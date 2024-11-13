import { CSSProperties, useEffect, useRef } from 'react';

import { debounce } from 'lodash';

import { useIsomorphicLayoutEffect } from '../../hooks';
import useLoadNaverMap from '../../hooks/useLoadNaverMap';
import { LatLng, MapProps } from '../../interfaces/NaverMap/NaverMap.interface';
import { useNaverMapContext } from '../../context/NaverMapContext/NaverMapContext';
import HandleEvents from './HandleEvents';
import getMapProps from './utils/getMapProps';

const DEFAULT_ZOOM_LEVEL = 16;
const DEFAULT_CENTER: LatLng = { latitude: 37.566535, longitude: 126.977969 };
const DEFAULT_STYLE: CSSProperties = { width: '100%', height: '600px' };
const DEFAULT_INNER_STYLE: CSSProperties = {
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  position: 'absolute',
  zIndex: 0,
};

function MapCore({
  className,
  children,
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM_LEVEL,
  style = DEFAULT_STYLE,
  innerStyle,
  ...rest
}: MapProps) {
  const { map, setMap } = useNaverMapContext();
  const { mapOptions, events } = getMapProps(rest);

  const { latitude, longitude } = center;

  const ref = useRef<HTMLDivElement>(null);
  const centerRef = useRef(new naver.maps.LatLng(latitude, longitude));

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;

    const mapInstance = new naver.maps.Map(ref.current, {
      center: centerRef.current,
      zoom,
      ...mapOptions,
    });

    setMap(mapInstance);

    return () => {
      mapInstance.destroy();
    };
  }, [ref.current]);

  useEffect(() => {
    if (!map || typeof window === 'undefined') {
      return;
    }

    const handleResize = debounce(() => {
      map.autoResize();
    }, 300);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [map]);

  return (
    <div className={className} style={{ position: 'relative', ...style }}>
      <div id="map" ref={ref} style={{ ...DEFAULT_INNER_STYLE, ...innerStyle }}>
        {map && (
          <>
            <HandleEvents target={map} events={events} />
            {children}
          </>
        )}
      </div>
    </div>
  );
}

export default function NaverMap(props: MapProps) {
  const { isLoaded } = useLoadNaverMap();

  return <>{isLoaded && <MapCore {...props} />}</>;
}
