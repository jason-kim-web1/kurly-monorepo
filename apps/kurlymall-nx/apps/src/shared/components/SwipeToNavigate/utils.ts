import { Coordinates } from './types';
import { checkPrefersReducedMotion } from '../../utils/check-accessability';

export const checkIfBrowserSupports = () => {
  if (typeof window === 'undefined') return false;

  if (checkPrefersReducedMotion()) {
    return false;
  }

  return 'ResizeObserver' in window;
};

export const getInitialCoordinates = (): Coordinates => ({ x: 0, y: 0 });

export const getCoordinates = (e: MouseEvent | TouchEvent): Coordinates => {
  if (e instanceof MouseEvent) {
    return { x: e.x, y: e.y };
  }

  const touch = e.touches[0];

  if (touch) {
    return { x: touch.clientX, y: touch.clientY };
  }

  return getInitialCoordinates();
};

export const isSwipePrev = (startX: number, moveY: number) => startX < moveY;
export const isSwipeNext = (startX: number, moveY: number) => startX > moveY;

export const hasReachThreshold = (startX: number, moveX: number, threshold: number, duration = 1000) => {
  return Math.abs(startX - moveX) * Math.max(1, 500 / duration) > threshold;
};

function checkIsOverflowScrollable(element: Element): boolean {
  const overflowType = getComputedStyle(element).overflowX;
  return overflowType === 'scroll' || overflowType === 'auto';
}

function checkIsOverflowHidden(element: Element): boolean {
  const overflowType = getComputedStyle(element).overflowX;
  return overflowType === 'hidden' || overflowType === 'clip';
}

function checkIsScrollable(element: Element): boolean {
  if (checkIsOverflowScrollable(element)) {
    return true;
  }

  if (checkIsOverflowHidden(element)) {
    return false;
  }

  return element.scrollWidth > element.clientWidth;
}

function checkIsTreeScrollable(element: Element): boolean {
  if (checkIsScrollable(element)) {
    return true;
  }

  if (element.parentElement == null) {
    return false;
  }

  return checkIsTreeScrollable(element.parentElement);
}

export const checkSwipeDisabled = (el: Element) => {
  return checkIsTreeScrollable(el);
};

export const checkIsEdgeSwipe = (edgeSwipeThreshold: number, startX: number) =>
  startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold;
