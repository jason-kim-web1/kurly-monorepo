/**
 *
 * @param el 스크롤 컨테이너
 * @param frameThreshold 체크할 프레임 수
 * @description frameThreshold 만큼 스크롤 포지션이 이동하지 않았을 때 "scrollEnd" 라고 판단하고 프라미스를 이행한다.
 */

function waitScrollStops(el: HTMLElement | Window, frameThreshold = 6): PromiseLike<void> {
  const getScrollPosition = () => (el instanceof HTMLElement ? el.scrollTop : el.scrollY);

  let currentFrame = 0;
  let currentRequest = 0;
  let previousPosition = getScrollPosition();

  return new Promise((resolve) => {
    const checkScroll = () => {
      const currentPosition = getScrollPosition();
      const isSamePositionByAFrame = previousPosition === currentPosition;

      currentFrame = isSamePositionByAFrame ? currentFrame + 1 : 0;

      if (isSamePositionByAFrame && currentFrame >= frameThreshold) {
        cancelAnimationFrame(currentRequest);
        resolve();
        return;
      }

      previousPosition = currentPosition;
      currentRequest = requestAnimationFrame(checkScroll);
    };

    currentRequest = requestAnimationFrame(checkScroll);
  });
}

export { waitScrollStops };
