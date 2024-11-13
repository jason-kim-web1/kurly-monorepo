import { PropsWithChildren } from 'react';

import SwipeToNavigateCore from './SwipeToNavigateCore';
import { SwipeToNavigateProps } from './types';
import useCheckSwipeSupports from './useCheckSwipeSupports';

export default function SwipeToNavigate({ children, ...props }: PropsWithChildren<SwipeToNavigateProps>) {
  const supports = useCheckSwipeSupports();
  if (supports) {
    return <SwipeToNavigateCore {...props}>{children}</SwipeToNavigateCore>;
  }

  return <>{children}</>;
}
