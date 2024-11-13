import { RefObject } from 'react';

import { isPC } from '../../../../../util/window/getDevice';
import { PRODUCT_LIST_HEADING_TOP_MARGIN } from '../../constants';

interface Parameter {
  refObject: RefObject<HTMLHeadingElement | HTMLDivElement>;
  mobileHeaderHeight?: number;
}

export const initializeScroll = ({ refObject, mobileHeaderHeight }: Parameter) => {
  if (window.scrollY === 0 && isPC) {
    return;
  }

  if (refObject && refObject?.current) {
    if (isPC) {
      const $headerHeight = document.getElementById('header')?.clientHeight ?? 0;
      refObject.current.scrollIntoView();
      window.scrollBy(0, -$headerHeight - PRODUCT_LIST_HEADING_TOP_MARGIN);
      return;
    }

    if (mobileHeaderHeight) {
      refObject.current.scrollIntoView();
      window.scrollBy(0, -mobileHeaderHeight);
    }
  }
};
