import { useState, useEffect } from 'react';

interface Parameter {
  directionTurningPoint?: number;
  initialScrollYPosition?: number;
  lastScrollDirection?: 'down' | 'up';
}

export function useScroll({
  directionTurningPoint = 5,
  initialScrollYPosition = 0,
  lastScrollDirection = 'up',
}: Parameter = {}) {
  const [scrollY, setScrollY] = useState<number>(initialScrollYPosition);
  const [lastScrollY, setLastScrollY] = useState<number>(initialScrollYPosition);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>(lastScrollDirection);
  const [isScrollTop, setIsScrollTop] = useState(true);

  const saveScrollY = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', saveScrollY);

    return () => {
      window.removeEventListener('scroll', saveScrollY);
    };
  }, []);

  useEffect(() => {
    const isAtTop = scrollY <= 0;
    setIsScrollTop(isAtTop);

    if (isAtTop) {
      setScrollDirection('up');
      return;
    }

    if (Math.abs(lastScrollY - scrollY) <= directionTurningPoint) {
      return;
    } else if (scrollY > lastScrollY) {
      setScrollDirection('down');
    } else if (scrollY < lastScrollY) {
      setScrollDirection('up');
    }

    setLastScrollY(scrollY);
  }, [directionTurningPoint, lastScrollY, scrollY]);

  return {
    scrollY,
    scrollDirection,
    setScrollDirection,
    isScrollTop,
  };
}
