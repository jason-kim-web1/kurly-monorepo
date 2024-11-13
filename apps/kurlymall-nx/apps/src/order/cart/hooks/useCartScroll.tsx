import { useCallback, useMemo } from 'react';

import { useScroll } from '../../../shared/hooks';

export default function useCartScroll() {
  const { scrollDirection, setScrollDirection } = useScroll();

  const isScrollDown = useMemo(() => scrollDirection === 'down', [scrollDirection]);

  const resetScrollDirection = useCallback(() => {
    setScrollDirection('up');
  }, [setScrollDirection]);

  return { isScrollDown, resetScrollDirection };
}
