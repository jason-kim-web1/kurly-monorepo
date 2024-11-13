import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { fetchVipAffiliatesBenefitIdentifier } from '../../../shared/api/lounges/lounges.api';
import { getSecond } from '../../../shared/utils/time';
import { useAppSelector } from '../../../shared/store';
import Alert from '../../../shared/components/Alert/Alert';

const STALE_TIME = getSecond(60 * 1000);

function useRandomNumberBenefitQuery(identifier?: string) {
  const { hasSession, memberNo } = useAppSelector(({ auth, member }) => ({
    hasSession: auth.hasSession,
    memberNo: member.info?.memberNo,
  }));

  const queryKey = ['vipAffiliatesBenefit', memberNo, identifier];

  const {
    data,
    status: fetchStatus,
    error: fetchError,
  } = useQuery(queryKey, fetchVipAffiliatesBenefitIdentifier(identifier), {
    enabled: !!identifier && hasSession && !!memberNo,
    staleTime: STALE_TIME,
    select: (response) => response?.data,
  });

  useEffect(() => {
    if (fetchError) {
      Alert({
        text: (fetchError as Error).message,
      });
    }
  }, [fetchError]);

  return {
    data: data || [],
    fetchStatus,
  };
}

export default useRandomNumberBenefitQuery;
