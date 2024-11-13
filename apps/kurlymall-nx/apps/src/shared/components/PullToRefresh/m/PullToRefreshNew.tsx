import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import { getTouchAngle } from '../../../utils/touch';
import PullToRefreshLoading from '../../Loading/PullToRefreshLoading';

interface Props {
  onRefresh: () => void;
  marginTop?: number;
}

const PULL_TO_REFRESH_THRESHOLD = 100;
const MINIMUM_TOUCH_ANGLE = 70;

const Wrapper = styled.div<{ marginTop: number }>`
  position: relative;
  margin-top: ${({ marginTop }) => marginTop}px;
  transition: transform, 0.2s ease-out;
  will-change: transform;
  overscroll-behavior-y: contain;
`;

const LoadingWrapper = styled.div`
  position: absolute;
  top: ${(-1 * PULL_TO_REFRESH_THRESHOLD) / 2}px;
  left: 50%;
  transform: translate(-50%, -50%);
  will-change: opacity;
`;

function PullToRefresh({ children, onRefresh: handleRefresh, marginTop = 0 }: PropsWithChildren<Props>) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const coordinatesRef = useRef({
    start: { x: 0, y: 0 },
    moved: { x: 0, y: 0 },
  });

  const shouldRefreshRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const loadingWrapperRef = useRef<HTMLDivElement | null>(null);

  const translateRef = useRef(0);

  useEffect(() => {
    function handleTouchStart(event: TouchEvent) {
      coordinatesRef.current.start.x = event.touches[0].clientX;
      coordinatesRef.current.start.y = event.touches[0].clientY;
      setShouldAnimate(true);
    }

    function handleTouchMove(event: TouchEvent) {
      if (!wrapperRef.current) return;

      const touch = event.touches[0];
      if (!touch) return;

      coordinatesRef.current.moved.x = touch.clientX;
      coordinatesRef.current.moved.y = touch.clientY;
      const deltaX = coordinatesRef.current.moved.x - coordinatesRef.current.start.x;
      const deltaY = coordinatesRef.current.moved.y - coordinatesRef.current.start.y;

      const touchAngle = getTouchAngle(deltaX, deltaY);

      if (touchAngle < MINIMUM_TOUCH_ANGLE) return;

      const pullDistance = coordinatesRef.current.moved.y - coordinatesRef.current.start.y;

      if (window.scrollY === 0 && pullDistance > 0) {
        if (event.cancelable) {
          event.preventDefault();
          event.stopPropagation();
        }
        translateRef.current = Math.min(pullDistance, PULL_TO_REFRESH_THRESHOLD);
        shouldRefreshRef.current = pullDistance >= PULL_TO_REFRESH_THRESHOLD;
      }
    }

    function handleTouchEnd() {
      coordinatesRef.current = { start: { x: 0, y: 0 }, moved: { x: 0, y: 0 } };
      if (!wrapperRef.current) return;

      if (shouldRefreshRef.current) {
        shouldRefreshRef.current = false;
        translateRef.current = PULL_TO_REFRESH_THRESHOLD;
        handleRefresh();

        setTimeout(() => {
          if (!wrapperRef.current) return;
          translateRef.current = 0;
        }, 1000);
        return;
      }

      translateRef.current = 0;
    }

    const el = wrapperRef.current;

    el?.addEventListener('touchstart', handleTouchStart);
    el?.addEventListener('touchmove', handleTouchMove);
    el?.addEventListener('touchend', handleTouchEnd);

    return () => {
      el?.removeEventListener('touchstart', handleTouchStart);
      el?.removeEventListener('touchmove', handleTouchMove);
      el?.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleRefresh]);

  useEffect(() => {
    if (!shouldAnimate) return;
    let frame = 0;
    let previousTransform: number | null = null;

    const animate = () => {
      if (!wrapperRef.current || !loadingWrapperRef.current) return;
      wrapperRef.current.style.transform = `translate(0, ${translateRef.current}px)`;
      loadingWrapperRef.current.style.opacity = `${translateRef.current / PULL_TO_REFRESH_THRESHOLD}`;

      if (previousTransform && previousTransform > 0 && translateRef.current === 0) {
        cancelAnimationFrame(frame);
        setShouldAnimate(false);
        return;
      }

      previousTransform = translateRef.current;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [shouldAnimate]);

  return (
    <Wrapper ref={wrapperRef} marginTop={marginTop}>
      {shouldAnimate && (
        <LoadingWrapper ref={loadingWrapperRef}>
          <PullToRefreshLoading />
        </LoadingWrapper>
      )}
      {children}
    </Wrapper>
  );
}

export default PullToRefresh;
