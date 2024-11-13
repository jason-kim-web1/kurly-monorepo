import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import { useAppSelector } from '../../../shared/store';

import { BADGE_KEY, updateReadBadge } from '../../../shared/api';
import { loadUserNotification } from '../../../header/header.slice';

export default function useVipBadgeRead() {
  const dispatch = useDispatch();

  const { hasSession, vipBadge } = useAppSelector(({ auth, header }) => ({
    hasSession: auth.hasSession,
    vipBadge: header.userNotification.badge.vip,
  }));

  useEffect(() => {
    if (!hasSession || !vipBadge) {
      return;
    }

    updateReadBadge(BADGE_KEY.vip_badge).then(() => {
      dispatch(loadUserNotification());
    });
  }, [dispatch, hasSession, vipBadge]);
}
