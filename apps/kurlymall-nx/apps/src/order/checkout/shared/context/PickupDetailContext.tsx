import { MutableRefObject, ReactNode, createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

import { debounce, isEmpty, isEqual, isNull } from 'lodash';

import { PickupPlace, PlaceSearchType, placeSearchType } from '../interfaces';
import { Nullable } from '../../../../shared/types';
import { defaultMarkerIcon } from '../utils/pickup/getMarkerIcon';
import { isPC } from '../../../../../util/window/getDevice';

interface SelectedPickupPlace {
  KEYWORD?: PickupPlace;
  MAP?: PickupPlace;
}

interface PickupDetailAction {
  searchPickupPlace: (value: string) => void;
  toggleType: (value: PlaceSearchType) => void;
  openAndSelect: (value: PickupPlace) => void;
  closeAndReset: () => void;
}

export interface PickupDetailState {
  marker: MutableRefObject<Nullable<naver.maps.Marker>>;
  keyword: string;
  placeState: SelectedPickupPlace;
  selected?: PickupPlace;
  searchType: PlaceSearchType;
  isKeywordType: boolean;
  actions: PickupDetailAction;
}

export const PickupDetailContext = createContext<PickupDetailState | undefined>(undefined);

export const PickupDetailProvider = ({ children }: { children: ReactNode }) => {
  const marker = useRef<Nullable<naver.maps.Marker>>(null);

  const [placeState, setPlaceState] = useState<SelectedPickupPlace>({
    KEYWORD: undefined,
    MAP: undefined,
  });
  const [keyword, setKeyword] = useState('');
  const [searchType, setSearchType] = useState<PlaceSearchType>(placeSearchType.KEYWORD);
  const [previousType, setPreviousType] = useState<PlaceSearchType>(placeSearchType.KEYWORD);

  const isKeywordType = useMemo(() => isEqual(searchType, placeSearchType.KEYWORD), [searchType]);

  const closeAndReset = useCallback(() => {
    setPlaceState((prev) => ({
      ...prev,
      [searchType]: undefined,
    }));

    if (isNull(marker) || isKeywordType) {
      return;
    }
    marker.current?.setIcon(defaultMarkerIcon({ size: { width: 24, height: 28 } }));
    marker.current = null;
  }, [searchType, isKeywordType, marker]);

  const searchPickupPlace = useMemo(
    () =>
      debounce((value: string) => {
        setKeyword(value);

        if (searchType === placeSearchType.MAP) {
          setSearchType(placeSearchType.KEYWORD);
        }

        if (isEmpty(value)) {
          setSearchType(previousType);
        }
      }, 150),
    [searchType, previousType],
  );

  const openAndSelect = useCallback(
    (value: PickupPlace) => {
      setPlaceState((prev) => ({
        ...(isPC && isKeywordType
          ? {
              ...prev,
              [placeSearchType.KEYWORD]: prev[placeSearchType.KEYWORD]?.placeId === value.placeId ? undefined : value,
            }
          : {
              ...prev,
              [searchType]: value,
            }),
      }));
    },
    [searchType, isKeywordType],
  );

  const toggleType = useCallback(
    (value: PlaceSearchType) => {
      setSearchType(value);
      setPreviousType(isEqual(value, placeSearchType.KEYWORD) ? placeSearchType.KEYWORD : placeSearchType.MAP);
    },
    [setSearchType],
  );

  const actions = useMemo(
    () => ({
      searchPickupPlace,
      toggleType,
      openAndSelect,
      closeAndReset,
    }),
    [searchPickupPlace, toggleType, openAndSelect, closeAndReset],
  );

  const value = useMemo(
    () => ({
      marker,
      keyword,
      placeState,
      selected: placeState[searchType],
      searchType,
      isKeywordType,
      actions,
    }),
    [marker, keyword, placeState, searchType, isKeywordType, actions],
  );

  return <PickupDetailContext.Provider value={value}>{children}</PickupDetailContext.Provider>;
};

export const usePickupDetail = () => {
  const value = useContext(PickupDetailContext);
  if (value === undefined) {
    throw new Error('usePickupDetail 는 PickupDetailProvider 와 함께 사용되어야 합니다.');
  }
  return value;
};
