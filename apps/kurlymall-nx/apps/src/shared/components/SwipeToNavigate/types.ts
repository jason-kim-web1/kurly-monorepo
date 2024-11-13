interface SwipeToNavigateProps {
  threshold: number;
  onSwipePrev?: (() => void) | (() => Promise<void>);
  onSwipeNext?: (() => void) | (() => Promise<void>);
  gutterBottom?: number;
}

interface Coordinates {
  x: number;
  y: number;
}

export type { SwipeToNavigateProps, Coordinates };
