import { RefObject, useEffect, useState } from 'react';

import { useAppSelector } from '../../shared/store';
import useWindowSize from '../../shared/hooks/useWindowSize';

/**
 * 카테고리 우패널 영역에서 (visibleAreaHeight)
 * 정가운데에 1차카테고리 명이 위치할 때 좌패널도 해당 1차 카테고리명으로 select 시킴
 */
export default function usePrimaryMenuTriggerRootMargin(
  wrapperRef: RefObject<HTMLUListElement>,
  visibleAreaHeight: number,
) {
  const headerHeight = useAppSelector(({ header }) => header.mobileHeaderHeight);
  const { height: windowHeight } = useWindowSize();

  const [rootMargin, setRootMargin] = useState<string>();

  useEffect(() => {
    const top = headerHeight + (wrapperRef.current?.offsetTop ?? 0) + visibleAreaHeight / 2;
    const bottom = windowHeight - top;

    if (Number.isNaN(top) || Number.isNaN(bottom) || top < 0 || bottom < 0) {
      return;
    }

    setRootMargin(`-${top}px 0px -${bottom}px 0px`);
  }, [windowHeight, headerHeight, visibleAreaHeight, wrapperRef]);

  return rootMargin;
}
