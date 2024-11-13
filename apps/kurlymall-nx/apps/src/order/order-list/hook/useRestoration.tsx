import { useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import {
  loadSessionStorage,
  removeSessionStorage,
  SESSION_STORAGE_KEY,
  storeSessionStorage,
} from '../../../shared/services/session.storage.service';
import { RestoreOrderList } from '../interface/Restoration';

import { changeDateTab, setInitialTabState } from '../store/order-list';

// 주문 내역을 거쳐서 페이지 이동시 날짜 필터와 스크롤 위치를 복구합니다.
export function useRestoration() {
  const dispatch = useDispatch();
  const router = useRouter();
  const restorationData = loadSessionStorage<RestoreOrderList>(SESSION_STORAGE_KEY.ORDER_LIST_RESTORATION);

  // 패스 검사하여 주문내역/주문상세/상품상세 페이지 벗어날 경우 세션스토리지 삭제
  const checkPath = useCallback(() => {
    const path = loadSessionStorage<string>(SESSION_STORAGE_KEY.currentPath);

    if (!path) {
      return;
    }

    const isSaveScrollPage = path.includes('/mypage/order') || path.includes('/goods');

    if (!isSaveScrollPage) {
      removeSessionStorage(SESSION_STORAGE_KEY.ORDER_LIST_RESTORATION);
      dispatch(setInitialTabState());
    }
  }, [dispatch]);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      storeSessionStorage<RestoreOrderList>(SESSION_STORAGE_KEY.ORDER_LIST_RESTORATION, {
        ...restorationData,
        scrollPosition: (window.scrollY / document.body.scrollHeight) * 100,
      });
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', checkPath);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', checkPath);
    };
  }, [checkPath, restorationData, router.events]);

  useEffect(() => {
    async function restoreData() {
      if (!restorationData) {
        return;
      }

      const { activeDate, scrollPosition } = restorationData;

      if (scrollPosition) {
        dispatch(changeDateTab({ date: activeDate }));
        window.scrollTo(0, (document.body.scrollHeight * scrollPosition) / 100);

        storeSessionStorage<RestoreOrderList>(SESSION_STORAGE_KEY.ORDER_LIST_RESTORATION, {
          ...restorationData,
        });
      }
    }

    restoreData();
  }, []);

  // 뒤로가기하여 주문내역 벗어난경우 삭제
  useEffect(() => {
    const handlePopState = () => {
      removeSessionStorage(SESSION_STORAGE_KEY.ORDER_LIST_RESTORATION);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
}
