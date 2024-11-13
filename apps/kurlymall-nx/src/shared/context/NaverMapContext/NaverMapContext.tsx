import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type NaverMap = naver.maps.Map;

type NaverMapContext = {
  map: NaverMap | null;
  setMap(map: NaverMap): void;
};

const MapContext = createContext<NaverMapContext>({
  map: null,
  setMap: () => {},
});

interface NaverMapContextProviderProps {
  children: ReactNode;
}

export const NaverMapContextProvider = ({ children }: NaverMapContextProviderProps) => {
  const [map, setMap] = useState<NaverMap | null>(null);
  const value = useMemo(() => ({ map, setMap }), [map, setMap]);

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

export const useNaverMapContext = () => {
  const map = useContext(MapContext);
  if (!map) {
    throw new Error('useNaverMapContext 는 NaverMapContextProvider 와 함께 사용되어야 합니다.');
  }

  return map;
};
