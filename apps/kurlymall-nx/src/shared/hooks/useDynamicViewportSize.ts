import useWindowSize from './useWindowSize';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { checkBrowserEnvironment } from '../utils/checkBrowserEnvironment';

const VIEWPORT_WIDTH_UNIT = '--vw';
const VIEWPORT_HEIGHT_UNIT = '--vh';

const useDynamicViewportSize = () => {
  const { width, height } = useWindowSize();

  const vw = width / 100;
  const vh = height / 100;

  useIsomorphicLayoutEffect(() => {
    if (!checkBrowserEnvironment()) return;
    document.documentElement.style.setProperty(VIEWPORT_WIDTH_UNIT, `${vw}px`);
    document.documentElement.style.setProperty(VIEWPORT_HEIGHT_UNIT, `${vh}px`);
  }, [width, height]);

  return {
    vw,
    vh,
  };
};

export { useDynamicViewportSize, VIEWPORT_HEIGHT_UNIT, VIEWPORT_WIDTH_UNIT };
