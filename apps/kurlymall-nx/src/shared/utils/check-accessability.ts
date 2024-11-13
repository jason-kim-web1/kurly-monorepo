import { checkBrowserEnvironment } from './checkBrowserEnvironment';

export const checkPrefersReducedMotion = () => {
  return (
    checkBrowserEnvironment() && 'matchMedia' in window && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches
  );
};
