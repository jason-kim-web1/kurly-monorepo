import { RefObject, useState } from 'react';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

interface Props {
  ref: RefObject<HTMLElement>;
  onOverflow?: (isOverflowX: boolean, isOverflowY: boolean) => void;
}

export const useIsOverflow = ({ ref, onOverflow }: Props) => {
  const [isOverflow, setIsOverflow] = useState<{ isOverflowX: boolean | undefined; isOverflowY: boolean | undefined }>({
    isOverflowX: undefined,
    isOverflowY: undefined,
  });

  useIsomorphicLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      if (!current) return null;

      const hasOverflowX = current.scrollWidth > current.clientWidth;
      const hasOverflowY = current.scrollHeight > current.clientHeight;

      setIsOverflow({ isOverflowX: hasOverflowX, isOverflowY: hasOverflowY });

      if (onOverflow) onOverflow(hasOverflowX, hasOverflowY);
    };

    const observer: ResizeObserver | undefined =
      current && 'ResizeObserver' in window ? new ResizeObserver(trigger) : undefined;

    if (current && observer) observer.observe(current);

    trigger();

    return () => {
      if (current && observer) observer.unobserve(current);
    };
  }, [ref]);

  const { isOverflowX, isOverflowY } = isOverflow;
  return { isOverflowX, isOverflowY };
};
