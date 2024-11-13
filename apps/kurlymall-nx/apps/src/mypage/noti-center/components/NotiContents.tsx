import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

import COLOR from '../../../shared/constant/colorset';
import PushAgreementBanner from './PushAgreementBanner';
import NotiList from './NotiList';
import EmptyNotiList from './EmptyNotiList';
import { NotificationCategoryTabType } from '../interfaces/category.interface';
import SkeletonNotiList from './SkeletonNotiList';
import useNotificationList from '../hooks/useNotificationList';
import NotiCenterBanner from './NotiCenterBanner';
import { NOTI_CENTER_SEARCH_PERIOD_DAYS } from '../constants/noti-center.constant';

const Container = styled.div<{ headerHeight: number }>`
  display: flex;
  flex-direction: column;
  height: calc(100vh - ${({ headerHeight }) => headerHeight}px);
`;

const NoticeBlock = styled.div`
  padding: 12px 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoticeText = styled.span`
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  color: ${COLOR.kurlyGray400};
`;

export default function NotiContents({
  headerHeight,
  selectedTab,
}: {
  headerHeight: number;
  selectedTab: NotificationCategoryTabType;
}) {
  const { empty, isInitialLoading, isAllLoaded, items, itemsToday, itemsBefore, banner, fetchNextPage } =
    useNotificationList({
      selectedTab,
    });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!empty && inView) {
      fetchNextPage().catch(() => {});
    }
  }, [empty, fetchNextPage, inView]);

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'auto',
    });
  }, [selectedTab]);

  return (
    <Container headerHeight={headerHeight}>
      <PushAgreementBanner />
      {isInitialLoading ? (
        <SkeletonNotiList length={10} showCategoryName={selectedTab === 'ALL'} />
      ) : empty ? (
        <EmptyNotiList />
      ) : selectedTab === 'ALL' ? (
        <>
          {itemsToday.length > 0 && <NotiList title={'오늘의 알림'} list={itemsToday} showCategoryName />}
          {banner && <NotiCenterBanner banner={banner} />}
          {itemsBefore.length > 0 && <NotiList title={'이전 알림'} list={itemsBefore} showCategoryName />}
        </>
      ) : (
        <NotiList list={items} />
      )}
      {!empty && !isInitialLoading && !isAllLoaded && (
        <SkeletonNotiList ref={ref} isAppending length={5} showCategoryName={selectedTab === 'ALL'} />
      )}
      <NoticeBlock>
        <NoticeText>최근 {NOTI_CENTER_SEARCH_PERIOD_DAYS}일동안의 알림만 확인하실 수 있습니다.</NoticeText>
      </NoticeBlock>
    </Container>
  );
}
