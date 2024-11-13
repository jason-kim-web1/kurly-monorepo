import { useContext } from 'react';

import { swipeToNavigateContext } from './context';

export default function useSwipeToNavigateContext() {
  return useContext(swipeToNavigateContext);
}
