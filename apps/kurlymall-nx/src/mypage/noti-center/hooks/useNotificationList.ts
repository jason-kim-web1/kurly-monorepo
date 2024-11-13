import { useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { isToday, subDays } from 'date-fns';

import { deleteBadges, searchNotifications } from '../../../shared/api/notifications';
import { NotificationCategoryTabType } from '../interfaces/category.interface';
import { getDaBanner } from '../../../header/services/banner.service';
import { NotificationItem } from '../../../shared/interfaces/Notification';
import { NOTI_CENTER_SEARCH_PERIOD_DAYS } from '../constants/noti-center.constant';
import { RESOURCE_URL } from '../../../shared/configs/config';

const COUNT_PER_PAGE = 30;

/**
 * 하드코딩된 알림 리스트
 * ID는 음수로 순차 감소한다. -1, -2, ...
 */
const HARDCODED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: -1,
    imageUrl: `${RESOURCE_URL}/kurly/img/2024/party.png`,
    notificationType: 'INFORMATION',
    notificationCategory: 'NOTICE',
    title: '알림센터 서비스 오픈',
    contents:
      '컬리에서 발송한 메시지를 확인할 수 있는 알림센터 서비스를 오픈했습니다. 알림센터에서는 2024년 1월 30일부터 수신한 메시지를 확인하실 수 있습니다.',
    createdAt: new Date('2024-01-30'),
    hideDate: true,
  },
];

const searchStartDate = subDays(Date.now(), NOTI_CENTER_SEARCH_PERIOD_DAYS);

const activeHardcodedList = HARDCODED_NOTIFICATIONS;

export default function useNotificationList({ selectedTab }: { selectedTab: NotificationCategoryTabType }) {
  const queryClient = useQueryClient();
  const [queryEnabled, setQueryEnabled] = useState(true);

  const { data: banner } = useQuery(
    ['da-banner', 'NOTIFICATION_CENTER_BANNER'],
    () => getDaBanner('NOTIFICATION_CENTER_BANNER'),
    {
      retry: false,
    },
  );

  useEffect(() => {
    deleteBadges()
      .then(() => queryClient.resetQueries(['noti-badge']))
      .catch(() => {
        // 뱃지 제거 실패시 추가 동작 없음
      });
  }, [queryClient]);

  const { data, fetchNextPage, isInitialLoading, hasNextPage } = useInfiniteQuery(
    ['notifications', selectedTab],
    ({ pageParam = 0 }) =>
      searchNotifications(
        {
          notificationCategory: selectedTab !== 'ALL' ? selectedTab : undefined,
          startAt: searchStartDate,
        },
        pageParam,
        COUNT_PER_PAGE,
      ).then((x) => {
        if (x.content.length === 0 && selectedTab === 'ALL') {
          // 모든 알림이 없는경우 query 비활성
          // 컬리로그 적용 시 주의할것(전체에서는 조회 안되어도 컬리로그는 있을 수 있음)
          setQueryEnabled(false);
        }
        return x;
      }),
    {
      getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.number + 1),
      enabled: queryEnabled, // || selectedTab === 'KURLY_LOG',
    },
  );

  const items = useMemo(() => {
    const list = data?.pages.flatMap((x) => x.content) || [];
    if (!hasNextPage && selectedTab === 'ALL' && activeHardcodedList.length > 0) {
      list.push(...activeHardcodedList);
    }
    return list;
  }, [data?.pages, hasNextPage, selectedTab]);

  const itemsToday = items.filter((x) => isToday(x.createdAt));
  const itemsBefore = items.filter((x) => !isToday(x.createdAt));
  const empty = items.length === 0;

  const isAllLoaded = useMemo(() => (data?.pages ? data.pages[data.pages.length - 1].last : false), [data?.pages]);

  return {
    empty,
    isInitialLoading,
    items,
    itemsToday,
    itemsBefore,
    isAllLoaded,
    banner,
    fetchNextPage,
  };
}
