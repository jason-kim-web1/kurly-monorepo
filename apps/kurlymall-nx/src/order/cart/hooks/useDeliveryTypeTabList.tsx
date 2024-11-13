import { useEffect, useMemo, useState } from 'react';

import { throttle } from 'lodash';

import useCartDetailQuery from '../queries/useCartDetailQuery';

import { getDeliveryTypeTabList } from '../utils/getDeliveryTabList';

import { isPC } from '../../../../util/window/getDevice';

import { CART_DELIVERY_TAB_HEIGHT, MOBILE_HEADER_HEIGHT, MOBILE_ITEM_CONTROL_HEIGHT } from '../constants';

export const MOBILE_HEADER = MOBILE_ITEM_CONTROL_HEIGHT + MOBILE_HEADER_HEIGHT + CART_DELIVERY_TAB_HEIGHT;

export default function useDeliveryTypeTabList() {
  const { data: cartDetail } = useCartDetailQuery();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabList = useMemo(() => {
    if (!cartDetail) {
      return [];
    }

    return getDeliveryTypeTabList({ cartDetail, activeTab: activeTabIndex });
  }, [cartDetail, activeTabIndex]);

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
        const isScrollAtBottom = scrollTop + clientHeight >= scrollHeight;

        if (isScrollAtBottom) {
          // 스크롤이 하단에 도달했을 때 마지막 배송타입탭을 ON 합니다.
          setActiveTabIndex(tabList.length - 1);
          return;
        }

        // 배송타입탭 ON 위치 기준은 각 배송영역의 하단 스크롤 위치입니다
        const tabIndex = tabList.findIndex((tab) => {
          if (!tab.value) {
            return;
          }

          const $el = document.getElementById(tab.value);
          const elementBottomPosition = $el?.parentElement?.getBoundingClientRect().bottom;

          if (!elementBottomPosition) {
            return false;
          }

          return elementBottomPosition - MOBILE_HEADER > 0;
        });

        setActiveTabIndex(tabIndex);
      }, 50),
    [tabList],
  );

  useEffect(() => {
    if (isPC) {
      //MEMO PC는 스크롤할때 배송타입탭 ON 되는 기능 없음
      return;
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { deliveryTypeTabList: tabList, setActiveTabIndex };
}
