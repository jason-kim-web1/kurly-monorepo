import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { useAppSelector } from '../../shared/store';
import { isPC, isWebview } from '../../../util/window/getDevice';

function useScrollToTopWithTabs() {
  const {
    query: { isSubTab },
    isReady,
  } = useRouter();

  const { hasTopBanner, mobileHeaderHeight } = useAppSelector(({ header }) => ({
    hasTopBanner: !!header.topBanner.title,
    mobileHeaderHeight: header.mobileHeaderHeight,
  }));

  const topValue = useCallback(
    (params?: { isScrollOffset?: boolean }) => {
      if (!isReady) return 0;

      const { isScrollOffset } = params || {};

      // PC
      if (isPC) {
        const header = document.getElementById('header') as HTMLElement;
        return header?.clientHeight || 0;
      }

      // 웹뷰
      if (isWebview()) {
        return 0;
      }

      // 탭 top 위치
      if (!isScrollOffset) {
        return mobileHeaderHeight;
      }

      // 탭 앵커링시 위치값
      let value = mobileHeaderHeight;
      if (!!isSubTab) {
        value -= 44;
        if (!!hasTopBanner) value -= 38;
      }

      return value;
    },
    [hasTopBanner, isReady, isSubTab, mobileHeaderHeight],
  );

  const scrollToTopWithTabs = useCallback(
    ({ id }: { id: string }) => {
      if (!isReady) return;

      const domOffset = (document.getElementById(id) as HTMLElement)?.offsetTop;
      const tabHeight = (document.getElementById('tab') as HTMLElement)?.clientHeight;
      const top = tabHeight + topValue({ isScrollOffset: true }) - 1;

      window.scrollTo({ top: domOffset - top, behavior: 'smooth' });
    },
    [isReady, topValue],
  );

  return {
    scrollToTopWithTabs,
    topValue,
  };
}

export default useScrollToTopWithTabs;
