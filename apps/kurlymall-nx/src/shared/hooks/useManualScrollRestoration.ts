import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { checkBrowserEnvironment } from '../utils/checkBrowserEnvironment';

export const useManualScrollRestoration = () => {
  useIsomorphicLayoutEffect(() => {
    if (!checkBrowserEnvironment()) {
      return;
    }
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = 'auto';
    };
  }, []);
};
