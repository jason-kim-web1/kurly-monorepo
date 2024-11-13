import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  loadMemberBenefits,
  loadMemberInfo,
  loadMemberMetadata,
  loadMemberPointBenefit,
  loadMemberSubscriptionInfo,
} from '../reducers/member';
import { useAppSelector } from '../store';
import { getBenefitsAllowedUrl, getPointBenefitsAllowedUrl } from '../utils/member';

export function useMember() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { hasSession, isGuest, preventFetchingMemberData } = useAppSelector(({ auth }) => auth);

  const loadMemberInformation = useCallback(() => {
    if (isGuest) {
      return;
    }

    dispatch(loadMemberInfo());
    dispatch(loadMemberSubscriptionInfo());
    dispatch(loadMemberMetadata());

    if (getPointBenefitsAllowedUrl(router.pathname)) {
      dispatch(loadMemberPointBenefit());
    }

    if (getBenefitsAllowedUrl(router.pathname)) {
      dispatch(loadMemberBenefits());
    }
  }, [isGuest, dispatch, router.pathname]);

  useEffect(() => {
    if (!hasSession || !router.isReady || preventFetchingMemberData) {
      return;
    }

    loadMemberInformation();
  }, [hasSession, router, loadMemberInformation, preventFetchingMemberData]);
}
