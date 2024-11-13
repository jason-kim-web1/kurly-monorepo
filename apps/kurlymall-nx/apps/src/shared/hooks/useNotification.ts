import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { loadUserNotification } from '../../header/header.slice';

import { useAppSelector } from '../store';

export function useNotification() {
  const { hasSession, preventFetchingMemberData, isGuest } = useAppSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasSession || preventFetchingMemberData) {
      return;
    }

    if (hasSession && !isGuest) {
      dispatch(loadUserNotification());
    }
  }, [hasSession, isGuest, dispatch, preventFetchingMemberData]);
}
