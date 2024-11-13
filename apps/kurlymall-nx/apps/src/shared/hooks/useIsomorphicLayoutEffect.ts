import { useEffect, useLayoutEffect } from 'react';

import { checkBrowserEnvironment } from '../utils/checkBrowserEnvironment';

export const useIsomorphicLayoutEffect = checkBrowserEnvironment() ? useLayoutEffect : useEffect;
