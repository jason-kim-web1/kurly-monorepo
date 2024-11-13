import { PropsWithChildren, useEffect, useRef } from 'react';

import styled from '@emotion/styled';

import { SwipeToNavigateProps } from './types';
import useSwipe from './useSwipe';
import { isSwipeNext, isSwipePrev } from './utils';
import useWindowSize from '../../hooks/useWindowSize';
import useSyncTransitionWrapperHeight from './useSyncTransitionWrapperHeight';
import { swipeToNavigateContext } from './context';

const BaseWrapper = styled.div`
  @supports (overflow: clip) {
    overflow: clip;
  }

  will-change: height;
  position: relative;
`;

const TransitionWrapper = styled.div<Pick<SwipeToNavigateProps, 'gutterBottom'>>`
  position: absolute;
  width: 100%;
  height: auto;
  will-change: left, opacity;
  ${({ gutterBottom }) =>
    gutterBottom &&
    `&:after {
      content: "";
      display: block;
      height: ${gutterBottom}px;
    }
    `}
`;

export default function SwipeToNavigateCore({
  children,
  gutterBottom,
  ...props
}: PropsWithChildren<SwipeToNavigateProps>) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const transitionRef = useRef<HTMLDivElement | null>(null);

  const { handleStart, coordinatesRef, isDragging, reachThreshold, isReset } = useSwipe(wrapperRef, props);

  const isIdle = !isDragging;

  /** 드래그 할 때의 애니메이션 */
  useEffect(() => {
    if (!isDragging) {
      return;
    }

    let frame: number | null = null;

    const animate = () => {
      if (!transitionRef.current) return;

      const startX = coordinatesRef.current.start.x;
      const moveX = coordinatesRef.current.moved.x;

      if ((props.onSwipePrev && isSwipePrev(startX, moveX)) || (props.onSwipeNext && isSwipeNext(startX, moveX))) {
        transitionRef.current.style.left = `${moveX - startX}px`;
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [isDragging, coordinatesRef, props.onSwipePrev, props.onSwipeNext]);

  /** 드래그 손 땠을 때 원래대로 돌아가는 애니메이션 */
  useEffect(() => {
    if (isReset) {
      transitionRef.current?.style.removeProperty('opacity');
      transitionRef.current?.style.removeProperty('left');
    }

    if (!isIdle || !transitionRef.current || reachThreshold) return;

    const totalLeft = Number(transitionRef.current.style.getPropertyValue('left').replace(/px/, ''));
    if (Number.isNaN(totalLeft)) {
      transitionRef.current.style.left = '0px';
      return;
    }

    const isNegative = totalLeft < 0;
    let absoluteLeft = Math.abs(totalLeft);
    let frame: number | null = null;

    const animate = () => {
      if (!transitionRef.current || absoluteLeft === 0) return;
      absoluteLeft = absoluteLeft - absoluteLeft * 0.2;

      if (absoluteLeft < 0.1) {
        absoluteLeft = 0;
      }

      const left = isNegative ? -1 * absoluteLeft : absoluteLeft;
      transitionRef.current.style.left = `${left}px`;

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [isIdle, reachThreshold, isReset]);

  const { width: windowWidth } = useWindowSize();

  /** 드래그 손 땠을 때 임계점 넘었다면 넘어가는 애니메이션 */
  useEffect(() => {
    if (!reachThreshold || !transitionRef.current) return;

    const totalLeft = Number(transitionRef.current.style.getPropertyValue('left').replace(/px/, ''));

    if (!totalLeft) return;
    if (Number.isNaN(totalLeft)) {
      transitionRef.current.style.left = '0px';
      return;
    }

    const isNegative = totalLeft < 0;
    let absoluteLeft = Math.abs(totalLeft);
    let opacity = 1;

    let frame: number | null = null;
    const animate = () => {
      if (!transitionRef.current) return;

      absoluteLeft = absoluteLeft + (windowWidth - absoluteLeft) * 0.1;

      if (windowWidth - absoluteLeft < 0.1) {
        absoluteLeft = windowWidth;
      }

      const left = isNegative ? -1 * absoluteLeft : absoluteLeft;
      opacity = opacity - 0.05;

      if (opacity > 0 && absoluteLeft !== windowWidth) {
        transitionRef.current.style.left = `${left}px`;
        transitionRef.current.style.opacity = `${opacity}`;
        frame = requestAnimationFrame(animate);
        return;
      }

      if (frame) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    };

    frame = requestAnimationFrame(animate);

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [reachThreshold, windowWidth]);

  const swipeMethods = useSyncTransitionWrapperHeight(transitionRef, wrapperRef);

  return (
    <BaseWrapper ref={wrapperRef} onMouseDown={handleStart} onTouchStart={handleStart} role="presentation">
      <TransitionWrapper ref={transitionRef} gutterBottom={gutterBottom}>
        <swipeToNavigateContext.Provider value={swipeMethods}>{children}</swipeToNavigateContext.Provider>
      </TransitionWrapper>
    </BaseWrapper>
  );
}
