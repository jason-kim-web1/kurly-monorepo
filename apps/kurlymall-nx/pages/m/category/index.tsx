import styled from '@emotion/styled';

import { useMemo, useRef, useState } from 'react';

import { vars } from '@thefarmersfront/kpds-css';

import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';

import { useAppSelector } from '../../../src/shared/store';

import UserMenu from '../../../src/shared/components/layouts/UserMenu';
import { MotionTab } from '../../../src/category/components/m/MotionTab';
import { CATEGORY_SITES, motionTabOptions } from '../../../src/category/constants';
import SwipeToNavigate from '../../../src/shared/components/SwipeToNavigate';
import useWindowSize from '../../../src/shared/hooks/useWindowSize';
import { CategoryMenuContainer } from '../../../src/category/containers/m/CategoryMenuContainer';
import useSiteCategoryMenuSwipe from '../../../src/category/hooks/useSiteCategoryMenuSwipe';
import SiteCategorySelectedCodeProvider from '../../../src/category/providers/SiteCategorySelectedCodeProvider';
import { logSiteChange } from '../../../src/category/amplitude/events';
import useGetInitialSite from '../../../src/category/hooks/useGetInitialSite';
import MainSiteProvider from '../../../src/main/components/shared/MainSiteProvider';
import HeaderContainer from '../../../src/category/containers/m/HeaderContainer';
import { useResetImpressionCache } from '../../../src/category/queries/useResetImpressionCache';
import { ImpressionPolicyContextProvider } from '../../../src/shared/context/ImpressionPolicyContext';
import { useImpressionLogPolicy } from '../../../src/category/queries/useImpressionLogPolicy';
import { useShouldHideTopBarOnScroll } from '../../../src/category/hooks/useShouldHideTopBarOnScroll';

const HIDE_CLASSNAME = 'should-hide';

const FixedTopWrapper = styled.div<{ hideAmount: number }>`
  position: fixed;
  width: 100%;
  height: auto;
  top: 0;
  z-index: 1000;
  background-color: ${vars.color.$white};

  transition: transform 0.1s ease-out;
  transform: translateY(0);

  &.${HIDE_CLASSNAME} {
    transform: translateY(${({ hideAmount }) => -hideAmount}px);
  }
`;

const StyleWrapper = styled.div`
  * {
    font-family: ${vars.font.body};
  }
`;

const Gutter = styled.div<{ margin: number }>`
  height: 0;
  margin-top: ${({ margin }) => margin}px;
`;

export default function Category() {
  useScreenName(ScreenName.CATEGORY);
  useImpressionLogPolicy();
  useResetImpressionCache();

  const fixedTopWrapperRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const motionTabWrapperRef = useRef<HTMLDivElement>(null);

  const [isAnimating, setIsAnimating] = useState(false);

  const mobileHeaderHeight = useAppSelector(({ header }) => header.mobileHeaderHeight);
  const { height: windowHeight } = useWindowSize();

  const initialSite = useGetInitialSite();
  const { site, handleChangeSite, ...swipeProps } = useSiteCategoryMenuSwipe();

  const { shouldHide: shouldHideHeader } = useShouldHideTopBarOnScroll();
  const hideAmount = useMemo(() => {
    if (!shouldHideHeader) return 0;

    const wrapperHeight = fixedTopWrapperRef.current?.offsetHeight ?? 0;
    const tabHeight = motionTabWrapperRef.current?.offsetHeight ?? 0;

    return wrapperHeight - tabHeight;
  }, [shouldHideHeader]);

  const gutterHeight = shouldHideHeader ? mobileHeaderHeight - hideAmount : mobileHeaderHeight;

  const contentHeight = useMemo(
    () =>
      windowHeight -
      (shouldHideHeader ? motionTabWrapperRef.current?.offsetHeight ?? 0 : mobileHeaderHeight) -
      (userMenuRef.current?.offsetHeight ?? 0),
    [windowHeight, mobileHeaderHeight, shouldHideHeader],
  );

  const handleChangeMotionTab = (id: number) => {
    const categorySite = CATEGORY_SITES[id];

    logSiteChange(categorySite, 'top_category');
    handleChangeSite(categorySite);
  };

  return (
    <MainSiteProvider site={initialSite}>
      <StyleWrapper>
        <FixedTopWrapper
          ref={fixedTopWrapperRef}
          hideAmount={hideAmount}
          className={shouldHideHeader ? HIDE_CLASSNAME : ''}
        >
          <HeaderContainer wrapperRef={fixedTopWrapperRef} />
          <MotionTab
            ref={motionTabWrapperRef}
            activeId={CATEGORY_SITES.indexOf(site)}
            onChangeActiveId={handleChangeMotionTab}
            options={motionTabOptions}
            onAnimate={setIsAnimating}
          />
        </FixedTopWrapper>

        <Gutter margin={gutterHeight} />

        <SiteCategorySelectedCodeProvider>
          <ImpressionPolicyContextProvider>
            <SwipeToNavigate {...swipeProps}>
              <CategoryMenuContainer
                minContentHeight={contentHeight}
                gutterHeight={gutterHeight}
                isReady={!isAnimating}
              />
            </SwipeToNavigate>
          </ImpressionPolicyContextProvider>
        </SiteCategorySelectedCodeProvider>

        <UserMenu ref={userMenuRef} />
      </StyleWrapper>
    </MainSiteProvider>
  );
}
