import {
  RefObject,
  useEffect,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
  useCallback,
} from 'react';

import { SwipeToNavigateProps } from './types';
import { SWIPE_CANCEL_EVENT_NAME, SWIPE_END_EVENT_NAME, SWIPE_MOVE_EVENT_NAME } from './constants';
import {
  checkIsEdgeSwipe,
  checkSwipeDisabled,
  getCoordinates,
  getInitialCoordinates,
  hasReachThreshold,
  isSwipeNext,
  isSwipePrev,
} from './utils';
import { useAppSelector } from '../../store';
import { getTouchAngle } from '../../utils/touch';
import { isPromise } from '../../utils/general';

const SWIPE_MIN_THRESHOLD = 10;
const EDGE_SWIPE_THRESHOLD = 20;
const MAX_TOUCH_ANGLE = 30;
const CALLBACK_DELAY = 100;

const isNegativeNumber = (value: number) => value < 0;

export default function useSwipe(
  ref: RefObject<HTMLElement>,
  { threshold, onSwipeNext: handleSwipeNext, onSwipePrev: handleSwipePrev }: SwipeToNavigateProps,
) {
  const mobileHeaderHeight = useAppSelector(({ header }) => header.mobileHeaderHeight);
  const isSwipingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [reachThreshold, setReachThreshold] = useState<boolean>(false);
  const [isReset, setIsReset] = useState(false);

  const coordinatesRef = useRef({
    start: getInitialCoordinates(),
    moved: getInitialCoordinates(),
  });

  const timeRef = useRef<Date>();

  const reset = useCallback(() => {
    setIsReset(true);
    isSwipingRef.current = false;
    setIsDragging(false);
    setReachThreshold(false);
    coordinatesRef.current = { start: getInitialCoordinates(), moved: getInitialCoordinates() };
  }, []);

  useEffect(() => {
    if (!ref.current || !isDragging) return;

    const $el = ref.current;

    const handleMove = (moveEvent: TouchEvent | MouseEvent) => {
      const { x: movedX, y: movedY } = getCoordinates(moveEvent);

      const deltaX = movedX - coordinatesRef.current.start.x;
      const deltaY = movedY - coordinatesRef.current.start.y;
      const touchAngle = getTouchAngle(deltaX, deltaY);

      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        isSwipingRef.current = false;
        coordinatesRef.current = { start: getInitialCoordinates(), moved: getInitialCoordinates() };
        setIsDragging(false);
        return;
      }

      if (Math.abs(deltaX) < SWIPE_MIN_THRESHOLD) return;

      const calculatedDeltaX = (isNegativeNumber(deltaX) ? -1 : 1) * (Math.abs(deltaX) - SWIPE_MIN_THRESHOLD);

      isSwipingRef.current = touchAngle < MAX_TOUCH_ANGLE;

      if (isSwipingRef.current) {
        coordinatesRef.current.moved.x = coordinatesRef.current.start.x + calculatedDeltaX;
        coordinatesRef.current.moved.y = movedY;

        if (moveEvent.cancelable) {
          moveEvent.preventDefault();
          moveEvent.stopPropagation();
        }
      }
    };

    const handleEnd = () => {
      const endDate = new Date();
      let duration = 0;
      if (timeRef.current) {
        duration = Number(endDate) - Number(timeRef.current);
        timeRef.current = undefined;
      }

      setReachThreshold(
        hasReachThreshold(coordinatesRef.current.start.x, coordinatesRef.current.moved.x, threshold, duration),
      );
      isSwipingRef.current = false;
      setIsDragging(false);
      coordinatesRef.current = { start: getInitialCoordinates(), moved: getInitialCoordinates() };
    };

    $el.addEventListener(SWIPE_MOVE_EVENT_NAME, handleMove, { passive: false });
    $el.addEventListener(SWIPE_END_EVENT_NAME, handleEnd, { passive: true });
    $el.addEventListener(SWIPE_CANCEL_EVENT_NAME, handleEnd, { passive: true });

    return () => {
      $el.removeEventListener(SWIPE_MOVE_EVENT_NAME, handleMove);
      $el.removeEventListener(SWIPE_END_EVENT_NAME, handleEnd);
      $el.removeEventListener(SWIPE_CANCEL_EVENT_NAME, handleEnd);
    };
  }, [ref, isDragging, threshold, mobileHeaderHeight]);

  useEffect(() => {
    if (!reachThreshold) return;

    setIsDragging(false);
    const startX = coordinatesRef.current.start.x;
    const moveX = coordinatesRef.current.moved.x;

    const afterSwipePrevNext = (cb: (() => void) | (() => Promise<void>)) => {
      setTimeout(() => {
        const returnValue = cb();
        if (isPromise(returnValue)) {
          returnValue.finally(() => reset());
        } else {
          reset();
        }
      }, CALLBACK_DELAY);
    };

    if (isSwipeNext(startX, moveX) && handleSwipeNext) {
      afterSwipePrevNext(handleSwipeNext);
    }

    if (isSwipePrev(startX, moveX) && handleSwipePrev) {
      afterSwipePrevNext(handleSwipePrev);
    }

    coordinatesRef.current = { start: getInitialCoordinates(), moved: getInitialCoordinates() };
  }, [reachThreshold, handleSwipeNext, handleSwipePrev, reset]);

  const handleStart = useCallback((startEvent: ReactMouseEvent | ReactTouchEvent) => {
    if (!(startEvent.target instanceof Element)) return;
    if (checkSwipeDisabled(startEvent.target)) return;

    const initialCoordinates = getCoordinates(startEvent.nativeEvent);
    if (checkIsEdgeSwipe(EDGE_SWIPE_THRESHOLD, initialCoordinates.x)) return;

    coordinatesRef.current.start = { ...initialCoordinates };
    coordinatesRef.current.moved = { ...initialCoordinates };

    setIsReset(false);
    setReachThreshold(false);
    setIsDragging(true);
    timeRef.current = new Date();
  }, []);

  return {
    isReset,
    handleStart,
    coordinatesRef,
    isDragging,
    setIsDragging,
    reachThreshold,
  };
}
