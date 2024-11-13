import { useEffect, useRef, useState } from 'react';

import { useScroll } from '../../shared/hooks';

const useShouldHideTopBarOnScroll = () => {
  const [shouldHide, setShouldHide] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { scrollDirection } = useScroll();

  useEffect(() => {
    if (timerRef.current) {
      return;
    }

    setShouldHide(scrollDirection === 'down');
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
    }, 100);
  }, [scrollDirection]);

  return {
    shouldHide,
  };
};

export { useShouldHideTopBarOnScroll };
