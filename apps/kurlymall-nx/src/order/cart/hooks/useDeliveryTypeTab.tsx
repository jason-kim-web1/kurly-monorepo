import { MouseEvent, useEffect, useMemo, useState } from 'react';

import useDeliveryTypeTabList from './useDeliveryTypeTabList';
import { useScroll } from '../../../shared/hooks';
import { MOBILE_HEADER_HEIGHT } from '../constants';
import useDeliveryTabHidden from './useDeliveryTabScrollHidden';
import { isPC } from '../../../../util/window/getDevice';

export default function useDeliveryTypeTab() {
  const [isTabClick, setIsTabClick] = useState(false);

  const { deliveryTypeTabList, setActiveTabIndex } = useDeliveryTypeTabList();
  const { scrollDirection, setScrollDirection } = useScroll({ directionTurningPoint: MOBILE_HEADER_HEIGHT });
  const isScrollDown = useMemo(() => scrollDirection === 'down', [scrollDirection]);
  const { isDeliveryTabHide } = useDeliveryTabHidden({ isTabClick, isScrollDown });

  const handleTouch = () => {
    //MEMO 스크롤 방향을 초기화 해주어, 탭이동 후 터치 스크롤을 했을 때 탭이 튀는 현상을 방지합니다.
    setScrollDirection('up');

    setIsTabClick(false);
    window.removeEventListener('touchstart', handleTouch);
  };

  const handleClickTab = async ({
    tabEvent,
    tabIndex,
    tabValue,
  }: {
    tabEvent: MouseEvent<HTMLButtonElement>;
    tabIndex: number;
    tabValue?: string;
  }) => {
    setIsTabClick(true);

    tabEvent.stopPropagation();
    const target = tabValue && document.getElementById(tabValue);

    if (!target) {
      setIsTabClick(false);
      return;
    }

    target.scrollIntoView({ behavior: 'smooth' });

    if (isPC) {
      setActiveTabIndex(tabIndex);
      return;
    }

    //MEMO PC는 배송유형탭이 항상 노출이므로, isTabClick false처리 불필요
    window.addEventListener('touchstart', handleTouch);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  return { handleClickTab, deliveryTypeTabList, isDeliveryTabHide };
}
