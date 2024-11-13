import { useRouter } from 'next/router';

import { ChildrenOnlyProps } from '../../types';
import MobileHeader from '../../components/layouts/MobileHeader';
import MainHeaderContainer from '../../components/m/header/MainHeaderContainer';
import TopNavigationBar from '../../components/navigation/TopNavigationBar';
import SwipeToNavigate from '../../components/SwipeToNavigate';
import UserMenu from '../../components/layouts/UserMenu';
import useHomeSwipe from '../../../main/hooks/useHomeSwipe';
import { useSubTabs } from '../../hooks/useSubTabs';

export const HomeLayout = ({ children }: ChildrenOnlyProps) => {
  const { isReady } = useRouter();

  const subTabProps = useSubTabs();
  const homeSwipeProps = useHomeSwipe(subTabProps.activeId);

  if (!isReady) return null;

  return (
    <>
      <MobileHeader visibleBanner hideBottomLine>
        <MainHeaderContainer />
        <TopNavigationBar {...subTabProps} />
      </MobileHeader>
      <SwipeToNavigate {...homeSwipeProps}>{children}</SwipeToNavigate>
      <UserMenu />
    </>
  );
};
