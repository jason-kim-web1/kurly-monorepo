import { ReactNode, useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import TopScrollButton from '../Event/TopScrollButton';
import { useScroll } from '../../hooks';
import { isPC } from '../../../../util/window/getDevice';

import { amplitudeService } from '../../../shared/amplitude';
import { SelectTopButton } from '../../../shared/amplitude/events';
import { DISABLED_TOP_BUTTON, MOBILE_MULTIPLIRE, PC_MULTIPLIRE } from '../../constant';

/**
 * 스크롤 Y 위치가 뷰포트 높이보다 높으면 스크롤 탑 버튼을 보여준다
 */

interface Props {
  children: ReactNode;
}

export default function ScrollEventTopButton({ children }: Props) {
  const [showTopButton, setShowTopButton] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(true);
  const { scrollY } = useScroll();
  const { pathname } = useRouter();

  const checkDisabledUrl = useCallback(() => {
    return DISABLED_TOP_BUTTON.some((url) => pathname.includes(url));
  }, [pathname]);

  useEffect(() => {
    const innerHeight = window.innerHeight;
    if (isPC) {
      setShowTopButton(scrollY > innerHeight * PC_MULTIPLIRE);
    } else {
      setShowTopButton(scrollY > innerHeight * MOBILE_MULTIPLIRE);
      setIsDisplayed(!checkDisabledUrl());
    }
  }, [checkDisabledUrl, scrollY]);

  const hideTopButton = () => {
    setShowTopButton(false);
    amplitudeService.logEvent(new SelectTopButton());
  };

  return (
    <>
      {children}
      {isDisplayed && <TopScrollButton isShow={showTopButton} onClick={hideTopButton} />}
    </>
  );
}
